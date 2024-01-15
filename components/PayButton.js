import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PayButton = ({ payLogo, payName, styleButton, styleText }) => {
  const navigator = useNavigation();

  return (
    <View style={[styles.payButton, styleButton]}>
      <View style={{ flex: 1 }}>
        <Image style={styles.payLogo} source={payLogo} />
      </View>
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <Text style={[styles.payNameText, styleText]}>{payName}</Text>
        <Image
          width="20%"
          height="50%"
          source={require("../assets/Arrow.svg")}
          style={styles.payArrow}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  payButton: {
    marginTop: 30,
    width: "80%",
    height: screenHeight * 0.12,
    borderRadius: Border.br_20,
    flexDirection: "row",
    alignContent: "center",
  },
  payLogo: {
    margin: 10,
    flex: 1,
    height: "80%",
    width: "60%",
    resizeMode: "contain",
  },
  payNameText: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
  payArrow: {
    margin: 10,
    height: "50%",
    width: "20%",
    resizeMode: "contain",
  },
});

export default PayButton;
