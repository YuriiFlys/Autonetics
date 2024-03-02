import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import ScannerCamera from "../../components/ScannerCamera";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const SearchBarcode = () => {
  return <ScannerCamera isCross={true} />;
};

const styles = StyleSheet.create({});

export default SearchBarcode;
