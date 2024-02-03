import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StartMenu from "./screens/StartMenu";
import LoginMenu from "./screens/LoginMenu";
import SignupMenu from "./screens/SignupMenu";
import MyTabs from "./screens/MyTabs";
import BottomMenu from "./screens/BottomMenu";
import ForgotPass from "./screens/ForgotPass";
import WelcomeScreen from "./screens/WelcomeScreen";
import SalesScreen from "./screens/SalesScreen";
import Settings from "./screens/Settings";
import ProductInfo from "./screens/ProductInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App = () => {
  const [hideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              animation: "none",
            }}
          >
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
            <Stack.Screen
              name="ForgotPass"
              component={ForgotPass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SalesScreen"
              component={SalesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductInfo"
              component={ProductInfo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
