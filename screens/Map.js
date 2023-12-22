import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import * as Location from 'expo-location';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const data = [
  { 
    id: 1, 
    name: "АШАН",
    street: "Вул Університетська, 1",
    distance: "200м",
    imageSource: require('../assets/atb500.png'),
    coordinate: {
      latitude: 49.842606,
      longitude: 24.025363,
    }
  },
  { 
    id: 2, 
    name: "Магазин Атб",
    street: "Вулиця Шевченка, 2а",
    distance: "500м",
    imageSource: require('../assets/atb500.png'), 
    coordinate: {
      latitude: 49.839426,
      longitude: 24.022695,
    }
  },
];

const Map = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const translateY = useSharedValue(screenHeight);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      translateY.value = withSpring(0);
    } else {
      translateY.value = withSpring(screenHeight, {}, () => {
        runOnJS(setSelectedPlace)(null);
      });
    }
  }, [selectedPlace]);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Дозвіл на доступ до місцезнаходження був відхилений');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Помилка отримання місцезнаходження:', error);
    }
  };

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
  };

  const closeInfo = () => {
    translateY.value = withSpring(screenHeight, {}, () => {
      runOnJS(setSelectedPlace)(null);
    });
  };

  const centerMapOnUser = () => {
    getLocation();
    if (userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRectangle}>
        <Text style={styles.labelText}>Карта</Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation?.latitude || 0,
          longitude: userLocation?.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        ref={mapRef}
      >
        {data.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>

      {selectedPlace && (
        <Animated.View style={[styles.shop, animatedStyle]}>
          <Image source={selectedPlace.imageSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.shopName}>{selectedPlace.name}</Text>
            <Text style={styles.street}>{selectedPlace.street}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.closeButton} onPress={closeInfo}>
              <Image source={require('../assets/cross.png')} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.centerButton} onPress={centerMapOnUser}>
        <Text style={{ color: "#fff" }}>Центрувати карту</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    position: "relative",
  },
  labelText: {
    position: "absolute",
    top: screenHeight * 0.01,
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },
  topRectangle: {
    height: screenHeight * 0.15,
    width: screenWidth,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: -1,
  },
  shop: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 25,
    width: screenWidth * 0.9,
    height: screenHeight * 0.13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    position: "absolute",
    bottom: 10,
    left: screenWidth * 0.05,
    right: screenWidth * 0.05,
    backgroundColor: "#fff",
  },
  image: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  shopName: {
    fontWeight: "bold",
  },
  street: {
    color: "#808080",
  },
  closeButton: {
    backgroundColor: "transparent",
  },
  centerButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Map;