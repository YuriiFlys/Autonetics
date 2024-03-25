import Profile from "../Profile";
import { Image } from "expo-image";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AdminMenu from "./AdminMenu";
import Storage from "./Storage";
import ShopAccount from "./ShopAccount";
import UserAccount from "./UserAccount";
import Employees from "./Employees";
import UserProfile from "../UserProfile";
import SalescreenAdmin from "./SalescreenAdmin";
import Analysis from "./Analysis";
import AddProducts from "./AddProducts";
import PromotionsAdmin from "./PromotionsAdmin";
import SellHistory from "./SellHistory";
import Order from "./Order";
import ManageEmployee from "./ManageEmployee";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ProfileShopStack = createStackNavigator();
const HomeStack = createStackNavigator();

function ProfileAdminScreen({ user }) {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <ProfileStack.Screen name="ProfileHome" options={{ headerShown: false }}>
        {(props) => <UserAccount {...props} user={user} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="UserProfile" options={{ headerShown: false }}>
        {(props) => <UserProfile {...props} user={user} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="SellHistory" options={{ headerShown: false }}>
        {(props) => <SellHistory {...props} user={user} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}
function ProfileShopScreen({ user }) {
  return (
    <ProfileShopStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <ProfileShopStack.Screen name="ShopHome" options={{ headerShown: false }}>
        {(props) => <ShopAccount {...props} user={user} />}
      </ProfileShopStack.Screen>
      <ProfileShopStack.Screen
        name="Employees"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Employees {...props} user={user} />}
      </ProfileShopStack.Screen>
      <ProfileShopStack.Screen
        name="ManageEmployee"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <ManageEmployee {...props} user={user} />}
      </ProfileShopStack.Screen>
    </ProfileShopStack.Navigator>
  );
}

function HomeScreen({ user }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <HomeStack.Screen name="AdminHome" options={{ headerShown: false }}>
        {(props) => <AdminMenu {...props} user={user} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="SalescreenAdmin" options={{ headerShown: false }}>
        {(props) => <SalescreenAdmin {...props} user={user} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Analysis" options={{ headerShown: false }}>
        {(props) => <Analysis {...props} user={user} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="AddProducts" options={{ headerShown: false }}>
        {(props) => <AddProducts {...props} user={user} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="PromotionsAdmin" options={{ headerShown: false }}>
        {(props) => <PromotionsAdmin {...props} user={user} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Order" options={{ headerShown: false }}>
        {(props) => <Order {...props} user={user} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
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
            iconName = require("../../assets/home.svg");
          } else if (route.name === "Storage") {
            iconName = require("../../assets/Admin/Storage.svg");
          } else if (route.name === "Shop") {
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
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Storage" options={{ headerShown: false }}>
        {(props) => <Storage {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Shop" options={{ headerShown: false }}>
        {(props) => <ProfileShopScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <ProfileAdminScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
