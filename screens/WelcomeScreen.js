import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from 'expo-image';
import { StyleSheet, Text, View, Pressable, useEffect } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { TextInput, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;





const WelcomeScreen = () => {
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const surnameRef = React.useRef();
    const auth = FIREBASE_AUTH;
    const firestore = FIREBASE_DB;
    const navigator = useNavigation();
    const handleUpdate = async () => {
      try {
        const user = auth.currentUser;
        await updateProfile(user, { displayName: `${name} ${surname}` });
        navigator.navigate('BottomMenu', { screen: 'Home' });
        console.log('Ім\'я та прізвище оновлено');
        const userDocRef = doc(firestore, 'users', user.email);
        const birthdate = {day: 1, month: 1, year: 1900};
        const gender = 'Не вказано';
        await setDoc(userDocRef, { fullname: `${name} ${surname}`, email: user.email, birthdate: birthdate, gender: gender });
      } catch (error) {
        console.error(error);
      }
    };
    
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <Text style={styles.logIn}>Welcome!</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
      <View style={styles.email}>
        <Text style={styles.emailtext}>Введіть ім'я</Text>
        <TextInput 
          style={styles.field}
          placeholder="Ім'я"
          onSubmitEditing={() => surnameRef.current.focus()}
          onChangeText={setName}
        />
      </View>
      <View style={styles.email}>
        <Text style={styles.emailtext}>Введіть прізвище</Text>
        <TextInput
            style={styles.field}
            placeholder="Прізвище"
            onChangeText={setSurname}
            ref={surnameRef}
            />
      </View>
      </View>
        </TouchableWithoutFeedback>
      <Pressable
        style={styles.submit}
        onPress={handleUpdate}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  logIn: {
    marginTop: screenHeight*0.1,
    marginBottom: screenHeight*0.05,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
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
  emailtext: {
    marginLeft: screenWidth*0.1,
    color: Color.colorDarkslategray_200,
    fontSize: 16,
    fontFamily: FontFamily.CommissioneBold,
  },
  
  email: {
    marginTop: screenHeight*0.01,
  },
  errormessage:{
    color: 'red',
    fontFamily: FontFamily.CommissioneRegular,
    marginTop: screenHeight*0.01,
    textAlign: 'center',
  },
  submit: {
    marginTop: screenHeight*0.02,
    alignSelf: 'center',
    height: screenHeight < 600 ? screenHeight*0.06 : screenHeight*0.05,
    width: screenWidth*0.5,
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
    color: "#fff",
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
  },
  forgotPass: {
    flex: 1,
    backgroundColor: Color.colorLightcyan,
    justifyContent: 'flex-start',
  },
});

export default WelcomeScreen;
