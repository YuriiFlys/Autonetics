import React from "react";
import { StyleSheet, SafeAreaView, Dimensions,TouchableOpacity, Text } from "react-native";
import Logo from "../../components/Logo";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import UserComponent from "../../components/User";
import GrayLine from "../../components/GrayLine";

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
  const [profileImage, setImage] = React.useState(null);
  const navigator = useNavigation();
  React.useEffect(() => {
    //setImage to profile image
    setImage("https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png");
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Керування магазином"/>
      <UserComponent userName={"Магазин АТБ"} profileImage={profileImage} description={"Вул Шевченка 234, Львівська обл, 79888"} imageSize={0.25} />
      <GrayLine style={{marginTop:10}} />
        <ButtonMenu
          image={require("../../assets/Admin/Shop.svg")}
          name={"Дані магазину"}
          //navig={() => navigator.navigate("UserProfile")}
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
