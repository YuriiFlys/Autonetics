import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const SmallWidget = ({ item }) => {
  const navigator = useNavigation();
  const price = item.price.toString().split(".");
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigator.navigate("ProductInfo")}
    >
      <View style={styles.productImageContainer}>
        <Image source={item.imageSource} style={styles.productImage} />
      </View>
      <Text style={styles.productNameContainer}>{item.name}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "20%",
          justifyContent: "space-around",
        }}
      >
        <View style={styles.priceContainer}>
          <Text style={[styles.priceWholePart, { fontSize: 25 }]}>
            {price[0]}
          </Text>
          <Text style={[styles.priceWholePart, { fontSize: 15 }]}>
            {price[1]}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addCartButton}
          onPress={() => console.log("Добавляємо елмент в кошик")}
        >
          <Image
            source={require("../assets/cart.svg")}
            style={styles.addCartImage}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.4 * screenWidth,
    height: 0.7 * screenWidth,
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    borderColor: Color.colorSuperLightGray,
    borderWidth: 1,
    margin: 0.02 * screenWidth,
    padding: 0.02 * screenWidth,
  },
  productImageContainer: {
    width: "100%",
    height: "50%",
  },
  productImage: {
    height: "100%",
    width: "100%",
    contentFit: "contain",
  },
  productNameContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
  },
  priceWholePart: {
    color: Color.colorDarkBlue,
    fontSize: 30,
    fontFamily: FontFamily.CommissioneBold,
  },
  addCartButton: {
    width: 0.12 * screenWidth,
    height: 0.12 * screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6ABF40",
    borderRadius: 1000,
  },
  addCartImage: {
    width: "70%",
    height: "70%",
    contentFit: "contain",
  },
});

export default SmallWidget;
