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
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Promotions = () => {
  const navigator = useNavigation();
  const MainWidget = ({ name, price, image, brand, description }) => {
    return (
      <View style={styles.mainWidgetView}>
        <View style={styles.widgetInfoRow}>
          <Text style={[styles.widgetProductMainInfo]}>{name}</Text>
          <Text style={styles.widgetProductMainInfo}>{price}</Text>
        </View>
        <View style={styles.widgetImageRow}>
          <View style={styles.widgetImageBox}>
            <Image source={image} style={styles.widgetProductImage} />
          </View>
          <View style={[styles.widgetImageBox]}>
            <Image source={brand} style={styles.widgetProductBrandLogo} />
          </View>
        </View>
        <View style={styles.widgetProductDescriptionContainer}>
          <Text style={styles.widgetProductDescription}>{description}</Text>
        </View>
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
  },
  mainWidgetView: {
    flexDirection: "column",
    flexDirection: "column",
    height: screenWidth * 0.7,
    width: screenWidth * 0.9,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    alignItems: "center",
  },
  widgetInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  widgetProductMainInfo: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: 24,
    color: "#404040",
  },
  widgetImageRow: {
    flexDirection: "row",
    height: screenHeight * 0.15,
    justifyContent: "space-between",
  },
  widgetImageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  widgetProductImage: {
    flex: 1,
    width: "150%",
    resizeMode: "contain",
  },
  widgetProductBrandLogo: {
    width: "30%",
    height: "30%",
  },
  widgetProductDescription: {
    fontFamily: FontFamily.Commissione,
    fontSize: 16,
    color: "#404040",
  },
  widgetProductDescriptionContainer: {
    width: "90%",
  },
});
export default Promotions;
