import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Logo from "../../components/Logo";
import { Image } from "expo-image";

import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import Search from "../../components/Search";
import GrayLine from "../../components/GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const data = [
  {
    name: "Мінеральна вода негазована 1.5л Моршинська",
    price: 20.99,
    count: 10,
    imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
  },
  {
    name: "Мінеральна вода негазована 1.5л Моршинська",
    price: 20.99,
    count: 10,
    imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
  },
];
const Storage = () => {
  const navigator = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigator.navigate("ProductInfo")}
      >
        <Image
          source={item.imageSource}
          style={{ width: "20%", height: "90%" }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.nameText}>{item.price}₴</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{item.count}шт</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Склад" />
      <GrayLine />
      <Search />
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <TouchableOpacity
          style={styles.searchBarcode}
          onPress={() => navigator.navigate("SearchBarcode")}
        >
          <Image
            source={require("../../assets/Admin/barcode.svg")}
            style={styles.barcodeimge}
          />
          <Text>Пошук по штрих коду</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("+");
          }}
        >
          <Text style={styles.buttonSearch}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
  },
  buttonContainer: {
    marginLeft: 10,
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    backgroundColor: "#26364D",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSearch: {
    color: Color.colorWhite,
    fontSize: FontSize.size_2xl,
  },

  searchBarcode: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 16,
    height: screenHeight * 0.05,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  barcodeimge: {
    height: "100%",
    width: "10%",
    contentFit: "contain",
    marginRight: 10,
  },
  productContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
    alignItems: "center",
  },
  nameContainer: {
    width: "60%",
    height: "90%",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  countContainer: {
    width: "20%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },

  countText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },
});

export default Storage;
