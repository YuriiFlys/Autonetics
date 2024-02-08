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
import ListPromotions from "./ListPromotions";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const PromotionsStack = createStackNavigator();

function ProfileStackScreen({ user }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" options={{ headerShown: false }}>
        {(props) => <Profile {...props} user={user} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="UserProfile"
        options={{
          headerShown: true,
          headerBackTitle: "Назад",
          title: "Особистий кабінет",
        }}
      >
        {(props) => <UserProfile {...props} user={user} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="Settings"
        options={{
          headerShown: true,
          headerBackTitle: "Назад",
          title: "Налаштування",
        }}
      >
        {(props) => <Settings {...props} user={user} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}
function PromotionsStackScreen() {
  return (
    <PromotionsStack.Navigator>
      <PromotionsStack.Screen
        name="PromotionsHome"
        component={Promotions}
        options={{ headerShown: false }}
      />
      <PromotionsStack.Screen
        name="Акції"
        component={ListPromotions}
        options={{ headerShown: true, headerBackTitle: "Назад" }}
      />
    </PromotionsStack.Navigator>
  );
}

export default function BottomMenu({ route }) {
  const user = route.params?.user;
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
              style={{ width: size, height: size, objectFit: "contain" }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <MyTabs {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Promotions" options={{ headerShown: false }}>
        {(props) => <PromotionsStackScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Basket}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <ProfileStackScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
