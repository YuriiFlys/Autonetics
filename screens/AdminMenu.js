import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../components/Logo";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import GrayLine from "../components/GrayLine";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AdminWindow = () => {
  const data = [
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Продати товар",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Склад",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Аналіз даних",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Поповнення товарів",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Акції",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Історія продаж",
    },
    {
      imageSource: require("../assets/Admin/SaleSVG.svg"),
      name: "Замовлення",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={console.log("a")}
      >
        <Image style={styles.buttonIcon} source={item.imageSource} />
        <Text style={styles.buttonName}>{item.name}</Text>
        <Image
          style={styles.buttonArrow}
          source={require("../assets/Profile/arrow.svg")}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Головне меню" />
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.shopContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    paddingHorizontal: screenWidth * 0.075,
    paddingVertical: screenHeight * 0.01,
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Color.colorLightGray,
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
    contentFit: "contain",
  },
});

export default AdminWindow;
