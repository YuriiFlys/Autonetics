// import QRCode from "qrcode";
import React from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import QRCode from "react-native-qrcode-svg";
import { Button } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const CheckScreen = ({ route }) => {
  const { sum } = route.params;
  const navigator = useNavigation();

  const shop = {
    name: "Магазин АТБ",
    address: "вул. Шевченка, 1, Львів, Львівська область, 79000",
    imageSource: require("../assets/Image_Product_or_Shop/atbLogo.png"),
  };
  const text = "7372823"; // Replace with your desired URL or text
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: Color.colorWhite,
      }}
    >
      <View style={{ margin: 10 }}>
        <QRCode value={text} size={screenWidth * 0.8} />
      </View>

      <View style={styles.shopInfoContainer}>
        <View style={styles.shopMainInfoContainer}>
          <Image source={shop.imageSource} style={styles.shopImage} />
          <View style={styles.shopNameContainer}>
            <Text style={styles.shopName}>{shop.name}</Text>
          </View>
        </View>
        <Text style={styles.addressText}>{shop.address}</Text>
        <Text style={[styles.addressText, { marginTop: 10 }]}>
          {formattedDateTime}
        </Text>
        <Text style={styles.sumText}>До cплати: {sum.toFixed(2)}$</Text>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigator.navigate("Home");
        }}
      >
        <Text style={styles.buttonText}>Перейти на головне меню</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  shopInfoContainer: {
    marginTop: 30,
    width: "80%",
    height: screenHeight * 0.3,
    borderRadius: Border.br_20,
    backgroundColor: Color.colorSuperLightGray,
    flexDirection: "column",
    padding: 20,
  },
  shopMainInfoContainer: {
    flexDirection: "row",
    height: "50%",
  },
  shopImage: {
    width: "35%",
    height: "100%",
    resizeMode: "contain",
  },
  shopNameContainer: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  shopName: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    textAlignVertical: "center",
    textAlign: "center",
  },
  addressText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneLight,
    color: Color.colorLightGray,
  },
  sumText: {
    marginTop: 10,
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    textAlignVertical: "center",
    textAlign: "right",
  },
  backButton: {
    width: screenWidth * 0.9,
    backgroundColor: Color.colorDarkBlue,
    height: screenHeight * 0.07,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 70,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
});

export default CheckScreen;
