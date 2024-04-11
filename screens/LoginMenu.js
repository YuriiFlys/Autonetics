import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginMenu = ({ isAdmin, setIsAdmin }) => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = async () => {
    try {
      let response;
      if (isAdmin) {
        response = await fetch(`http://23.100.50.204:8080/staff/byEmail/${email}`);
      } else {
        response = await fetch(`http://23.100.50.204:8080/client/byEmail/${email}`);
      }
      const data = await response.json();
      const userID= await AsyncStorage.getItem(email);
      if (data.password === password) {
        if (isAdmin) {
          navigator.navigate("BottomAdminMenu", { user: {...data,userID} , screen: "Home" });
        } else {
          navigator.navigate("BottomMenu", { user: {...data,userID} , screen: "Home" });
        }
      } else {
        setErrorMessage("Неправильний email або пароль");
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "";
      switch (error.code) {
        default:
          errorMessage = "Сталася помилка під час входу в систему";
      }
      setErrorMessage(errorMessage);
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.loginmenu}
      behavior="position"
      keyboardVerticalOffset={-screenHeight * 0.2}
      enabled
    >
      <Text style={styles.logIn}>Log in</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logoAutonetics.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.email}>
            <Text style={styles.emailtext}>Email</Text>
            <TextInput
              style={styles.field}
              autoCapitalize="none"
              onChangeText={setEmail}
              keyboardType="email-address"
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.password}>
            <Text style={styles.passwordtext}>Пароль</Text>
            <TextInput
              style={styles.field}
              secureTextEntry
              ref={passwordRef}
              onChangeText={setPassword}
            />
            {errorMessage ? (
              <Text style={styles.errormessage}>{errorMessage}</Text>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <CheckBox
        containerStyle={styles.adminCheckBox}
        title={'Адмін'}
        checked={isAdmin}
        //when the checkbox is clicked, the value of isAdmin is changed and console.log checks if the value of isAdmin is changed
        onPress={() => {
          setIsAdmin(!isAdmin);
          console.log(isAdmin);
        }}
        
      />
      <Pressable style={styles.submit} onPress={handleLogin}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Text
        style={styles.forgotPassword}
        onPress={() => navigator.navigate("ForgotPass")}
      >
        Forgot password?
      </Text>
      <Pressable
        style={styles.vector}
        onPress={() => navigator.navigate("StartMenu")}
      >
        <Image
          style={styles.vector}
          contentFit="contain"
          source={require("../assets/Vector.svg")}
        />
      </Pressable>
      {/*Admin button*/}
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logIn: {
    marginTop: screenHeight * 0.1,
    textAlign: "center",
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_21xl,
    color: Color.colorDarkBlue,
  },
  logoIcon: {
    alignSelf: "center",
    marginTop: screenHeight * 0.02,
    height: screenHeight * 0.3,
    width: screenWidth * 0.6,
  },
  field: {
    marginTop: screenHeight * 0.01,
    alignSelf: "center",
    borderColor: Color.colorDarkslategray_100,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    height: screenHeight < 600 ? screenHeight * 0.04 : screenHeight * 0.03,
    width: screenWidth * 0.8,
    backgroundColor: Color.colorLightCyan,
    fontFamily: FontFamily.CommissioneBold,
    paddingLeft: screenWidth * 0.02,
    paddingRight: screenWidth * 0.02,
    color: Color.colorDarkBlue,
  },
  emailtext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkBlue,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },
  passwordtext: {
    marginLeft: screenWidth * 0.1,
    textAlign: "left",
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },
  password: {
    marginTop: screenHeight * 0.01,
  },
  email: {
    marginTop: screenHeight * 0.01,
  },
  errormessage: {
    color: Color.colorErrorRed,
    fontFamily: FontFamily.CommissioneRegular,
    marginTop: screenHeight * 0.01,
    textAlign: "center",
  },
  submit: {
    marginTop: screenHeight * 0.02,
    alignSelf: "center",
    height: screenHeight < 600 ? screenHeight * 0.06 : screenHeight * 0.05,
    width: screenWidth * 0.5,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  submitText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: Color.colorLightCyan,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  forgotPassword: {
    marginTop: screenHeight * 0.01,
    alignSelf: "center",
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: 14,
    color: Color.colorDarkBlue,
  },
  vector: {
    marginTop: screenHeight * 0.01,
    alignSelf: "center",
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    position: "absolute",
    top: screenHeight * 0.02,
    left: screenWidth * 0.02,
    color: Color.colorDarkBlue,
  },
  loginmenu: {
    flex: 1,
    backgroundColor: Color.colorLightCyan,
    justifyContent: "flex-start",
  },
  adminCheckBox: {
  backgroundColor: Color.colorLightCyan,
  marginLeft: screenWidth * 0.05,
  borderWidth: 0,
  alignSelf:"center"
  }
});

export default LoginMenu;
