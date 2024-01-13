import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;

const MyCounter = ({ item, setData, style }) => {
  const navigator = useNavigation();
  return (
    <View
      style={[
        styles.productnamecontainer,
        { flexDirection: "row", justifyContent: "center" },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(item.number);
          item.number--;
        }}
      >
        <Text style={styles.buttonTextPlusMinus}>-</Text>
      </TouchableOpacity>
      <Text style={styles.countText}>{item.number}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(item.number);
          item.number++;
        }}
      >
        <Text style={styles.buttonTextPlusMinus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: Color.colorLightGray,
    borderRadius: 25,
  },
  buttonTextPlusMinus: {},
  countText: {
    fontSize: FontSize.size_xl,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default MyCounter;
