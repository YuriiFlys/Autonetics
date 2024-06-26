import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import GrayLine from "../components/GrayLine";
import UserComponent from "../components/User";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "react-native-axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Profile = () => {
  const navigator = useNavigation();
  const [isLoading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [profileImage, setImage] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollViewRef = React.useRef();
  const fetchData = async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    const decoded_jwt = jwtDecode(token);
    try {
      const res = await axios.get(
        `http://23.100.50.204:8080/api/clients/by-email/${decoded_jwt.email}`,
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
        setRefreshing(false);
      }
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigator.addListener("focus", async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    });

    return unsubscribe;
  }, [navigator]);
  

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
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView ref={scrollViewRef}
        automaticallyAdjustContentInsets={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        contentContainerStyle={styles.mainContainer}>
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
        </ScrollView>
      )}
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
