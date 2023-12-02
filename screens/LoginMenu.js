import * as React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const LoginMenu = () => {
    const navigator = useNavigation();
  return (
    <View style={[styles.loginmenu, styles.iconLayout]}>
      <Pressable
        style={[styles.submit, styles.submitLayout]}
        onPress={() => navigator.navigate("MainMenu")}
      >
        <Image
          style={[styles.submitChild, styles.submitLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4.png")}
        />
        <Text style={[styles.submit1, styles.textTypo]}>Submit</Text>
      </Pressable>
      <View style={[styles.password, styles.emailLayout]}>
        <View style={styles.field} />
        <Text style={[styles.text, styles.textTypo]}>Пароль</Text>
      </View>
      <View style={[styles.email, styles.emailLayout]}>
        <View style={styles.field} />
        <Text style={[styles.text, styles.textTypo]}>Email</Text>
      </View>
      <Text style={[styles.logIn, styles.textTypo]}>Log in</Text>
      <Image
        style={styles.logoIcon}
        contentFit="cover"
        source={require("../assets/logo1.png")}
      />
      <Text style={[styles.forgotPassword, styles.textTypo]}>
        Forgot password?
      </Text>
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
  submitLayout: {
    height: 46,
    width: 178,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  emailLayout: {
    height: 61,
    left: 66,
    width: 297,
    position: "absolute",
  },
  submitChild: {
    top: 0,
    left: 0,
  },
  submit1: {
    top: 5,
    left: 56,
    color: "#fff",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  submit: {
    top: 650,
    left: 126,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  field: {
    top: 40,
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    height: 21,
    width: 297,
    left: 0,
    position: "absolute",
    backgroundColor: Color.colorLightcyan,
  },
  text: {
    top: 4,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
    left: 0,
  },
  password: {
    top: 489,
  },
  email: {
    top: 428,
  },
  logIn: {
    top: 97,
    left: 160,
    fontSize: 40,
    color: "#223145",
  },
  logoIcon: {
    top: 189,
    left: 129,
    width: 172,
    height: 220,
    position: "absolute",
  },
  forgotPassword: {
    top: 712,
    left: 159,
    fontSize: 14,
    color: "#25364c",
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
  loginmenu: {
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
    backgroundColor: Color.colorLightcyan,
    width: "100%",
  },
});
export default LoginMenu;

