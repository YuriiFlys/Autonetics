import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { Image } from "expo-image";
import ProductChart from "../../components/ProductChart";
import SmallWidget from "../../components/SmallWidget";
import Swiper from "react-native-swiper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ProductInfoAdmin = ({ route }) => {
  const { id } = route.params;
  const [price, setPrice] = useState([]);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const updateProduct = () => {
    fetch(`http://23.100.50.204:8080/goods/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Помилка при завантаженні даних");
        }
        return res.json();
      })
      .then((res) => {
        res.imageSource = [
          require("../../assets/Image_Product_or_Shop/voda.png"),
          require("../../assets/Image_Product_or_Shop/voda.png"),
          require("../../assets/Image_Product_or_Shop/voda.png"),
        ];
        res.shopLogo = require("../../assets/Image_Product_or_Shop/atbLogo.png");
        res.count = 10;
        res.numberSales = {
          2024: [110, 290, 360, 40, 50, 60, 80, 120, 23, 43, 34, 32], //2024
          2023: [75, 79, 52, 81, 69, 61, 79, 73, 60, 92, 81, 48], //2023
          2022: [41, 166, 51, 147, 145, 90, 163, 10, 82, 178, 193, 173], //2022
          2021: [119, 171, 76, 186, 230, 233, 18, 100, 178, 164, 184, 221], //2021
        };
        res.discount = 20;
        if (res.discount === 0) {
          setPrice(res.goodPriceOut.toString().split("."));
        } else {
          setPrice(
            (res.goodPriceOut * (100 - res.discount)) /
              (100).toString().split(".")
          );
        }
        setPrice(res.goodPriceOut.toFixed(2).toString().split("."));
        console.log(".toFixed(2).toString()", price);
        setProduct(res);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (!loading) {
    updateProduct();
  }
  const [isYear, setIsYear] = useState(true);

  const item = {
    id: 1,
    name: "Вода 0,5 л Боржомі мінеральна сильногазована",
    price: 67.99,
    discount: 20,
    imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
    shopLogo: require("../../assets/Image_Product_or_Shop/atbLogo.png"),
    isAvailable: true,
  };
  const scrollViewRef = useRef();

  return loading ? (
    <SafeAreaView style={styles.container}>
      <ScrollView
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
          <Text style={styles.productNameText}>{product.goodName}</Text>
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
                    ? require("../../assets/confirmation.svg")
                    : require("../../assets/denial.svg")
                }
              />
              <Text>{product.count > 0 ? "В наявності" : "Немає"}</Text>
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
                  {price[0]}
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
                  {price[1]}
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
          {/* {Object.entries(product.characteristics).map(([key, value]) => (
            <View style={styles.characteristicsItemContainer}>
              <Text style={styles.characteristicsKey}>{key}</Text>
              <Text style={styles.characteristicsValue}>{value}</Text>
            </View>
          ))} */}
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Тип продукту</Text>
            <Text style={styles.characteristicsValue}>
              {product.goodsTypeID}
            </Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Виробник</Text>
            <Text style={styles.characteristicsValue}>{product.producer}</Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Країна</Text>
            <Text style={styles.characteristicsValue}>{product.countryID}</Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Термін придатності</Text>
            <Text style={styles.characteristicsValue}>
              {product.expiryDate}
            </Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Умови зберігання</Text>
            <Text style={styles.characteristicsValue}>
              {product.storageCondition}
            </Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Склад</Text>
            <Text style={styles.characteristicsValue}>
              {product.composition}
            </Text>
          </View>
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Рейтинг</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {Array.from({ length: product.rating }).map((_, index) => (
                <Image
                  source={require("../../assets/Star.svg")}
                  style={{ width: 20, height: 20, marginHorizontal: 5 }}
                />
              ))}
            </View>
          </View>
        </View>
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
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
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

export default ProductInfoAdmin;
