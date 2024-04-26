import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import InputField from "../../components/InputField.js";
import InputPhoto from "../../components/InputPhoto.js";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddProductsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <InputPhoto />
      <InputField />
      <InputField />
      <InputField />
      <InputField />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
});

export default AddProductsScreen;
