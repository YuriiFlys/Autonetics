import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import SmallWidget from "../components/SmallWidget";
import Swiper from "react-native-swiper";
import ProductChart from "../components/ProductChart.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ProductInfo = ({ isAdmin }) => {
  const product = {
    name: "Вода 0,5 л Боржомі мінеральна сильногазована",
    price: 67.99,
    discount: 20,
    imageSource: [
      require("../assets/Image_Product_or_Shop/voda.png"),
      require("../assets/Image_Product_or_Shop/voda.png"),
      require("../assets/Image_Product_or_Shop/voda.png"),
    ],
    shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
    count: 10,
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
    numberSales: {
      2024: [110, 290, 360, 40, 50, 60, 80, 120, 23, 43, 34, 32], //2024
      2023: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)), //2023
      2022: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)), //2022
      2021: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)), //2021
    },
  };
  const [isYear, setIsYear] = useState(true);

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
          <Swiper showsPagination={false}>
            {product.imageSource.map((image, index) => (
              <View key={index} style={{ flex: 1 }}>
                <Image source={image} style={styles.productimage} />
              </View>
            ))}
          </Swiper>
          <Image source={product.shopLogo} style={styles.shopLogo} />
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
                  product.count > 0
                    ? require("../assets/confirmation.svg")
                    : require("../assets/denial.svg")
                }
              />
              {isAdmin ? (
                <Text>
                  {product.count > 0 ? `В наявності ${product.count}` : "Немає"}
                </Text>
              ) : (
                <Text>{product.count > 0 ? "В наявності" : "Немає"}</Text>
              )}
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
        {isAdmin ? (
          <View style={styles.charContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonChar,
                  isYear ? { backgroundColor: Color.colorWhite } : null,
                ]}
                onPress={() => setIsYear(true)}
              >
                <Text>Рік</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonChar,
                  !isYear ? { backgroundColor: Color.colorWhite } : null,
                ]}
                onPress={() => setIsYear(false)}
              >
                <Text>Місяць</Text>
              </TouchableOpacity>
            </View>
            <Swiper showsPagination={false}>
              {Object.entries(product.numberSales).map(([year, salesArray]) => (
                <ProductChart
                  countSales={salesArray}
                  name={year}
                  axisY={[
                    "Січень",
                    "Лютий",
                    "Березень",
                    "Квітень",
                    "Травень",
                    "Червень",
                    "Липень",
                    "Серпень",
                    "Вересень",
                    "Жовтень",
                    "Листопад",
                    "Грудень",
                  ]}
                />
              ))}
            </Swiper>
          </View>
        ) : null}
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
  countText: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_s,
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
  charContainer: {
    backgroundColor: Color.colorWhite,
    marginTop: screenHeight * 0.02,
    width: screenWidth,
    height: screenHeight * 0.4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Color.colorSuperLightGray,
    margin: 10,
    padding: 2,
    borderRadius: 10,
  },
  buttonChar: {
    borderRadius: 10,
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductInfo;
