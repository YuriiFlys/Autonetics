import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Promotions = () => {
  const navigator = useNavigation();
  const MainWidget = ({ name, price, image, brand, description }) => {
    return (
      <View style={styles.mainWidgetView}>
        <View style={styles.widgetInfoRow}>
          <Text style={styles.widgetProductMainInfo}>{name}</Text>
          <Text style={styles.widgetProductMainInfo}>{price}</Text>
        </View>
        <View style={styles.widgetImageRow}>
          <Image source={image} style={styles.widgetProductImage} />
          <Image source={brand} style={styles.widgetProductBrandLogo} />
        </View>
        <Text style={styles.widgetProductDescription}>{description}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Акції"} />
      <MainWidget
        name={"Банани "}
        price={"47.59₴"}
        image={require("../assets/bananas.jpeg")}
        brand={require("../assets/atb500.png")}
        description={"Банани Іспанія"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  mainWidgetView: {
    flexDirection: "column",
    height: screenWidth * 0.7,
    width: screenWidth * 0.9,
    position: "absolute",
    top: screenHeight * 0.2,
    left: screenWidth * 0.05,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    overflow: "hidden",
  },
  widgetInfoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: "5%",
    left: 0,
    right: 0,
  },
  widgetProductMainInfo: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 24,
    color: "#404040",
  },
  widgetImageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: "5%",
    left: 0,
    right: 0,
    height: screenHeight * 0.25,
    width: screenWidth * 0.75,
  },
  widgetProductImage: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },

  widgetProductBrandLogo: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  widgetProductDescription: {
    left: screenHeight * 0.06,
    right: 0,
    bottom: screenHeight * 0.1,
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },
});
export default Promotions;
