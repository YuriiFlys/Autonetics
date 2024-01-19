import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { TextInput, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;





const ForgotPass = () => {
  const navigator = useNavigation();
  const [email, setEmail] = React.useState('');

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      alert('Будь ласка, перевірте свою електронну пошту...');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.forgotPass} behavior="position"
    keyboardVerticalOffset={-screenHeight*0.2}
     enabled>
      <Text style={styles.recover}>Recover password</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
      <View style={styles.email}>
        <Text style={styles.emailtext}>Введіть Email для відновлення</Text>
        <TextInput 
          style={styles.field}
          onChangeText={setEmail}
        />
      </View>
        </TouchableWithoutFeedback>
      <Pressable
        style={styles.submit}
        onPress={handleForgotPassword}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Pressable style={styles.vector} onPress={() => navigator.navigate("Login")}>
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
  recover: {
    marginTop: screenHeight*0.1,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkBlue,
  },
  logoIcon: {
    alignSelf: 'center',
    marginTop: screenHeight*0.02,
    height: screenHeight*0.3,
    width: screenWidth*0.6,
  },
  field: {
    marginTop: screenHeight*0.01,
    alignSelf: 'center',
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: screenHeight < 600 ? screenHeight*0.04 : screenHeight*0.03,
    width: screenWidth*0.8,
    backgroundColor: Color.colorLightCyan,
    fontFamily: FontFamily.CommissioneBold,
    paddingLeft: screenWidth*0.02,
    paddingRight: screenWidth*0.02,
  },
  emailtext: {
    marginLeft: screenWidth*0.1,
    color: Color.colorDarkslategray_200,
    fontSize: 20,
    fontFamily: FontFamily.CommissioneBold,
  },
  
  email: {
    marginTop: screenHeight*0.01,
  },
  submit: {
    marginTop: screenHeight*0.02,
    alignSelf: 'center',
    height: screenHeight < 600 ? screenHeight*0.06 : screenHeight*0.05,
    width: screenWidth*0.5,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  submitText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.colorLightCyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  vector: {
    marginTop: screenHeight*0.01,
    alignSelf: 'center',
    height: screenHeight*0.05,
    width: screenHeight*0.05,
    position: 'absolute',
    top: screenHeight*0.02,
    left: screenWidth*0.02,
    color: Color.colorDarkBlue,
  },
  forgotPass: {
    flex: 1,
    backgroundColor: Color.colorLightCyan,
    justifyContent: 'flex-start',
  },
});

export default ForgotPass;
