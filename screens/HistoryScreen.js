import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import ShopReceipt from "../components/ShopReceipt";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HistoryScreen = ({ style }) => {
  list = [
    {
      id: 1,
      name: "Моршинська1",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 10,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 2,
      name: "Моршинська2",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 3,
      name: "Моршинська3",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 4,
      name: "Моршинська4",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 5,
      name: "Моршинська5",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 6,
      name: "Моршинська6",
      price: 123.28,
      imageSource: require("../assets/Image_Product_or_Shop/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
  ];
  const shop = {
    name: "Магазин АТБ",
    address: "вул. Шевченка, 1, Львів, Львівська область, 79000",
    imageSource: require("../assets/Image_Product_or_Shop/atbLogo.png"),
    formattedDateTime: "2021-05-20 12:00:01",
  };
  const info = {
    sum: 123.28,
    formattedDateTime: "2021-05-20 12:00:01",
  };
  const navigator = useNavigation();
  const handleShareReceipt = () => {
    console.log("Share receipt");
  };

  const [data, setData] = React.useState(list);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.shopelement}
        onPress={() => {
          navigator.navigate("ProductInfo", { item: item });
        }}
      >
        <Image source={item.imageSource} style={styles.imageSource} />
        <View style={styles.nameContainer}>
          <Text style={styles.shopName}>{item.name}</Text>
          <Text style={styles.counterText}>Ціна: {item.price}$</Text>
        </View>
        <View style={styles.counterContainer}>
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <Text style={styles.counterText}>Кількість: </Text>
            <Text
              style={[
                styles.counterText,
                { fontFamily: FontFamily.CommissioneBold },
              ]}
            >
              {item.number}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginRight: 20 }}
          >
            <Text style={styles.counterText}>Сума: </Text>
            <Text
              style={[
                styles.counterText,
                { fontFamily: FontFamily.CommissioneBold },
              ]}
            >
              {item.number * item.price}$
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ShopReceipt shop={shop} info={info} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={styles.shopContainer}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleShareReceipt()}
        >
          <Text style={styles.buttonText}>Поділитись чеком</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate("SalesScreen")}
        >
          <Text style={styles.buttonText}>Повторити платіж</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatList: {
    width: screenWidth,
    height: screenHeight * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
    borderTopWidth: 1,
    borderTopColor: Color.colorLightGray,
    alignItems: "center",
    margin: 20,
  },

  productElement: {
    width: screenWidth,
    height: screenWidth * 0.25,
  },
  shopelement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: screenWidth,
    height: screenHeight * 0.15,
  },
  imageSource: {
    width: screenWidth * 0.1,
    height: "100%",
    resizeMode: "contain",
    overflow: "hidden",
    flex: 1,
  },
  nameContainer: {
    flex: 2,
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  shopName: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  counterContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: screenWidth,
    height: screenHeight * 0.1,
    alignItems: "center",
  },
  button: {
    backgroundColor: Color.colorDarkBlue,
    padding: 10,
    borderRadius: 16,
    height: screenHeight * 0.07,
    justifyContent: "center",
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_m,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HistoryScreen;
