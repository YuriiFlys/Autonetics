import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo";
import GrayLine from "../../components/GrayLine";
import UserComponent from "../../components/User";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "react-native-axios";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ButtonMenu = ({ image, name, navig }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={navig}>
      <Image style={styles.buttonIcon} source={image} />
      <Text style={styles.buttonName}>{name}</Text>
      <Image
        style={styles.buttonArrow}
        source={require("../../assets/Profile/arrow.svg")}
      />
    </TouchableOpacity>
  );
};


const ShopAccount = () => {
  const [shopName, setShopName] = React.useState("");
  const [shopAddress, setShopAddress] = React.useState("");
  const [profileImage, setImage] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const navigator = useNavigation();
  React.useEffect(() => {
    //setImage to profile image
    setImage(
      "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
    );
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const decoded_jwt = jwtDecode(token);
      try {
        const res = await axios.get(
          `http://23.100.50.204:8080/api/staff/by-email/johndoe@mail.com`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const shopId = res.data.shopId;
        try{
          console.log(shopId);
        const resShop = await axios.get(
          `http://23.100.50.204:8080/api/shops/${shopId}`,
          {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const shopData = resShop.data;
        setShopName(shopData.name);
        setShopAddress(shopData.address.name + ", " + shopData.address.settlement.name);
        }
        catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const unsubscribe = navigator.addListener("focus", async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    });
    return unsubscribe;
  }, [navigator]);
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Керування магазином" />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
      <ScrollView contentContainerStyle={styles.mainContainer}>
      <UserComponent
        userName={shopName}
        profileImage={profileImage}
        description={shopAddress}
        imageSize={0.25}
      />
      <GrayLine style={{ marginTop: 10 }} />
      <ButtonMenu
        image={require("../../assets/Admin/shop.svg")}
        name={"Дані магазину"}
        navig={() => navigator.navigate("ShopsList")}
      />
      <GrayLine />
      <ButtonMenu
        image={require("../../assets/Profile/user.svg")}
        name={"Працівники"}
        navig={() => navigator.navigate("Employees")}
      />
      <GrayLine />
      <ButtonMenu
        image={require("../../assets/Profile/Settings.svg")}
        name={"Налаштування"}
        navig={() => navigator.navigate("Settings")}
      />
      <GrayLine />
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    flexDirection: "column",
    alignItems: "center",
  },
  mainContainer: {
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonIcon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  buttonName: {
    fontSize: FontSize.normal,
    fontFamily: FontFamily.normal,
    color: Color.colorDarkBlue,
    flex: 4,
    marginLeft: screenWidth * 0.05,
    fontWeight: "bold",
  },
  buttonArrow: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    contentFit: "contain",
  },
});

export default ShopAccount;
