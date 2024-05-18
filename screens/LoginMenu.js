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
  TouchableOpacity,
} from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { useUser } from "./UserContext";
import { login } from "../api/user_api";
import { jwtDecode } from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginMenu = () => {
  const navigator = useNavigation();
  const passwordRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const { updateUser } = useUser();

  const handleLogin = async () => {
    login({ email: email, password: password }).then((response) => {
      if (response.status == 200) {
        const token = response.data.token;
        const decoded_jwt = jwtDecode(token);
        const role = decoded_jwt.role[0].authority;
        AsyncStorage.setItem("token", token);
        if (role === "ROLE_STAFF") {
          navigator.navigate("BottomAdminMenu");
        }
        if (role === "ROLE_CLIENT") {
        navigator.navigate("BottomMenu");
        }
      }
    });
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
      <TouchableOpacity style={styles.submit} onPress={handleLogin}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
});

export default LoginMenu;
