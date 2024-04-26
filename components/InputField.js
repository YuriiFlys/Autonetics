import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
} from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const InputField = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input Field</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 20,
  },
  text: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
  },
  input: {
    height: 40,
    borderColor: Color.colorDarkBlue,
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default InputField;
