import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import User from "../../components/User";

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

const UserAcount = ({}) => {
  const { user } = useUser();
  const navigator = useNavigation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setUserName(user.firstName + " " + user.lastName);
    } else {
      setUserName(" ");
    }
  }, [user]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollviewcontainer}>
        <Logo name="Особистий кабінет" />
        <User
          userName={userName}
          profileImage={user ? user.profileImage : null}  
          description={"Директор"}
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
