import * as React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SignUpMenu = () => {
    const navigator = useNavigation();
  return (
    <View style={[styles.signupmenu, styles.iconLayout]}>
      <Image
        style={[styles.logoIcon, styles.logoIconLayout]}
        contentFit="cover"
        source={require("../assets/logo1.png")}
      />
      <Text
        style={[styles.welcomeTo, styles.welcomeToTypo]}
      >{`Welcome to `}</Text>
      <Text style={[styles.autonetics, styles.welcomeToTypo]}>Autonetics!</Text>
      <View style={[styles.signupButton, styles.signupShadowBox]}>
        <View style={styles.signupButtonChild} />
        <View style={styles.signupButtonItem} />
        <Text style={[styles.phoneNumber, styles.passPosition]}>
          Phone number
        </Text>
      </View>
      <View style={[styles.signupButton1, styles.signupShadowBox]}>
        <View style={styles.signupButtonChild} />
        <View style={styles.signupButtonItem} />
        <Text style={[styles.enterPass, styles.passPosition]}>
          Enter password
        </Text>
      </View>
      <Pressable
        style={[styles.signupButton2, styles.signupmenuShadowBox]}
        onPress={() => {}}
      >
        <Text style={styles.register}>Register</Text>
      </Pressable>
      <View style={[styles.signupButton3, styles.signupShadowBox]}>
        <View style={styles.signupButtonChild} />
        <View style={styles.signupButtonItem} />
        <Text style={[styles.repeatPass, styles.passPosition]}>
          Repeat the password
        </Text>
      </View>
      <Pressable style={styles.vector} onPress={() => navigator.navigate("StartMenu")}>
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  logoIconLayout: {
    width: 205,
    left: 113,
  },
  welcomeToTypo: {
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    position: "absolute",
  },
  signupShadowBox: {
    height: 48,
    width: 223,
    backgroundColor: Color.colorGray,
    left: 104,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  passPosition: {
    height: 30,
    color: Color.colorDarkslategray_100,
    left: 6,
    top: 9,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  signupmenuShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  logoIcon: {
    top: 216,
    height: 250,
    position: "absolute",
  },
  welcomeTo: {
    top: 144,
    color: "#354962",
    left: 104,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
  },
  autonetics: {
    top: 466,
    color: "#223145",
    height: 64,
    width: 205,
    left: 113,
  },
  signupButtonChild: {
    top: 0,
    left: -2,
    backgroundColor: Color.colorGainsboro,
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    width: 229,
    height: 52,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  signupButtonItem: {
    top: 1,
    left: -1,
    borderRadius: Border.br_4xs,
    backgroundColor: Color.colorWhite,
    width: 227,
    height: 50,
    position: "absolute",
  },
  phoneNumber: {
    width: 141,
  },
  signupButton: {
    top: 579,
    borderRadius: Border.br_3xs,
  },
  enterPass: {
    width: 140,
  },
  signupButton1: {
    top: 639,
  },
  register: {
    top: 4,
    left: 19,
    color: Color.colorWhite,
    textAlign: "center",
    width: 76,
    height: 26,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  signupButton2: {
    marginLeft: -57,
    top: 759,
    left: "50%",
    backgroundColor: "#2469a2",
    width: 114,
    height: 45,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  repeatPass: {
    width: 190,
  },
  signupButton3: {
    top: 699,
  },
  icon: {
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  vector: {
    left: "6.98%",
    top: "4.83%",
    right: "85.81%",
    bottom: "93.03%",
    width: "7.21%",
    height: "2.15%",
    position: "absolute",
  },
  signupmenu: {
    backgroundColor: "#e0fafd",
    flex: 1,
    height: 932,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
});

export default SignUpMenu;
