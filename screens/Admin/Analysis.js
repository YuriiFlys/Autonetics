import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Analysis = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Аналіз даних" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Analysis;
