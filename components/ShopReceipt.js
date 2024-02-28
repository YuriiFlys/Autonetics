import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";

const screenHeight = Dimensions.get("window").height;

const ShopReceipt = ({ shop, info }) => {
  console.log("shop", shop);
  return (
    <View style={styles.shopInfoContainer}>
      <View style={styles.shopMainInfoContainer}>
        <Image source={shop.imageSource} style={styles.shopImage} />
        <View style={styles.shopNameContainer}>
          <Text style={styles.shopName}>{shop.name}</Text>
        </View>
      </View>
      <Text style={styles.addressText}>{shop.address}</Text>
      <Text style={[styles.addressText, { marginTop: 10 }]}>
        {info.formattedDateTime}
      </Text>
      <Text style={styles.sumText}>Сума: {info.sum}$</Text>
    </View>
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
});

export default ShopReceipt;
