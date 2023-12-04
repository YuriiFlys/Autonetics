import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabs from './MyTabs';
import Promotions from './Promotions';
import Basket from './Basket';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Головне меню');
  }, []);

  return <MyTabs />;
}

export default function BottomMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../assets/home.png')
              : require('../assets/home.png');
          } else if (route.name === 'Promotions') {
            iconName = focused
              ? require('../assets/interest.png')
              : require('../assets/interest.png');
          } else if (route.name === 'Basket') {
            iconName = focused
              ? require('../assets/shoppingbasket.png')
              : require('../assets/shoppingbasket.png');
          } else if (route.name === 'Profile') {
            iconName = focused
              ? require('../assets/user.png')
              : require('../assets/user.png');
          }
          
          
          return <Image source={iconName} style={{width: size, height: size}} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Promotions" component={Promotions} options={{ headerShown: false }} />
      <Tab.Screen name="Basket" component={Basket} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
