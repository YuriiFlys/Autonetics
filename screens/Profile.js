import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import GrayLine from "../components/GrayLine";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function getInitials(name) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}
const Promotions = () => {
  const navigator = useNavigation();
  const userName = "Rostyslav Pasternak";
  const ButtonMenu = ({ image, name }) => {
    return (
      <TouchableOpacity style={styles.buttonContainer}>
        <Image style={styles.buttonIcon} source={image} />
        <Text style={styles.buttonName}>{name}</Text>
        <Image
          style={styles.buttonArrow}
          source={require("../assets/Profile/arrow.svg")}
        />
        {/* <Image style={styles.buttonIcon} source={image} /> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Logo name={"Профіль"} />
      <View style={styles.mainContainer}>
        <View style={styles.userData}>
          <View style={styles.userIcon}>
            <Text style={styles.userIconText}>{getInitials(userName)}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/User.png")}
          name={"Особисті дані"}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/History.png")}
          name={"Історія"}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/Help.png")}
          name={"Допомога"}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/Settings.svg")}
          name={"Налаштування"}
        />
        <GrayLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: screenHeight * 0.16,
    height: screenHeight * 0.85,
    width: screenWidth,
    alignItems: "center",
  },
  userData: {
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
  },
  userIcon: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 1000,
    backgroundColor: Color.colorLightCyan,
    left: screenWidth * 0.1,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  userIconText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Color.colorDarkBlue,
  },
  userName: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: Color.colorDarkBlue,
    flex: 4,
  },
  buttonContainer: {
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonIcon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  buttonName: {
    fontSize: FontSize.normal,
    fontFamily: FontFamily.normal,
    color: Color.colorDarkBlue,
    flex: 4,
    marginLeft: screenWidth * 0.05,
    fontWeight: "bold",
  },
  buttonArrow: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
  },
});
export default Promotions;
