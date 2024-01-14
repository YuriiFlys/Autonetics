import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PaymentWindow = ({ style }) => {
  const navigator = useNavigation();
  return <View></View>;
};

const styles = StyleSheet.create({});

export default PaymentWindow;
