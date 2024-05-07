import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import GrayLine from "../components/GrayLine";
import UserComponent from "../components/User";
import { useUser } from "./UserContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Profile = () => {
  const { user } = useUser();
  const navigator = useNavigation();
  const [userName, setUserName] = React.useState("");
  const [profileImage, setImage] = React.useState(null);
  React.useEffect(() => {
    if (user.firstName === null || user.lastName === null) {
      setUserName(" ");
    } else {
      setUserName(user.firstName + " " + user.lastName);
    }
  }, [user]);

  const ButtonMenu = ({ image, name, navig }) => {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={navig}>
        <Image style={styles.buttonIcon} source={image} />
        <Text style={styles.buttonName}>{name}</Text>
        <Image
          style={styles.buttonArrow}
          source={require("../assets/Profile/arrow.svg")}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo name={"Профіль"} />
      <View style={styles.mainContainer}>
        <UserComponent
          userName={userName}
          profileImage={profileImage}
          imageSize={0.25}
        />
        <GrayLine style={{ marginTop: 10 }} />
        <ButtonMenu
          image={require("../assets/Profile/user.svg")}
          name={"Особисті дані"}
          navig={() => navigator.navigate("UserProfile")}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/history.svg")}
          name={"Історія"}
          navig={() => navigator.navigate("Cart", { screen: "Історія" })}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/help.svg")}
          name={"Допомога"}
          navig={() => console.log("Допомога")}
        />
        <GrayLine />
        <ButtonMenu
          image={require("../assets/Profile/Settings.svg")}
          name={"Налаштування"}
          navig={() => navigator.navigate("Settings")}
        />
        <GrayLine />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    position: "relative",
  },
  mainContainer: {
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
  userData: {
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: screenHeight * 0.02,
  },
  userIcon: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 1000,
    backgroundColor: Color.colorLightCyan,
    left: screenWidth * 0.1,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  userIconImage: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
  },
  userIconText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Color.colorDarkBlue,
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: Color.colorDarkBlue,
    flex: 4,
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
export default Profile;
