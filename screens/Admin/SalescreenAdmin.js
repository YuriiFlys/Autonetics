import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalescreenAdmin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Продаж товарів" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SalescreenAdmin;
