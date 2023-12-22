import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Map = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topRectangle}>
        <Text style={styles.labelText}>Карта</Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 49.8382600,
          longitude: 24.0232400,
          latitudeDelta: 0.09,
          longitudeDelta: 0.009
          ,
        }}
      />
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
});

export default Map;
