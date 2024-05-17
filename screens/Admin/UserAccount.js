import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import User from "../../components/User";
import { set } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import axios from "react-native-axios";

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

const UserAcount = () => {
  const navigator = useNavigation();
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(true);
  
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
        const userData = res.data;
        if (userData.firstName === null || userData.lastName === null) {
          setUserName(" ");
        } else {
          setUserName(userData.firstName + " " + userData.lastName);
          setDescription(userData.staffType.name);
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
      <Logo name="Особистий кабінет" />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollviewcontainer}>
          <User
            userName={userName}
            profileImage={profileImage}
            description={description}
            imageSize={0.25}
          />
          <GrayLine style={{ marginTop: 10 }} />
          <ButtonMenu
            image={require("../../assets/Profile/user.svg")}
            name={"Особисті дані"}
            navig={() => navigator.navigate("UserProfile")}
          />
          <GrayLine />
          <ButtonMenu
            image={require("../../assets/Profile/history.svg")}
            name={"Історія"}
            navig={() => navigator.navigate("Cart", { screen: "Історія" })}
          />
          <GrayLine />
          <ButtonMenu
            image={require("../../assets/Profile/help.svg")}
            name={"Допомога"}
            navig={() => console.log("Допомога")}
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
  scrollviewcontainer: {
    flex: 1,
    flexDirection: "column",
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

export default UserAcount;
