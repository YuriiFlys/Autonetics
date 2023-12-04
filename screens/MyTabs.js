// MyTabs.js
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainMenu from './MainMenu';
import Scanner from './Scanner';
import Map from './Map';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
          tabBarStyle: { backgroundColor: '#fff', top:screenHeight*0.15, height: screenHeight*0.07, width: screenWidth},
        }}
      >
        <Tab.Screen name="Скан QR-коду" component={Scanner} />
        <Tab.Screen name="Головне меню" component={MainMenu} />
        <Tab.Screen name="Карта" component={Map} />
      </Tab.Navigator>
    </View>
  );
}
