import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import {Image} from 'expo-image'
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'transparent',
        position: 'relative',
      },
      labelText: {
        position: 'absolute',
        top: screenHeight*0.1,
        fontFamily: 'PalanquinDark-Regular',
        fontSize: 18,
        color: '#404040',
      },
      
      logoIcon: {
        alignSelf: 'center',
        height: screenWidth*0.1299,
        width: screenWidth*0.1299,
        position: 'absolute',
        top: screenHeight*0.0446,
        left: screenWidth*0.04,
      },
      topRectangle: {
        position: 'absolute',
        height: screenHeight*0.15,
        width: screenWidth,
        top: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
    
      },
  });
  
  const Logo = ({name}) => {
    const navigator = useNavigation();
    return (
    <View style={[styles.container]}>
        <View style={styles.topRectangle}/>
        <Text style={styles.labelText}>{name}</Text>
        <TouchableOpacity
          style={styles.logoIcon}
          onPress={() => navigator.navigate('Home', { screen: 'Головне меню' })}>
          <Image
            style={styles.logoIcon}
            contentFit="contain"
            source={require("../assets/logo1.png")}
          />
        </TouchableOpacity>
    </View>

    );
  };
  
  export default Logo;