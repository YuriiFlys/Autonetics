import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import UserComponent from "../../components/User";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";

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

const UserAcount = (props) => {
  const [profileImage, setImage] = React.useState(null);
  const user = props.user;
  const navigator = useNavigation();
  const [userName, setUserName] = React.useState("");
  
  React.useEffect(() => {
    const unsubscribe = navigator.addListener("focus", async () => {
      const response = await fetch(
        "https://23.100.50.204:8080/client/" + user.userID
      );
      const data = await response.json();
      if (data.firstName === null || data.lastName === null) {
        setUserName(" ");
      } else {
        setUserName(data.firstName + " " + data.lastName);
      }
    });
    return unsubscribe;
  }, [navigator]);
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Особистий кабінет"/>
      <UserComponent userName={"Ростислав Пастернак"} profileImage={profileImage} description={"Директор"} imageSize={0.25} />
      <GrayLine style={{marginTop:10}} />
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

export default UserAcount;
