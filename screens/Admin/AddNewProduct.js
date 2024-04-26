import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import InputField from "../../components/InputField.js";
import InputPhoto from "../../components/InputPhoto.js";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddProductsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <InputPhoto />
        <InputField />
        <InputField />
        <InputField />
        <InputField />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>Додати товар</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: Color.colorDarkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttontext: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_m,
    color: Color.colorWhite,
  },
});

export default AddProductsScreen;
