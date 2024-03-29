import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddProducts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Поповнення товарів" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AddProducts;
