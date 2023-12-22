import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MainMenu = () => {
  const navigator = useNavigation();

  const keyExtractor = (item, index) => index.toString();

  const data = [
    { 
      id: 1, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 2, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 3, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 4, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 5, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 6, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
    { 
      id: 7, 
      name: "Магазин Атб",
      street: "Вулиця Шевченка, 2а",
      distance: "500м",
      imageSource: require('../assets/atb500.png') 
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.shop}>
      <Image source={item.imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.street}>{item.street}</Text>
      </View>
        <Text style={styles.distanceText}>{item.distance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRectangle}>
        <Text style={styles.labelText}>Головне меню</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.shopContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
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
  shopContainer: {
    marginTop: 20,
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
    fontWeight: 'bold',
  },
  street: {
    color: '#808080',
  },
  distanceText: {
    alignSelf: 'flex-end', 
    color: '#808080',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default MainMenu;
