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

  return (
    <View>
      <Logo name={"Профіль"} />
      <View style={styles.mainContainer}>
        <View style={styles.userData}>
          <View style={styles.userIcon}>
            <Text style={styles.userIconText}>{getInitials(userName)}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    position: "relative",
  },
  labelText: {
    position: "absolute",
    top: screenHeight * 0.1,
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },

  logoIcon: {
    alignSelf: "center",
    height: screenWidth * 0.1299,
    width: screenWidth * 0.1299,
    position: "absolute",
    top: screenHeight * 0.0446,
    left: screenWidth * 0.04,
  },
  topRectangle: {
    position: "absolute",
    height: screenHeight * 0.15,
    width: screenWidth,
    top: 0,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  mainContainer: {
    position: "absolute",
    top: screenHeight * 0.15,
    height: screenHeight * 0.85,
    width: screenWidth,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  userData: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: screenHeight * 0.03,
  },
  userIcon: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 100,
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
  },
});
export default Promotions;
