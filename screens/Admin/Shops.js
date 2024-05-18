import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import UserComponent from "../../components/User";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import axios from "react-native-axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ShopsList = ({ shops }) => {
  const navigator = useNavigation();
  const [data, setData] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadShops();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLoadShops = async () => {
    setIsRefreshing(true);
    try {
        const token = await AsyncStorage.getItem("token");
        const decoded_jwt = jwtDecode(token);
        const res = await axios.get(
            `http://23.100.50.204:8080/api/staff/by-email/${decoded_jwt.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        const staff= res.data;
        
        const shopId = staff.shopId;
        
        
        const shopResponse = await axios.get(
            `http://23.100.50.204:8080/api/shops/by-id/${shopId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        const shopData = shopResponse.data;
        const customerId = shopData.customer.id;
        const customerResponse = await axios.get(
            `http://23.100.50.204:8080/api/shops/by-customer-id/${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
            const shopsList = customerResponse.data;
        const newData = shopsList.map((item) => ({
            ...item,
            profileImage:
            "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
        }));
        setData(newData);
        } catch (error) {
        console.error("Error while fetching shops:", error);
        } finally {
        setIsRefreshing(false);
        }
    };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
    ) : (
    <FlatList
      data={data}
      renderItem={({ item: shop, index }) => (
        <View style={styles.ShopsList}>
          <TouchableOpacity
            onPress={() => navigator.navigate("ShopDetails", { shop })}
          >
            <UserComponent
              userName={shop.name}
              profileImage={shop.profileImage}
              description={shop.address.name + ", " + shop.address.settlement.name}
              imageSize={0.23}
            />
          </TouchableOpacity>
          <GrayLine />
        </View>
      )}
      keyExtractor={(shop, index) => index.toString()}
      refreshing={isRefreshing}
      onRefresh={handleLoadShops}
    />
  );
};

const Shops = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Магазини" />
      <ShopsList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ShopsList: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Shops;
