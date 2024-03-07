import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StartMenu from "./screens/StartMenu";
import LoginMenu from "./screens/LoginMenu";
import SignupMenu from "./screens/SignupMenu";
import BottomMenu from "./screens/BottomMenu";
import ForgotPass from "./screens/ForgotPass";
import WelcomeScreen from "./screens/WelcomeScreen";
import SalesScreen from "./screens/SalesScreen";
import ProductInfo from "./screens/ProductInfo";
import HistoryScreen from "./screens/HistoryScreen";
import Employees from "./screens/Admin/Employees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import SearchBarcode from "./screens/Admin/SearchByBarcode";
import BottomAdminMenu from "./screens/Admin/BottomAdminMenu";
import { LogBox } from "react-native";
import ManageEmployee from "./screens/Admin/ManageEmployee";

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
            />
            <Stack.Screen
              name="Login"
              component={() => (
                <LoginMenu isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
              )}
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
            <Stack.Screen
              name="ProductInfo"
              component={() => <ProductInfo isAdmin={isAdmin} />}
              options={{ headerShown: true, title: "Інформація про товар" }}
            />
            {isAdmin ? (
              <>
                  <Stack.Screen
                  name="BottomAdminMenu"
                  component={BottomAdminMenu}
                  options={{ headerShown: false }}
                />
                
                <Stack.Screen
                  name="SearchBarcode"
                  component={SearchBarcode}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Employees"
                component={Employees}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="ManageEmployee"
                component={ManageEmployee}
                options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
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
