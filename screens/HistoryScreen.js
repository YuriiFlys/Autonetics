import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Color } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;

const HistoryScreen = ({ style }) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default HistoryScreen;
