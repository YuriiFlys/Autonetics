import Profile from "../Profile";
import {Image} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AdminMenu from "./AdminMenu2";
import Storage from "./Storage";
import ShopAccount from "./ShopAccount";
import UserAccount from "./UserAccount";



const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();


function ProfileAdminScreen({ user }) {
    return (
        <ProfileStack.Navigator>
        <ProfileStack.Screen name="ProfileHome" options={{ headerShown: false }}>
          {(props) => <Profile {...props} user={user} />}
        </ProfileStack.Screen>
        <ProfileStack.Screen
          name="UserAccount"
          options={{
            headerShown: true,
            headerBackTitle: "Назад",
            title: "Особистий кабінет",
          }}
        >
          {(props) => <UserProfile {...props} user={user} />}
        </ProfileStack.Screen>
                
      </ProfileStack.Navigator> 
    );
}



export default function BottomAdminMenu({ route }) {
    const user = route.params?.user;
    return (
        <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName= require("../../assets/home.svg");
          }  else if (route.name === "Shop Profile") {
            iconName = require("../../assets/Admin/shop.svg");
          } else if (route.name === "Profile") {
            iconName = require("../../assets/user.png");
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
        <Tab.Screen name="Home"
        options={{ headerShown: false }}
       >
         {(props) => <AdminMenu {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name ="Storage"
        options={{ headerShown: false }}
        >
         {(props) => <Storage {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Shop Profile"
        options={{ headerShown: false }}
        >
         {(props) => <ShopAccount {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Profile"
        options={{ headerShown: false }}
        >
         {(props) => <UserAccount {...props} user={user} />}
        </Tab.Screen>
        </Tab.Navigator>
    );
}