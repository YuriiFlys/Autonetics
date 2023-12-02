import * as React from "react";
import * as Device from 'expo-device';
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const StartMenu = () => {
  const navigation = useNavigation();
  return (
    console.log(Device.modelName),
    <View style={styles.startmenu}>
      <Text style={styles.welcomeTo}>{`Welcome to `}</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
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
        onPress={() => navigation.navigate("Signup")}
      >
        <View style={styles.signupButtonChild} />
        <Text style={styles.signUp}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  logoIcon: {
    alignSelf: 'center',
    marginTop: '5%',
    height: '35%',
    width: '60%',
  },
  welcomeTo: {
    marginTop: '25%',
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#354962",
  },
  autonetics: {
    marginTop: '5%',
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#354962",
  },
  loginButton: {
    marginTop: '5%',
    alignSelf: 'center',
    height: 52,
    width: '50%',
    backgroundColor: "#354962",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: Color.colorLightcyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  signupButton: {
    alignSelf: 'center',
    marginTop: '5%',
    height: 52,
    width: '50%',
    backgroundColor: "#354962",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  signUp: {
    textAlign: 'center',
    color: Color.colorLightcyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  startmenu: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default StartMenu;
