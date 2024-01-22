import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Logo from '../components/Logo';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Basket = () => {
  const navigator = useNavigation();
  const toggleFavorites = () => {
    setFavoritesVisible(!favoritesVisible);
  };
  const toggleHystory = () => {
    setHystoryVisible(!hystoryVisible);
  };
  const data = [
    {
      shopLogo: require("../assets/atb500.png"),
      nameCart: "Святковий кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99"
    },
    {
      shopLogo: require("../assets/atb500.png"),
      nameCart: "Святковий кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99"
    },
    {
      shopLogo: require("../assets/atb500.png"),
      nameCart: "Святковий кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99"
    },
    {
      shopLogo: require("../assets/atb500.png"),
      nameCart: "Святковий кошик",
      shopAddress: "Вул. Шевченка 234, Львівська обл, 79023",
      price: "99.99"
    }
  ]

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemBasket}>
        <View style={[styles.itemContentContainer, styles.startContainer]}>
          <Image source={require("../assets/Star.svg")} style={styles.starImage} />
        </View>
        <View style={[styles.itemContentContainer, styles.shopLogoContainer]}>
          <Image source={item.shopLogo} style={styles.shopLogo} />
        </View>
        <View style={[styles.itemContentContainer, styles.mainInfoContainer]}>
          <Text>{item.nameCart}</Text>
          <Text>{item.shopAddress}</Text>
        </View>
        <View style={[styles.itemContentContainer, styles.priceContainer]}>
          <Text>{item.price}</Text>
        </View>
        <View style={[styles.itemContentContainer, styles.arrowContainer]}>
          <Image source={require("../assets/Star.svg")} style={styles.arrowImage} />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Історія та улюблені"} />
      <FlatList
        data={data}
        renderItem={renderItem}
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
    width: screenWidth,
    flexDirection: "row",
  },
  itemContentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  startContainer: {
    width: screenHeight * 0.05,
    height: "100%",
  },
  shopLogoContainer: {
    width: screenHeight * 0.05,
    height:"100%",
  },
  mainInfoContainer: {
    width: screenHeight * 0.25,
    height:"100%",
  },
  priceContainer: {
    width: screenHeight * 0.05,
    height: "100%",
  },
  arrowContainer: {
    width: screenHeight * 0.05,
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
  arrowImage: {
    height: "30%",
    width: "30%",
    contentFit: "contain",
  }
});
export default Basket;
