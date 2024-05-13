import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import ScannerCamera from "../../components/ScannerCamera";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const SearchBarcode = () => {
  const navigator = useNavigation();
  const scanned = async (barcode) => {
    // setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "http://23.100.50.204:8080/api/goods/barcode/" + barcode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const res = await response.json();
      navigator.navigate("ProductInfo", { id: res.id });
    } catch (error) {
      console.error("Error while fetching goods:", error);
      Alert.alert("Не знайдено товар", "Ой cхоже товар не знайдено");
    } finally {
      setIsRefreshing(false);
    }
  };

  return <ScannerCamera isCross={true} handleScanned={scanned} />;
};

const styles = StyleSheet.create({});

export default SearchBarcode;
