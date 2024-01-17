import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./MyTabs";
import Promotions from "./Promotions";
import Basket from "./Basket";
import Profile from "./Profile";
import UserProfile from "./UserProfile";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("Головне меню");
  }, []);

  return <MyTabs />;
}
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileHome"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

export default function BottomMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = require("../assets/home.png");
          } else if (route.name === "Promotions") {
            iconName = require("../assets/interest.png");
          } else if (route.name === "Cart") {
            iconName = require("../assets/shoppingbasket.png");
          } else if (route.name === "Profile") {
            iconName = require("../assets/user.png");
          }

          return (
            <Image
              source={iconName}
              style={{ width: size, height: size, resizeMode: "contain" }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Promotions"
        component={Promotions}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={Basket}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
