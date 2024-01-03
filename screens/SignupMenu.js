import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
import { StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const SignUpMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  const repeatpasswordRef= React.useRef();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const auth = FIREBASE_AUTH;
  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setErrorMessage('Паролі не співпадають');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigator.navigate("Welcome");
    } catch (error) {
      console.error(error);
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Неправильний формат електронної пошти';
          break;
        case 'auth/weak-password':
          errorMessage = 'Пароль повинен містити принаймні 6 символів';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Електронна пошта вже використовується';
          break;
        default:
          errorMessage = 'Сталася помилка під час реєстрації';
      }
      setErrorMessage(errorMessage);
    }
  };
  

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
    <View>
      <View style={styles.phoneNumber}>
        <Text style={styles.phoneNumbertext}>Email</Text>
        <TextInput 
          style={styles.field}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current.focus()}
          blurOnSubmit={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        </View>
        <View style={styles.enterPass}>
        <Text style={styles.enterPasstext}>Пароль</Text>
        <TextInput 
          style={styles.field} 
          secureTextEntry 
          ref={passwordRef}
          onChangeText={setPassword}
          textContentType='oneTimeCode'
          onSubmitEditing={() => repeatpasswordRef.current.focus()}
        />
        </View>
        <View style={styles.repeatPass}>
        <Text style={styles.repeatPasstext}>Підтвердіть пароль</Text>
        <TextInput 
          style={styles.field} 
          secureTextEntry 
          ref={repeatpasswordRef}
          onChangeText={setRepeatPassword}
          textContentType='oneTimeCode'
        />
        {errorMessage ? <Text style={styles.errormessage}>{errorMessage}</Text> : null}
        </View>
      </View>
      </View>
      </TouchableWithoutFeedback>
      <Pressable
        style={styles.register}
        onPress={handleRegister}
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
    marginBottom: screenHeight * 0.05,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
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
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: screenHeight < 600 ? screenHeight*0.04 : screenHeight*0.03,
    width: screenWidth*0.8,
    backgroundColor: Color.colorLightcyan,
    fontFamily: FontFamily.CommissioneBold,
    paddingLeft: screenWidth*0.02,
    paddingRight: screenWidth*0.02,
  },
  phoneNumbertext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },
  enterPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
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
  errormessage:{
    color: 'red',
    fontFamily: FontFamily.CommissioneRegular,
    marginTop: screenHeight*0.01,
    textAlign: 'center',
  },
  register: {
    marginTop: screenHeight * 0.03,
    alignSelf: 'center',
    height: screenHeight < 600 ? screenHeight*0.06 : screenHeight*0.05,
    width: screenWidth*0.5,
    backgroundColor: "#2469A2",
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  repeatPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: 'left',
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
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
    backgroundColor: Color.colorLightCyan,
    justifyContent: 'flex-start',
  },
});

export default SignUpMenu;