import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import Fonts from "../GlobalStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const StartMenu = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Fonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.startmenu}>
      <Text style={styles.welcomeTo}>{`Welcome to `}</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logoAutonetics.png")}
      />
      <Text style={styles.autonetics}>Autonetics!</Text>
      <Pressable
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <View style={styles.loginButtonChild} />
        <Text style={styles.text}>Log in</Text>
      </Pressable>
      <Pressable
        style={styles.signupButton}
        onPress={() => navigation.navigate("AddProductsScreen")}
      >
        <View style={styles.signupButtonChild} />
        <Text style={styles.signUp}>Sign Up</Text>
      </Pressable>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    alignSelf: "center",
    marginTop: screenHeight * 0.02,
    height: screenHeight * 0.3,
    width: screenWidth * 0.6,
  },
  welcomeTo: {
    marginTop: screenHeight * 0.1,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkBlue,
  },
  autonetics: {
    marginTop: screenHeight * 0.01,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkBlue,
  },
  loginButton: {
    marginTop: screenHeight * 0.05,
    alignSelf: "center",
    height: screenHeight < 600 ? screenHeight * 0.07 : screenHeight * 0.06,
    width: screenWidth * 0.5,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: Color.colorLightCyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  signupButton: {
    alignSelf: "center",
    marginTop: screenHeight * 0.02,
    height: screenHeight < 600 ? screenHeight * 0.07 : screenHeight * 0.06,
    width: screenWidth * 0.5,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
  },
  signUp: {
    textAlign: "center",
    color: Color.colorLightCyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  startmenu: {
    flex: 1,
    backgroundColor: Color.colorLightCyan,
    justifyContent: "flex-start",
  },
});

export default StartMenu;
