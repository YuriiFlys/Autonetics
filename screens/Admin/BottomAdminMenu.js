import Profile from "../Profile";
import {Image} from "expo-image";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AdminMenu from "./AdminMenu2";
import Storage from "./Storage";
import ShopAccount from "./ShopAccount";
import UserAccount from "./UserAccount";
import Employees from "./Employees";
import UserProfile from "../UserProfile";


const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

function ProfileAdminScreen({ user }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" options={{ headerShown: false }}>
        {(props) => <UserAccount {...props} user={user} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="UserProfile"
        options={{ headerShown: false }

        }
      >
         {(props) => <UserProfile {...props} user={user} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}
function ProfileShopScreen({ user }) {
    return (
        <ProfileStack.Navigator>
        <ProfileStack.Screen name="ShopHome" options={{ headerShown: false }}>
          {(props) => <ShopAccount {...props} user={user} />}
        </ProfileStack.Screen>
        <ProfileStack.Screen
          name="Employees"
          options={{
            headerShown: false,
            
          }}
        >
          {(props) => <Employees {...props} user={user} />}
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
          }else if (route.name === "Storage") {
            iconName = require("../../assets/Admin/Storage.svg");
          }  
          else if (route.name === "Shop") {
            iconName = require("../../assets/Admin/Shop.svg");
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
        <Tab.Screen name="Shop"
        options={{ headerShown: false }}
        >
         {(props) => <ProfileShopScreen {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Profile"
        options={{ headerShown: false }}
        >
         {(props) => <ProfileAdminScreen {...props} user={user} />}
        </Tab.Screen>
        </Tab.Navigator>
    );
}
