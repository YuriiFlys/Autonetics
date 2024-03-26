import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import PromotionsWidget from "../components/PromotionsWidget";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Promotions = () => {
  const navigator = useNavigation();

  const [isNew, setIsNew] = useState(false);
  data = [
    {
      name: "Акції дня",
      item: [
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
      ],
    },
    {
      name: "Cуперціни",

      item: [
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
      ],
    },
    {
      name: "Новинки",

      item: [
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: "New",
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: "New",
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: "New",
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
      ],
    },
    {
      name: "Ваші пропозиції",
      item: [
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Вода 0,5 л Боржомі мінеральна сильногазована",
          price: 67.99,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Акції"} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.namePromotionContainer}
              onPress={() =>
                navigator.navigate("ListPromotions", { list: item })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.namePrmotionText}>{item.name}</Text>
                <View style={styles.nameCounterPromotion}>
                  <Text style={styles.nameCounterText}>{item.item.length}</Text>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/Profile/arrow.svg")}
                  style={styles.arrowImage}
                />
              </View>
            </TouchableOpacity>
            <FlatList
              data={item.item.slice(0, 5).concat({
                name: "Дививтись всі " + item.name,
                end: true,
              })}
              renderItem={({ item }) => <PromotionsWidget item={item} />}
              keyExtractor={(item) => item.name}
              horizontal={true}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  mainContainer: {
    width: screenWidth,
    flex: 1,
    flexDirection: "column",
    backgroundColor: Color.colorSuperLightGray,
    alignItems: "center",
  },
  namePrmotionText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_m,
    color: Color.colorDarkBlue,
    margin: 10,
  },
  namePromotionContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
  },
  nameCounterPromotion: {
    backgroundColor: Color.colorLightGray,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: "60%",
  },
  nameCounterText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_s,
    color: Color.colorWhite,
  },
  imageContainer: {
    width: "10%",
    alignItems: "center",
  },
  imagePromotion: {
    width: 30,
    height: 30,
    contentFit: "contain",
  },
  arrowImage: {
    width: 20,
    height: 20,
    contentFit: "contain",
  },
});
export default Promotions;
