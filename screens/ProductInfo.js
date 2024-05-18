import React, { useState, useRef, useEffect } from "react";
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";
import SmallWidget from "../components/SmallWidget";
import Swiper from "react-native-swiper";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const ProductInfo = ({ route }) => {
  const { id } = route.params;
  const [price, setPrice] = useState([]);
  const [product, setProduct] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [descriptionTable, setDescriptionTable] = useState();
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadProduct();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLoadProduct = async () => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "http://23.100.50.204:8080/api/goods/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      let responseData = await response.json();
      console.log("response", responseData);

      let descriptionResponse = {
        Вага: responseData.weight,
        "Тип продукту": responseData.goodsTypeId.name,
        Виробник: responseData.producer,
        "Методи зберігання": responseData.storageCondition,
        Склад: responseData.composition,
        Країна: responseData.countryID.name,
      };
      console.log("descriptionResponse", descriptionResponse);

      setDescriptionTable(descriptionResponse);

      responseData.imageSource = [
        require("../assets/Image_Product_or_Shop/voda.png"),
        require("../assets/Image_Product_or_Shop/voda.png"),
        require("../assets/Image_Product_or_Shop/voda.png"),
      ];

      responseData.shopLogo = require("../assets/Image_Product_or_Shop/atbLogo.png");
      responseData.count = 10;

      // res.characteristics = {
      //   "Торгова марка": "Боржомі",
      //   Склад:
      //     "Вода мінеральна природна лікувально-столова гідрокарбонатна натрієва сильногазована",
      //   ГМО: "НІ",
      //   Газованість: "СИЛЬНОГАЗОВАНА",
      //   "Сульфати (SO4)": "<10 мг/дм.куб.м",
      //   "Температура зберігання": "+3..+30 °C",
      //   "Хлор (Cl)": "250-500 мг/дм.куб.",
      //   "Кальцій (Ca)": "20-150 мг/дм.куб.",
      //   "Органічний продукт": "НІ",
      //   "Вид продукції": "ВОДА МІНЕРАЛЬНА",
      //   "Калій (K)": "15-45 мг/дм.куб.",
      //   "Гідрокарбонати (HCO3)": "3500-5000 мг/куб.дм",
      // };
      responseData.discount = 20;
      console.log(
        "responseData",
        responseData.priceOut.toFixed(2).toString().split(".")
      );

      if (responseData.discount === 0) {
        setPrice(responseData.priceOut.toFixed(2).toString().split("."));
      } else {
        setPrice(
          (responseData.priceOut * (100 - responseData.discount)) /
            (100).toString().split(".")
        );
      }
      setProduct(responseData);
    } catch (error) {
      console.error("Error while fetching goods:", error);
    } finally {
      setIsRefreshing(false);
    }
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

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
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
              <Text>{product.count > 0 ? "В наявності" : "Немає"}</Text>
            </View>
            <View style={styles.priceContainer}>
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
          {Object.entries(descriptionTable).map(([key, value]) => (
            <View style={styles.characteristicsItemContainer}>
              <Text style={styles.characteristicsKey}>{key}</Text>
              <Text style={styles.characteristicsValue}>{value}</Text>
            </View>
          ))}
          <View style={styles.characteristicsItemContainer}>
            <Text style={styles.characteristicsKey}>Рейтинг</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              {Array.from({ length: product.rating }).map((_, index) => (
                <Image
                  source={require("../assets/Star.svg")}
                  style={{ width: 20, height: 20, marginHorizontal: 5 }}
                />
              ))}
            </View>
          </View>
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

export default ProductInfo;
