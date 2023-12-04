import * as React from "react";
import * as Device from 'expo-device';
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';

import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { TextInput, KeyboardAvoidingView, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  return (
    <KeyboardAvoidingView style={styles.loginmenu} behavior="position"
    keyboardVerticalOffset={-screenHeight*0.2}
     enabled>
      <Text style={styles.logIn}>Log in</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
      />
      <View style={styles.email}>
        <Text style={styles.emailtext}>Email</Text>
        <TextInput style={styles.field}
         onSubmitEditing={() => passwordRef.current.focus()}
         blurOnSubmit={false}
         />
      </View>
      <View style={styles.password}>
        <Text style={styles.passwordtext}>Пароль</Text>
        <TextInput style={styles.field} secureTextEntry 
        ref={passwordRef}
        />
      </View>
      <Pressable
        style={styles.submit}
        onPress={() => navigator.navigate('BottomMenu', { screen: 'Home' })}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      <Pressable style={styles.vector} onPress={() => navigator.navigate("StartMenu")}>
        <Image
          style={styles.vector}
          contentFit="contain"
          source={require("../assets/vector.png")}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logIn: {
    marginTop: screenHeight*0.1,
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#23334A",
  },
  logoIcon: {
    alignSelf: 'center',
    height: screenHeight*0.25,
    width: screenWidth*0.5,
  },
  field: {
    marginTop: screenHeight*0.01,
    alignSelf: 'center',
    borderRadius: Border.br_8xs,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: screenHeight < 600 ? screenHeight*0.04 : screenHeight*0.03,
    width: screenWidth*0.8,
    backgroundColor: Color.colorLightcyan,
    fontFamily: FontFamily.palanquinDarkRegular,
    paddingLeft: screenWidth*0.02,
    paddingRight: screenWidth*0.02,
  },
  emailtext: {
    marginLeft: screenWidth*0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  passwordtext: {
    marginLeft: screenWidth*0.1,
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  password: {
    marginTop: screenHeight*0.01,
  },
  email: {
    marginTop: screenHeight*0.01,
  },
  submit: {
    marginTop: screenHeight*0.05,
    alignSelf: 'center',
    height: screenHeight < 600 ? screenHeight*0.06 : screenHeight*0.05,
    width: screenHeight < 600 ? screenWidth*0.5 : screenWidth*0.5,
    backgroundColor: "#2469A2",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  submitText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.colorLightcyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  forgotPassword: {
    marginTop: screenHeight*0.01,
    alignSelf: 'center',
    fontSize: 14,
    color: "#25364c",
  },
  vector: {
    marginTop: screenHeight*0.01,
    alignSelf: 'center',
    height: screenHeight*0.05,
    width: screenHeight*0.05,
    position: 'absolute',
    top: screenHeight*0.02,
    left: screenWidth*0.02,
  },
  loginmenu: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default LoginMenu;
