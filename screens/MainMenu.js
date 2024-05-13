import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GrayLine from "../components/GrayLine";
import Search from "../components/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MainMenu = () => {
  const navigator = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const keyExtractor = (item, index) => index.toString();
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadShop();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLoadShop = async () => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://23.100.50.204:8080/api/shops", {
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
        imageSource: require("../assets/Image_Product_or_Shop/atbLogo.png"),
        distance: "500м",
      }));
      setData(newData);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSearchShop = async (data) => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "http://23.100.50.204:8080/api/shops/by-name/" + data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const responseData = await response.json();
      const newData = responseData.map((item) => ({
        ...item,
        imageSource: require("../assets/Image_Product_or_Shop/atbLogo.png"),
        distance: "500м",
      }));
      setData(newData);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.shop}
      onPress={() => {
        console.log(item.name);
        navigator.navigate("SalesScreen", { id: item.id });
      }}
    >
      <Image source={item.imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.street}>{item.address.name}</Text>
      </View>
      <Text style={styles.distanceText}>{item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Search search={handleSearchShop} />
      <GrayLine style={{ marginTop: 20 }} />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.shopContainer}
          refreshing={isRefreshing}
          onRefresh={handleLoadShop}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  labelText: {
    fontSize: 18,
    color: "#404040",
    backgroundColor: "green",
  },
  shopContainer: {},
  shop: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 25,
    width: screenWidth * 0.9,
    height: screenHeight * 0.13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  image: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  shopName: {
    fontWeight: "bold",
  },
  street: {
    color: "#808080",
  },
  distanceText: {
    alignSelf: "flex-end",
    color: "#808080",
    marginRight: 10,
    marginBottom: 5,
  },
  field: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 16,
    height: screenHeight * 0.05,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
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
    color: "#fff",
    fontSize: 14,
  },
});

export default MainMenu;
