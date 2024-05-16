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

const InputField = ({ name }) => {
  // console.log(name);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
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
    // width: "90%",
    padding: 20,
    weight: "100%",
    // height: "100%",
  },
  text: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    weight: "100%",
    borderColor: Color.colorDarkBlue,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default InputField;
