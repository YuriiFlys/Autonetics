import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
import { StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const SignUpMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  return (
    <KeyboardAvoidingView style={styles.signupmenu} behavior="position"
    keyboardVerticalOffset={-100}
     enabled>
      <Text style={styles.welcomeTo}>Sign Up</Text>
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
        onPress={() => navigator.navigate("MainMenu")}
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
  welcomeTo: {
    marginTop: '25%',
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
    height: '28%',
    width: '50%',
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
  phoneNumbertext: {
    marginLeft: '10%',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  enterPasstext: {
    marginLeft: '10%',
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  enterPass: {
    marginTop: '-26%',
  },
  repeatPass: {
    marginTop: '-30%',
  },
  phoneNumber: {
    marginTop: '2%',
  },
  register: {
    marginTop: '-20%',
    alignSelf: 'center',
    height: '5%',
    width: '50%',
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
    marginLeft: '10%',
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.palanquinDarkRegular,
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
  signupmenu: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default SignUpMenu;
