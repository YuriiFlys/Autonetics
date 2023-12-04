import * as React from "react";
import * as Device from 'expo-device';
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';

import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { TextInput, KeyboardAvoidingView } from "react-native";

const LoginMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  return (
    <KeyboardAvoidingView style={styles.loginmenu} behavior="position"
    keyboardVerticalOffset={-100}
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
        onPress={() => navigation.navigate('BottomMenu', { screen: 'Home' })}
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
    marginTop: '25%',
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#23334A",
  },
  logoIcon: {
    alignSelf: 'center',
    height: '28%',
    width: '50%',
    marginBottom: '10%',
  },
  field: {
    marginTop: '2%',
    alignSelf: 'center',
    borderRadius: Border.br_8xs,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: '17%',
    width: '80%',
    backgroundColor: Color.colorLightcyan,
    fontFamily: FontFamily.palanquinDarkRegular,
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  emailtext: {
    marginLeft: '10%',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  passwordtext: {
    marginLeft: '10%',
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  password: {
    marginTop: '-20%',
  },
  email: {
    marginTop: '2%',
  },
  submit: {
    marginTop: '-20%',
    alignSelf: 'center',
    height: '5%',
    width: '50%',
    backgroundColor: "#2469A2",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: Color.colorLightcyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  forgotPassword: {
    marginTop: '2%',
    alignSelf: 'center',
    fontSize: 14,
    color: "#25364c",
  },
  vector: {
    marginTop: '2%',
    alignSelf: 'center',
    height: '30%',
    width: '30%',
    position: 'absolute',
    top: '1%',
    left: '5%',
  },
  loginmenu: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default LoginMenu;
