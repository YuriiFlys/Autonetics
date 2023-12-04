const Stack = createNativeStackNavigator();
import * as React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  {NavigationContainer}  from "@react-navigation/native";
import { useFonts } from "expo-font";
import StartMenu from "./screens/StartMenu";
import LoginMenu from "./screens/LoginMenu";
import SignupMenu from "./screens/SignupMenu";
import MyTabs from "./screens/MyTabs";
import BottomMenu from "./screens/BottomMenu";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity, LogBox } from "react-native";

LogBox.ignoreAllLogs();
const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "PalanquinDark-Regular": require("./assets/fonts/PalanquinDark-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="StartMenu"
              component={StartMenu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginMenu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupMenu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyTabs"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomMenu"
              component={BottomMenu}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
