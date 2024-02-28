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
import ProductInfo from "./screens/ProductInfo";
import HistoryScreen from "./screens/HistoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminMenu from "./screens/Admin/AdminMenu";
// import BottomMenuAdmin from "./screens/Admin/BottomMenuAdmin";
import Storage from "./screens/Admin/Storage";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App = () => {
  const [hideSplashScreen] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
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
              component={() => (
                <LoginMenu isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupMenu}
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
            {isAdmin ? (
              <>
                <Stack.Screen
                  name="AdminMenu"
                  component={AdminMenu}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                {/* <Stack.Screen
                  name="MyTabs"
                  component={MyTabs}
                  options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                  name="BottomMenu"
                  component={BottomMenu}
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
                  options={{ headerShown: true, title: "Інформація про товар" }}
                />
                <Stack.Screen
                  name="HistoryScreen"
                  component={HistoryScreen}
                  options={{
                    headerShown: true,
                    headerBackTitle: "Назад",
                    title: "Історія",
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
