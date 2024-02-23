import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const HistoryElement = ({ item, updateData }) => {
  const navigator = useNavigation();

  return (
    <TouchableOpacity
      style={[
        { width: screenWidth, alignItems: "center" },
        item.isFavorite ? { backgroundColor: Color.colorSuperLightGray } : {},
      ]}
      onPress={() => navigator.navigate("HistoryScreen")}
    >
      <View style={styles.itemBasket}>
        <TouchableOpacity
          style={[styles.itemContentContainer, styles.startContainer]}
          onPress={() => {
            updateData(item.id);
          }}
        >
          <Image
            source={
              item.isFavorite
                ? require("../assets/fill_star.svg")
                : require("../assets/Star.svg")
            }
            style={styles.starImage}
          />
        </TouchableOpacity>
        <View style={[styles.itemContentContainer, styles.shopLogoContainer]}>
          <Image source={item.shopLogo} style={styles.shopLogo} />
        </View>
        <View style={[styles.itemContentContainer, styles.mainInfoContainer]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.nameCart}>{item.nameCart}</Text>
            <Text style={styles.price}> {item.price} ₴</Text>
          </View>
          <Text style={styles.shopAddress}>{item.shopAddress}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemBasket: {
    height: screenHeight * 0.1,
    width: screenWidth * 0.91,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Color.colorLightGray,
  },
  itemContentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  startContainer: {
    width: screenWidth * 0.11,
    height: "100%",
  },
  shopLogoContainer: {
    width: screenWidth * 0.15,
    height: "100%",
    padding: 5,
  },
  mainInfoContainer: {
    width: screenWidth * 0.65,
    height: "100%",
    alignItems: "flex-start",
    paddingLeft: 10,
    // paddingRight: 10,
    paddingTop: 10,
  },
  priceContainer: {
    width: screenWidth * 0.05,
    height: "100%",
  },
  arrowContainer: {
    width: screenWidth * 0.05,
    height: "100%",
  },
  starImage: {
    height: "40%",
    width: "40%",
    contentFit: "contain",
  },
  shopLogo: {
    height: "100%",
    width: "100%",
    contentFit: "contain",
  },
  nameCart: {
    fontSize: FontSize.size_m,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },
  price: {
    fontSize: FontSize.size_m,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },
  shopAddress: {
    fontFamily: FontFamily.CommissioneRegular,
    color: Color.colorLightGray,
    paddingTop: 5,
  },
  arrowImage: {
    height: "30%",
    width: "30%",
    contentFit: "contain",
  },
});

export default HistoryElement;
