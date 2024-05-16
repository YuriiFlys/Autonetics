import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";
import { register } from "../api/user_api";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const WelcomeScreen = ({route}) => {
  const { user } = route.params;
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSelected, setSelection] = React.useState(false);
  const repeatPasswordRef = React.useRef();
  const navigator = useNavigation();

  React.useEffect(() => {
    console.log(user);
    console.log(Date.now())
  }, []);
  
  const handleFinalRegister = async () => {
    if (password !== repeatPassword) {
      setErrorMessage("Паролі не співпадають");
      return;
    }
    
    const email = user.email;
    const phoneNumber = user.phoneNumber;
    const newClient = {
      firstName: "Не",
      lastName: "Вказано",
      birthDate: "1955-01-01",
      gender: "Чоловіча",
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    }
    console.log(newClient);
    register({firstName:"Не",lastName: "Вказано",birthDate: "1955-01-01",gender: "Чоловіча",phoneNumber: phoneNumber,email: email,password: password}).then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        AsyncStorage.setItem("token", response.data.token);
        navigator.navigate("BottomMenu");
      }else{
        setErrorMessage("Помилка реєстрації");
      }
    });
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
      <TouchableOpacity
        style={styles.submit}
        onPress={() => handleFinalRegister()}
        disabled={!isSelected}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
