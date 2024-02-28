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
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpMenu = () => {
  const navigator = useNavigation();
  const phoneRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleNumberChange = (text) => {
    if (text.startsWith("+380") && text.length <= 13) {
      setPhoneNumber(text);
    }
  };
  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Неправильний формат електронної пошти");
      return;
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Неправильний формат номера телефону");
      return;
    }

    const user = {
      Email: email,
      PhoneNumber: phoneNumber,
    };

    navigator.navigate("Welcome", { user: user });
  };

  return (
    <KeyboardAvoidingView
      style={styles.signupmenu}
      behavior="position"
      keyboardVerticalOffset={-screenHeight * 0.25}
      enabled
    >
      <Text style={styles.signUp}>Sign Up</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logoAutonetics.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View>
            <View style={styles.email}>
              <Text style={styles.emailtext}>Email</Text>
              <TextInput
                style={styles.field}
                onChangeText={setEmail}
                onSubmitEditing={() => phoneRef.current.focus()}
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="example@domain.com"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.phone}>
              <Text style={styles.phonetext}>Номер телефону</Text>
              <TextInput
                ref={phoneRef}
                style={styles.field}
                onChangeText={handleNumberChange}
                onFocus={() => {
                  if (!phoneNumber.startsWith("+380")) {
                    setPhoneNumber("+380");
                  }
                }}
                value={phoneNumber}
                blurOnSubmit={false}
                keyboardType="phone-pad"
                placeholder="+380123456789"
                autoCapitalize="none"
              />
            </View>
          </View>
          {errorMessage ? (
            <Text style={styles.errormessage}>{errorMessage}</Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <Pressable style={styles.register} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </Pressable>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signUp: {
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
  },
  emailtext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },
  phone: {
    marginTop: screenHeight * 0.01,
  },
  phonetext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },
  enterPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: "left",
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
  email: {
    marginTop: screenHeight * 0.01,
  },
  errormessage: {
    color: Color.colorErrorRed,
    fontFamily: FontFamily.CommissioneRegular,
    marginTop: screenHeight * 0.01,
    textAlign: "center",
  },
  register: {
    marginTop: screenHeight * 0.03,
    alignSelf: "center",
    height: screenHeight < 600 ? screenHeight * 0.06 : screenHeight * 0.05,
    width: screenWidth * 0.5,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
  },
  registerText: {
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  repeatPasstext: {
    marginLeft: screenWidth * 0.1,
    textAlign: "left",
    color: Color.colorDarkBlue,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
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
  signupmenu: {
    flex: 1,
    backgroundColor: Color.colorLightCyan,
    justifyContent: "flex-start",
  },
});

export default SignUpMenu;
