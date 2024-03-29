import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import HistoryElement from "../components/HistoryElement";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

import Logo from "../components/Logo";
import GrayLine from "../components/GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Basket = () => {
  const navigator = useNavigation();
  const list = [
    {
      id: 1,
      shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
      nameCart: "Святковий кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99",
      isFavorite: false,
    },
    {
      id: 2,
      shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
      nameCart: "Щоденний кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99",
      isFavorite: true,
    },
    {
      id: 3,
      shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
      nameCart: "Студенський наборчик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "112.60",
      isFavorite: true,
    },
    {
      id: 4,
      shopLogo: require("../assets/Image_Product_or_Shop/atbLogo.png"),
      nameCart: "19:00 23.06.2024",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99",
      isFavorite: false,
    },
  ];
  const [data, setData] = React.useState(
    list.sort((a, b) => {
      if (a.isFavorite === b.isFavorite) {
        return 0;
      } else if (a.isFavorite) {
        return -1;
      } else {
        return 1;
      }
    })
  );
  const sortData = (data) => {
    setData(
      data.sort((a, b) => {
        if (a.isFavorite === b.isFavorite) {
          return 0;
        } else if (a.isFavorite) {
          return -1;
        } else {
          return 1;
        }
      })
    );
    // console.log(data);
    return data;
  };
  const [countFavorite, setCountFavorite] = React.useState(
    data.filter((item) => item.isFavorite === true).length
  );
  const updateData = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        if (item.isFavorite) {
          setCountFavorite(countFavorite - 1);
          return { ...item, isFavorite: false };
        } else {
          if (countFavorite < 3) {
            setCountFavorite(countFavorite + 1);
            return { ...item, isFavorite: true };
          } else {
            Alert.alert(
              "Ви досягли максимальну кількість улюблених товарів",
              `Максимальна кількість улюблених товарів - 3`
            );
          }
        }
      }
      return item;
    });
    sortData(newData);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Історія та улюблені"} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <HistoryElement item={item} updateData={updateData} />
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
    backgroundColor: "#FFF",
    position: "relative",
  },
  itemBasket: {
    height: screenHeight * 0.1,
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
export default Basket;
