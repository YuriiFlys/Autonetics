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
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Basket = () => {
  const navigator = useNavigation();
  const bottomSheetRef = React.useRef(null);
  const toggleFavorites = () => {
    setFavoritesVisible(!favoritesVisible);
  };
  const toggleHystory = () => {
    setHystoryVisible(!hystoryVisible);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Історія та улюблені"} />
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={toggleFavorites}
      >
        <View style={styles.favoritesButton}>
          <Text style={styles.favoritesButtonText}>Улюблені </Text>
          <Text style={styles.favoritesButtonArrow}>&gt;</Text>
        </View>
        <View style={styles.horizontalLineFavorites}></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => toggleHystory}
      >
        <View style={styles.historyButton}>
          <Text style={styles.historyButtonText}>Історія </Text>
          <Text style={styles.historyButtonArrow}>&gt;</Text>
        </View>
        <View style={styles.horizontalLineHistory}></View>
      </TouchableOpacity>
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
  mainText: {
    position: "absolute",
    top: screenHeight * 0.102,
    left: screenWidth * 0.337,
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },
  favoritesButton: {
    position: "absolute",
    top: screenHeight * 0.09,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  favoritesButtonText: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#B6B6B6",
    marginRight: 272,
    marginBottom: 20,
  },
  favoritesButtonArrow: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 30,
    color: "#B6B6B6",
  },
  horizontalLineFavorites: {
    position: "absolute",
    left: 0,
    right: 0,
    top: screenHeight * 0.15,
    borderBottomWidth: 1,
    borderBottomColor: "#B6B6B6",
  },
  historyButton: {
    position: "absolute",
    top: screenHeight * 0.118,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  historyButtonText: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#B6B6B6",
    marginRight: 295,
    marginBottom: 20,
  },
  historyButtonArrow: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 30,
    color: "#B6B6B6",
  },
  horizontalLineHistory: {
    position: "absolute",
    left: 0,
    right: 0,
    top: screenHeight * 0.18,
    borderBottomWidth: 1,
    borderBottomColor: "#B6B6B6",
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
    height: screenWidth * 0.4,
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
    position: "absolute",
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
    top: "15%",
    left: 0,
    right: 0,
    height: screenHeight * 0.25,
    width: screenWidth * 0.75,
  },
  widgetProductImage: {
    width: "70%",
    height: "50%",
    objectFit: "contain",
  },

  widgetProductBrandLogo: {
    width: "30%",
    height: "30%",
    objectFit: "contain",
  },
  widgetProductDescription: {
    position: "absolute",
    top: "0%",
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },
});
export default Basket;
