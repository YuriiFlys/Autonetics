import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ScannerCamera from "../components/ScannerCamera";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Scanner() {
  return (
    <ScannerCamera
      styleflashlight={{}}
      styleFrame={{ marginTop: 0 }}
      styleButtonScanner={{ marginTop: screenHeight * 0.05 }}
      isCross={false}
    />
  );
}
