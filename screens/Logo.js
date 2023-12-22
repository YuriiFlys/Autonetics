// Logo.js
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {Image} from 'expo-image'
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    logoIcon: {
      alignSelf: 'center',
      height: screenWidth * 0.13,
      width: screenWidth * 0.13,
      position: 'absolute',
      top: screenHeight * 0.09,
      left: screenWidth * 0.08,
    },
  });
  
  const Logo = () => {
    const navigator = useNavigation();
    return (
      <TouchableOpacity style={styles.logoIcon}
      onPress={() => navigator.navigate('Home', { screen: 'Головне меню' })}>
        <Image
          source={require('../assets/logo1.png')} 
          style={{ width: '100%', height: '100%', contentFit: 'contain' }}
        />
      </TouchableOpacity>

    );
  };
  
  export default Logo;