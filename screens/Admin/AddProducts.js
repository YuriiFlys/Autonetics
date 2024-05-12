import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Element from "../../components/GoodsListElement";

import Logo from "../../components/Logo";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import GrayLine from "../../components/GrayLine";
import { or } from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    orderName: "Pepsico",
    product: [
      {
        id: 1,
        goodsName: "Beer",
        amount: 100,
        priceIn: 10.11,
        image: require("../../assets/Image_Product_or_Shop/beer.png"),
      },
      {
        id: 2,
        goodsName: "Lays",
        amount: 100,
        priceIn: 20.5,
        image: require("../../assets/Image_Product_or_Shop/beer.png"),
      },
    ],
  },
];
const AddProducts = () => {
  return (
    <SafeAreaView style={styles.container}>
      {data.map((order) => {
        return <RenderItem key={order.id} item={order} />;
      })}
    </SafeAreaView>
  );
};

const RenderItem = ({ item }) => {
  item.product.forEach((product) => {
    product.isBuy = false;
  });

  const [isBuy, setIsBuy] = useState(false);

  const handleIsBuy = () => {
    let buy = !item.product.every((product) => product.isBuy);
    setIsBuy(buy);
  };

  return (
    <>
      <TouchableOpacity style={styles.containerNameOrder}>
        <Text style={styles.orderName}>{item.orderName}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/Profile/arrow.svg")}
            style={styles.arrowImage}
          />
        </View>
      </TouchableOpacity>
      <GrayLine />
      <View style={styles.flaListContainer}>
        <FlatList
          data={item.product}
          keyExtractor={(product) => product.id.toString()}
          renderItem={({ item }) => (
            <Element item={item} handleIsBuy={handleIsBuy} />
          )}
        />
      </View>

      {isBuy ? (
        <View style={styles.buyContainer}>
          <TouchableOpacity style={styles.toBuy}>
            <Text style={styles.buttonText}>Перейти до Замовлення</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  containerNameOrder: {
    marginTop: 20,
    width: "90%",
    height: screenHeight * 0.05,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
  },
  orderName: {
    fontSize: FontSize.size_m,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    marginLeft: 10,
    marginBottom: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
    contentFit: "contain",
  },

  imageContainer: {
    width: "10%",
    alignItems: "center",
  },
  flaListContainer: {
    width: "100%",
  },
  toBuy: {
    width: "50%",
    height: screenHeight * 0.05,
    backgroundColor: Color.colorDarkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
  },
  buyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 10,
    alignItems: "center",
  },
});

export default AddProducts;
