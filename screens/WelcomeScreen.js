import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
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
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const WelcomeScreen = () => {
  const route = useRoute();
  const user = route.params?.user;
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSelected, setSelection] = React.useState(false);
  const repeatPasswordRef = React.useRef();
  const navigator = useNavigation();
  const handleFinalRegister = async () => {
    if (password !== repeatPassword) {
      setErrorMessage("Паролі не співпадають");
      return;
    }
    const email = user.Email;
    const phoneNumber = user.PhoneNumber;
    try {
      const response = await fetch(`http://23.100.50.204:8080/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          PhoneNumber: phoneNumber,
          Password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      const data = await response.json();
      const clientId = data.clientId;
      await AsyncStorage.setItem(email, clientId);
      const response2 = await fetch(
        `http://23.100.50.204:8080/client/${clientId}`
      );
      const user = await response2.json();
      navigator.navigate("BottomMenu", { user: user, screen: "Home" });
    } catch (error) {
      console.error(error);
      setErrorMessage("Сталася помилка під час реєстрації");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={[
        {
          flex: 1,
          justifyContent: "flex-start",
          backgroundColor: Color.colorLightCyan,
        },
      ]}
      keyboardVerticalOffset={-screenHeight * 0.2}
      enabled
    >
      <Text style={styles.welcome}>Welcome!</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logoAutonetics.png")}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.password}>
            <Text style={styles.passwordtext}>Пароль</Text>
            <TextInput
              style={styles.field}
              placeholder="Password"
              onSubmitEditing={() => repeatPasswordRef.current.focus()}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.password}>
            <Text style={styles.passwordtext}>Повторіть пароль</Text>
            <TextInput
              style={styles.field}
              placeholder="Password"
              onChangeText={setRepeatPassword}
              ref={repeatPasswordRef}
              secureTextEntry
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errormessage}>{errorMessage}</Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <CheckBox
        title="Я погоджуюсь з правилами конфіденційності"
        containerStyle={{
          backgroundColor: Color.colorLightCyan,
          borderWidth: 0,
          marginLeft: screenWidth * 0.07,
        }}
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
      />
      <Pressable
        style={styles.submit}
        onPress={handleFinalRegister}
        disabled={!isSelected}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Pressable
        style={styles.vector}
        onPress={() => navigator.navigate("Signup")}
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
  welcome: {
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
  errormessage: {
    color: Color.colorErrorRed,
    fontFamily: FontFamily.CommissioneRegular,
    marginTop: screenHeight * 0.01,
    textAlign: "center",
  },

  passwordtext: {
    marginLeft: screenWidth * 0.1,
    color: Color.colorDarkslategray_200,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
  },

  password: {
    marginTop: screenHeight * 0.01,
  },

  submit: {
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
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneRegular,
  },
  vector: {
    marginTop: screenHeight * 0.01,
    alignSelf: "center",
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    position: "absolute",
    top: screenHeight * 0.02,
    left: screenWidth * 0.02,
  },
});

export default WelcomeScreen;
