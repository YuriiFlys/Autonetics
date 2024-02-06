import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
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

  const scrollViewRef = useRef();
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
      name: "Cуперціна",
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
          <View>
            <View style={styles.namePromotionContainer}>
              <Text style={styles.namePrmotionText}>{item.name}</Text>
              <View style={styles.nameCounterPromotion}>
                <Text style={styles.nameCounterText}>{item.item.length}</Text>
              </View>
            </View>
            <FlatList
              data={item.item}
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
  namePromotionContainer: { flexDirection: "row", alignItems: "center" },
  nameCounterPromotion: {
    backgroundColor: Color.colorLightGray,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    paddingHorizontal: 15,
  },
  nameCounterText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_s,
    color: Color.colorWhite,
  },
});
export default Promotions;
