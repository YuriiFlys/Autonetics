import React from "react";
import { Dimensions } from "react-native";
import ScannerCamera from "../components/ScannerCamera";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

export default function Scanner() {
  const navigator = useNavigation();

  const scanned = (data) => {
    navigator.navigate("SalesScreen", { id: data });
  };
  return (
    <ScannerCamera
      styleflashlight={{}}
      styleFrame={{ marginTop: 0 }}
      styleButtonScanner={{ marginTop: screenHeight * 0.05 }}
      isCross={false}
      handleScanned={scanned}
    />
  );
}
