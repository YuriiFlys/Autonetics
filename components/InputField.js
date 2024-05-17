import React, { useRef } from "react";
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

const InputField = ({ name, setData, data }) => {
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        // keyboardType="email-address"
        onSubmitEditing={() => inputRef.current.focus()}
        blurOnSubmit={false}
        onChangeText={(text) => setData(name, text)}
        value={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  text: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default InputField;
