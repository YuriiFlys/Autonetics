import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import SmallWidget from "../components/SmallWidget";
import Logo from "../components/Logo";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProductInfo = () => {
  const product = {
    name: "Вода 0,5 л Боржомі мінеральна сильногазована",
    price: 67.99,
    discount: 20,
    imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
    shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
    isAvailable: true,
    description:
      "Вода Боржомі - природна мінеральна вода, батьківщиною добування якої є Грузія. Історія води налічує понад тисячу років. Вона має чудовий смак і відмінний гідрокарбонатно-натрієвий склад. Містить багато мінералів і мікроелементів: натрій, кальцій, хлор, сірка, кремній, фтор і магній. Дуже добре підходить для попередження і лікування в якості додаткової терапії гастритів, виразки дванадцятипалої кишки та інших захворювань шлунково-кишкового тракту. Але не підходить в періоди загострення виразки.",

    characteristics: {
      "Торгова марка": "Боржомі",
      Склад:
        "Вода мінеральна природна лікувально-столова гідрокарбонатна натрієва сильногазована",
      ГМО: "НІ",
      Газованість: "СИЛЬНОГАЗОВАНА",
      "Сульфати (SO4)": "<10 мг/дм.куб.м",
      "Температура зберігання": "+3..+30 °C",
      "Хлор (Cl)": "250-500 мг/дм.куб.",
      "Кальцій (Ca)": "20-150 мг/дм.куб.",
      "Органічний продукт": "НІ",
      "Вид продукції": "ВОДА МІНЕРАЛЬНА",
      "Калій (K)": "15-45 мг/дм.куб.",
      "Гідрокарбонати (HCO3)": "3500-5000 мг/куб.дм",
    },
  };

  const item = {
    id: 1,
    name: "Вода 0,5 л Боржомі мінеральна сильногазована",
    price: 67.99,
    discount: 20,
    imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
    shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
    isAvailable: true,
  };
  const scrollViewRef = useRef();
  if (product.discount === 0) {
    const price = product.price.toString().split(".");
    console.log(price);
  } else {
    const price = ((product.price * (100 - product.discount)) / 100)
      .toString()
      .split(".");
    console.log(price);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        automaticallyAdjustContentInsets={true}
        style={{ backgroundColor: Color.colorSuperLightGray }}
      >
        <View style={styles.productImageContainer}>
          <Image source={product.shopLogo} style={styles.shopLogo} />
          <Image source={product.imageSource} style={styles.productimage} />
        </View>
        <View style={styles.productNameContainer}>
          <Text style={styles.productNameText}>{product.name}</Text>
          <View
            style={{
              height: screenHeight * 0.05,
              flex: 1,
              flexDirection: "row",
            }}
          >
            <View style={styles.productAvailavilityContainer}>
              <Image
                style={styles.isAvailableImage}
                source={
                  product.isAvailable
                    ? require("../assets/confirmation.svg")
                    : require("../assets/denial.svg")
                }
              />
              <Text>{product.isAvailable ? "В наявності" : "Немає"}</Text>
            </View>
            <View style={styles.priceContainer}>
              {/* стара ціна */}
              <View style={styles.priceContainer}>
                <Text
                  style={[
                    styles.priceWholePart,
                    {
                      fontSize: 25,
                      color: Color.colorDarkBlue,
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  20
                </Text>
                <Text
                  style={[
                    styles.priceWholePart,
                    {
                      fontSize: 15,
                      color: Color.colorDarkBlue,
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  19
                </Text>
              </View>
              {/* нова ціна */}
              <View style={styles.priceContainer}>
                <Text style={[styles.priceWholePart, { fontSize: 25 }]}>
                  20
                </Text>
                <Text style={[styles.priceWholePart, { fontSize: 15 }]}>
                  19
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Опис та характеристики</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
          {Object.entries(product.characteristics).map(([key, value]) => (
            <View style={styles.characteristicsItemContainer}>
              <Text style={styles.characteristicsKey}>{key}</Text>
              <Text style={styles.characteristicsValue}>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.productOffersContainer}>
          <Text style={styles.title}>Ваші пропозиції</Text>
          <FlatList
            data={[item, item, item, item, item]}
            renderItem={({ item }) => <SmallWidget item={item} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  productImageContainer: {
    backgroundColor: Color.colorWhite,
    height: screenHeight * 0.3,
    width: screenWidth,
    padding: 10,
  },
  productimage: {
    height: "100%",
    width: "100%",
    contentFit: "contain",
  },
  shopLogo: {
    position: "absolute",
    top: 10,
    left: 10,
    height: screenHeight * 0.07,
    width: screenHeight * 0.07,
    contentFit: "contain",
  },
  productNameContainer: {
    backgroundColor: Color.colorWhite,
    width: screenWidth,
    padding: 10,
  },
  productNameText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkBlue,
  },

  productAvailavilityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  isAvailableImage: {
    width: screenHeight * 0.02,
    height: "100%",
    contentFit: "contain",
    margin: 10,
  },
  priceContainer: {
    flexDirection: "row",
    flex: 1,
  },
  priceWholePart: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },

  descriptionContainer: {
    backgroundColor: Color.colorWhite,
    marginTop: screenHeight * 0.02,
    width: screenWidth,
    padding: 10,
  },
  title: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkBlue,
    marginBottom: 10,
  },
  descriptionText: {
    margin: 10,
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_s,
    color: Color.colorDarkBlue,
  },
  characteristicContainer: {},
  characteristicsItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.colorLightGray,
  },
  characteristicsKey: {
    flex: 1,
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_s,
    color: Color.colorLightGray,
  },
  characteristicsValue: {
    flex: 1,
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_s,
    color: Color.colorDarkBlue,
  },
  productOffersContainer: {
    marginTop: screenHeight * 0.02,
    width: screenWidth,
    padding: 10,
  },
});

export default ProductInfo;
