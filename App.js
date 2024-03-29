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

const AdminContext = React.createContext();

const LoginMenuWrapper = ({ navigation }) => {
  const { isAdmin, setIsAdmin } = React.useContext(AdminContext);
  return <LoginMenu isAdmin={isAdmin} setIsAdmin={setIsAdmin} />;
};
const ProductInfoWrapper = ({ navigation }) => {
  const { isAdmin } = React.useContext(AdminContext);
  return <ProductInfo isAdmin={isAdmin} />;
};

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
const App = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [hideSplashScreen] = React.useState(true);
  return (
    <>
      <NavigationContainer>
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          {hideSplashScreen ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: "none",
              }}
            >
              <Stack.Screen name="StartMenu" component={StartMenu} />
              <Stack.Screen
                name="Login"
                component={LoginMenuWrapper}
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
              <Stack.Screen
                name="ProductInfo"
                component={ProductInfoWrapper}
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
                    name="SalesScreen"
                    component={SalesScreen}
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
        </AdminContext.Provider>
      </NavigationContainer>
    </>
  );
};
export default App;
