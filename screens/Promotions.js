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
          name: "Вода 1,5 л Моршинська мінеральна слабогазована",
          price: 24.32,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Кефір «Галичина» «ҐоКарпати» 1% пляшка, 800г",
          price: 15.99,
          discount: 15,
          imageSource:
            "https://images.silpo.ua/products/1600x1600/0db152c2-ea46-40e0-ab5f-2f9903f01c65.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Засіб для миття посуду Fairy Plus «Лимон», 1л",
          price: 124.0,
          discount: 19,
          imageSource:
            "https://images.silpo.ua/products/1600x1600/f73e3ca3-50f1-4d0c-ab20-f8c4b4a4571b.png",
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
          name: "Напій «Живчик» груша, 1л",
          price: 24.32,
          discount: 10,
          imageSource:
            "https://images.silpo.ua/products/1600x1600/2deaac09-881a-4145-8391-21796791c850.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Чай Lipton Yellow Label Чорний пакетований",
          price: 196.2,
          discount: 40,
          imageSource:
            "https://images.silpo.ua/products/1600x1600/70fc3b2d-a10f-40b3-bba9-6653c8c82f7a.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Крупа 1 кг Розумний вибір гречана",
          price: 24.8,
          discount: 10,
          imageSource:
            "https://src.zakaz.atbmarket.com/prodwebp/catalog_product_gal/i0/catalog_product_gal_173.webp",
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
          name: "Чипси Lay's Msx Strong зі смаком чилі та лайму 120 г",
          price: 66.99,
          discount: "New",
          imageSource:
            "https://images.silpo.ua/products/1600x1600/5e2b7eb7-e967-4253-b224-120e69ad1b04.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Батончик Roshen молочно-шоколадний з кокосом і мигдалем, 38г",
          price: 20.99,
          discount: "New",
          imageSource:
            "https://images.silpo.ua/products/1600x1600/c9ea85c2-d988-4bd0-a5f4-85c5973e2cc2.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Батончик Bueno шоколадно-вафельний, 43г",
          price: 67.99,
          discount: "New",
          imageSource:
            "https://images.silpo.ua/products/1600x1600/dfdbf94f-6372-4a98-88ce-7bdc3c61f708.png",
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
          name: "Вода 1,5 л Моршинська мінеральна слабогазована",
          price: 24.32,
          discount: 20,
          imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Батончик Bueno шоколадно-вафельний, 43г",
          price: 67.99,
          discount: "New",
          imageSource:
            "https://images.silpo.ua/products/1600x1600/dfdbf94f-6372-4a98-88ce-7bdc3c61f708.png",
          shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
          dataTime: {
            start: "01.01.2022",
            end: "01.01.2023",
          },
        },
        {
          name: "Ковбаса Ювілейний Преміум Салямі в чорному перці с/в в/ґ, фасовна, 0,08кг",
          price: 59.99,
          imageSource:
            "https://images.silpo.ua/products/1600x1600/f33039da-91a9-4c18-ab9c-f35fd927cfc0.png",
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
        refreshing={false}
        onRefresh={() => console.log("refresh")}
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
