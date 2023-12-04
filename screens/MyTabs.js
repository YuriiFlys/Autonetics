// MyTabs.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainMenu from './MainMenu';
import Scanner from './Scanner';
import Map from './Map';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // встановіть колір фону тут
  },
});

export default function MyTabs() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: '#000000',
          tabBarActiveTintColor: '#23333A',
          tabBarIndicatorStyle: { backgroundColor: '#000000' },
          tabBarStyle: { backgroundColor: '#fff', top:'19%' },
        }}
      >
        <Tab.Screen name="Скан QR-коду" component={Scanner} />
        <Tab.Screen name="Головне меню" component={MainMenu} />
        <Tab.Screen name="Карта" component={Map} />
      </Tab.Navigator>
    </View>
  );
}
