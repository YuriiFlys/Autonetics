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
import Logo from "../../components/Logo";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import GrayLine from "../../components/GrayLine";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AdminWindow = () => {
  const navigation = useNavigation();
  const data = [
    {
      imageSource: require("../../assets/Admin/SaleSVG.svg"),
      name: "Продати товар",
      navigate: "SalesScreen",
    },
    {
      imageSource: require("../../assets/Admin/Storage.svg"),
      name: "Склад",
      navigate: "Storage",
    },
    {
      imageSource: require("../../assets/Admin/analysis.svg"),
      name: "Аналіз даних",
      navigate: "Analysis",
    },
    {
      imageSource: require("../../assets/Admin/SaleSVG.svg"),
      name: "Поповнення товарів",
      navigate: "AddProducts",
    },
    {
      imageSource: require("../../assets/Admin/interest.svg"),
      name: "Акції",
      navigate: "PromotionsAdmin",
    },
    {
      imageSource: require("../../assets/Admin/history.svg"),
      name: "Історія продаж",
      navigate: "Profile",
      params: { screen: "SellHistory" },
    },
    {
      imageSource: require("../../assets/Admin/Order.svg"),
      name: "Замовлення",
      navigate: "Order",
    },
    {
      imageSource: require("../../assets/Profile/user.svg"),
      name: "Працівники",
      navigate: "Shop",
      params: { screen: "Employees" },
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate(item.navigate, item.params)}
      >
        <Image style={styles.buttonIcon} source={item.imageSource} />
        <Text style={styles.buttonText}>{item.name}</Text>
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
        numColumns={2}
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
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    backgroundColor: Color.Primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.colorSuperLightGray,
    alignItems: "center",
    justifyContent: "center",
    margin: screenWidth * 0.03,
  },
  buttonIcon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  buttonText: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.Medium,
    color: Color.colorDarkBlue,
    marginTop: screenHeight * 0.05,
  },
});

export default AdminWindow;
