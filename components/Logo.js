import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Logo = ({ name, style }) => {
  const navigator = useNavigation();
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.logoIcon}
        onPress={() => navigator.navigate("Home", { screen: "Головне меню" })}
      >
        <View style={styles.containerLogo}>
          <Image
            style={styles.logoIcon}
            contentFit="contain"
            source={require("../assets/logoAutonetics.png")}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={[styles.labelText, style]}>{name}</Text>
      </View>
      <View style={styles.logoIcon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight * 0.1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  logoIcon: {
    flex: 1,
    width: screenWidth * 0.1,
    height: screenHeight * 0.1,
    marginLeft: 10,
    marginRight: 10,
  },
  labelText: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  containerText: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Logo;
