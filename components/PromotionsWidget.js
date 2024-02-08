import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import { Color, FontFamily } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const PromotionsWidget = ({ item }) => {
  const navigator = useNavigation();
  if (item.end) {
    return (
      <TouchableOpacity
        style={[styles.container, { padding: 0 }]}
        onPress={() => navigator.navigate("ListPromotions")}
      >
        <ImageBackground
          source={require("../assets/background_promotion_widget.jpeg")}
          style={styles.backgroundImage}
          borderRadius={10}
        >
          <Text style={styles.textEndWidget}>Дивитись всі {item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  } else {
    const price =
      item.discount > 0
        ? ((item.price * (100 - item.discount)) / 100)
            .toFixed(2)
            .toString()
            .split(".")
        : item.price.toString().split(".");

    const dataTime = item.dataTime;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigator.navigate("ProductInfo")}
      >
        {item.discount ? (
          <View
            style={[
              styles.tag,
              item.discount === "New" ? { backgroundColor: "green" } : null,
            ]}
          >
            <Text style={styles.text}>
              {item.discount === "New" ? item.discount : `-${item.discount}%`}
            </Text>
          </View>
        ) : null}
        <View style={styles.mainCotainer}>
          <View style={[styles.nameCotainer, { justifyContent: "flex-end" }]}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.priceWholePart, { fontSize: 25 }]}>
                {price[0]}
              </Text>
              <View style={{ justifyContent: "flex-end" }}>
                <Text style={[styles.priceWholePart, { fontSize: 15 }]}>
                  {price[1]}
                </Text>
                {item.discount > 0 ? (
                  <Text
                    style={[
                      styles.priceWholePart,
                      {
                        fontSize: 15,
                        color: Color.colorLightGray,
                        textDecorationLine: "line-through",
                      },
                    ]}
                  >
                    {item.price}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <View
            style={[
              styles.nameCotainer,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Image style={styles.imageSource} source={item.imageSource} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.dataTime}>
            Діє з {dataTime.start} до {dataTime.end}
          </Text>
          <Image style={styles.imageSourceShop} source={item.shopLogo} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: screenWidth * 0.5,
    width: screenWidth * 0.9,
    backgroundColor: Color.colorWhite,
    borderColor: Color.colorLightGray,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  mainCotainer: {
    height: "80%",
    width: "100%",
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#C32228",
    width: "15%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 15,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  nameCotainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 15,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  priceWholePart: {
    color: "#C32228",
    fontSize: 30,
    fontFamily: FontFamily.CommissioneBold,
  },
  imageSource: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  bottomContainer: {
    height: "20%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataTime: {
    fontSize: 12,
    fontFamily: FontFamily.CommissioneRegular,
    color: Color.colorLightGray,
  },
  imageSourceShop: {
    width: "50%",
    height: "100%",
    contentFit: "contain",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textEndWidget: {
    fontSize: 20,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
});

export default PromotionsWidget;
