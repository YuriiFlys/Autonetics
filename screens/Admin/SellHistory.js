import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SellHistory = () => {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoadHistory = async () => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch("http://23.100.50.204:8080/api/order", {
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
        clientID: {
          ...item.clientID,
          logo: null,
        },
      }));
      console.log("newData", newData);
      setData(newData);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadHistory();
      setLoading(false);
    };
    loadData();
  }, []);

  const getInitials = (name) => {
    try {
      const words = name.split(" ");
      const initials = words
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      return initials;
    } catch (error) {
      return "";
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            ...styles.userIcon,
            width: screenWidth * 0.18,
            height: screenWidth * 0.18,
          }}
        >
          {item.clientID.logo ? (
            <Image
              source={{ uri: profileImage }}
              style={{
                ...styles.userIconImage,
                width: screenWidth * imageSize,
                height: screenWidth * imageSize,
              }}
            />
          ) : (
            <Text style={styles.userIconText}>
              {getInitials(
                item.clientID.firstName + " " + item.clientID.lastName
              )}
            </Text>
          )}
        </View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text style={styles.itemTimeText}>{item.orderDateTime}</Text>
        </View>
        <Text>{item.orderAmount}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Logo name="Історія продаж" /> */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          renderItem={(item) => renderItem(item)}
          data={data}
          keyExtractor={(item) => item.id}
          refreshing={isRefreshing}
          onRefresh={handleLoadHistory}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: screenHeight * 0.12,
    // backgroundColor: "red",
    paddingHorizontal: screenHeight * 0.02,
    alignItems: "center",
  },
  itemLogo: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    borderRadius: screenHeight * 0.05,
    // backgroundColor: "blue",
  },
  itemNameContainer: {
    width: screenWidth * 0.5,
    // backgroundColor: "green",
    height: "80%",
    justifyContent: "center",
    // justifyContent: "space-around",
  },
  itemNameText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkBlue,
  },
  itemTimeText: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
  },
  userIconText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Color.colorDarkBlue,
  },
  userIcon: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 1000,
    backgroundColor: Color.colorWhite,
    left: screenWidth * 0.05,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Color.colorDarkBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});

export default SellHistory;
