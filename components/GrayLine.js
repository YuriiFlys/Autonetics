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
    backgroundColor:"blue",
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
    shadowColor: Color.colorDarkBlue,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
  },
});

export default GrayLine;
