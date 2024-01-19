import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Color } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;

const GrayLine = ({ style }) => {
  return <View style={[styles.grayLine, style]} />;
};

const styles = StyleSheet.create({
  grayLine: {
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
  },
});

export default GrayLine;
