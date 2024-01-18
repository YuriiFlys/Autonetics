import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PayButton = ({ payLogo, payName, styleButton, styleText, arrow }) => {
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.payButton, styleButton]}
      onPress={() => {
        console.log(payName);
      }}
    >
      <View style={{ flex: 1 }}>
        <Image style={styles.payLogo} source={payLogo} />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 2,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text style={[styles.payNameText, styleText]}>{payName}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={arrow} style={styles.payArrow} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  payButton: {
    marginTop: 30,
    width: "80%",
    height: screenHeight * 0.1,
    borderRadius: 30,
    flexDirection: "row",
    alignContent: "center",
  },
  payLogo: {
    margin: 10,
    marginLeft: 20,
    flex: 1,
    height: "90%",
    width: "70%",
    resizeMode: "contain",
  },
  payNameText: {
    fontSize: 25,
    fontFamily: FontFamily.CommissioneRegular,
    color: Color.colorWhite,
  },
  payArrow: {
    margin: 10,
    height: "60%",
    width: "35%",
    resizeMode: "contain",
  },
});

export default PayButton;
