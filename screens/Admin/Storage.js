import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Logo from "../../components/Logo";
import { Image } from "expo-image";

import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import Search from "../../components/Search";
import GrayLine from "../../components/GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

// const data = [
//   {
//     name: "Мінеральна вода негазована 1.5л Моршинська",
//     price: 20.99,
//     count: 10,
//     imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
//   },
//   {
//     name: "Мінеральна вода негазована 1.5л Моршинська",
//     price: 20.99,
//     count: 10,
//     imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
//   },
// ];
const Storage = () => {
  const navigator = useNavigation();
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [shopID, setShopID] = useState();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadShop();
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (shopID !== null) {
      handleLoadGoods();
    }
  }, [shopID]);

  const handleLoadShop = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const email = jwtDecode(token).email;
      const employeeResponse = await fetch(
        `http://23.100.50.204:8080/api/staff/by-email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!employeeResponse.ok) {
        throw new Error("Failed to fetch employee");
      }
      const employee = await employeeResponse.json();
      setShopID(employee.shopId);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    }
  };

  const handleLoadGoods = async () => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("shopID", shopID);
      const response = await fetch(
        `http://23.100.50.204:8080/api/inventories/by-shop-id/${shopID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch goods");
      }
      const responseData = await response.json();
      const newData = responseData.map((item) => ({
        ...item.goodsID,
        count: 10,
        imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
      }));
      setData(newData);
    } catch (error) {
      console.error("Error while fetching goods:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigator.navigate("ProductInfo", { id: item.id })} //todo
      >
        <Image
          source={item.imageSource}
          style={{ width: "20%", height: "90%" }}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.nameText}>{item.priceOut}₴</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{item.count}шт</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleSearch = async (search) => {
    setLoading(true);
    if (!search) {
      await handleLoadGoods();
      setLoading(false);
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch("http://23.100.50.204:8080/api/" + search, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const responseData = await response.json();
      const newData = responseData.map((item) => ({
        ...item,
        count: 10,
        imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
      }));
      setData(newData);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Склад" />
      <GrayLine />
      <Search search={handleSearch} setData={setSearchData} />
      <View style={{ flexDirection: "row", marginVertical: 20 }}>
        <TouchableOpacity
          style={styles.searchBarcode}
          onPress={() => navigator.navigate("SearchBarcode")}
        >
          <Image
            source={require("../../assets/Admin/barcode.svg")}
            style={styles.barcodeimge}
          />
          <Text>Пошук по штрих коду</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigator.navigate("AddProductsScreen");
          }}
        >
          <Text style={styles.buttonSearch}>+</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={() => handleLoadGoods}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
  },
  buttonContainer: {
    marginLeft: 10,
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    backgroundColor: "#26364D",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSearch: {
    color: Color.colorWhite,
    fontSize: FontSize.size_2xl,
  },

  searchBarcode: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 16,
    height: screenHeight * 0.05,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  barcodeimge: {
    height: "100%",
    width: "10%",
    contentFit: "contain",
    marginRight: 10,
  },
  productContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
    alignItems: "center",
  },
  nameContainer: {
    width: "60%",
    height: "90%",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  countContainer: {
    width: "20%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },

  countText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },
});

export default Storage;
