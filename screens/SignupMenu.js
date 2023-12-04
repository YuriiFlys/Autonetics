import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
import { StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, Dimensions } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignUpMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  return (
    <KeyboardAvoidingView style={styles.signupmenu} behavior="position"
    keyboardVerticalOffset={-screenHeight*0.15}
     enabled>
      <Text style={styles.signUp}>Sign Up</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
      />
      <View style={styles.phoneNumber}>
        <Text style={styles.phoneNumbertext}>Номер телефону</Text>
        <TextInput style={styles.field}
         onSubmitEditing={() => passwordRef.current.focus()}
         blurOnSubmit={false}
         />
      </View>
      <View style={styles.enterPass}>
        <Text style={styles.enterPasstext}>Введіть пароль</Text>
        <TextInput style={styles.field} secureTextEntry 
        ref={passwordRef}
        />
      </View>
      <View style={styles.repeatPass}>
        <Text style={styles.repeatPasstext}>Повторіть пароль</Text>
        <TextInput style={styles.field} secureTextEntry 
        ref={passwordRef}
        />
      </View>
      <Pressable
        style={styles.register}
        onPress={() => navigator.navigate('BottomMenu', { screen: 'Home' })}
      >
        <Text style={styles.registerText}>Register</Text>
      </Pressable>
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
  signUp: {
    marginTop: screenHeight * 0.1,
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#23334A",
  },
  autonetics: {
    textAlign: "center",
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_21xl,
    color: "#23334A",
  },
  logoIcon: {
    alignSelf: 'center',
    height: screenHeight * 0.25,
    width: screenWidth * 0.5,
  },
  field: {
    marginTop: screenHeight * 0.01,
    alignSelf: 'center',
    borderRadius: Border.br_8xs,
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: screenHeight * 0.03,
    width: screenWidth*0.8,
    backgroundColor: Color.colorLightcyan,
    fontFamily: FontFamily.palanquinDarkRegular,
    paddingLeft: screenWidth*0.02,
    paddingRight: screenWidth*0.02,
  },
  phoneNumbertext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  enterPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  enterPass: {
    marginTop: screenHeight * 0.01,
  },
  repeatPass: {
    marginTop: screenHeight * 0.01,
  },
  phoneNumber: {
    marginTop: screenHeight * 0.01,
  },
  register: {
    marginTop: screenHeight * 0.05,
    alignSelf: 'center',
    height: screenHeight*0.05,
    width: screenWidth*0.5,
    backgroundColor: "#2469A2",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  registerText: {
    textAlign: 'center',
    color: Color.colorLightcyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  repeatPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  vector: {
    marginTop: screenHeight * 0.01,
    alignSelf: 'center',
    height: screenHeight*0.05,
    width: screenHeight*0.05,
    position: 'absolute',
    top: screenHeight*0.02,
    left: screenWidth*0.02,
  },
  signupmenu: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default SignUpMenu;
