import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Map = () => {
  const navigator = useNavigation();
  return (
    <View style={[styles.container]}>

          <View style={styles.topRectangle}/>
          <Text style={styles.labelText}>Карта </Text>

        </View>
  );
};

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
    top: screenHeight*0.01,
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 18,
    color: '#404040',
  },
  logoIcon: {
    alignSelf: 'center',
    height: screenWidth*0.13,
    width: screenWidth*0.13,
    position: 'absolute',
    top: screenHeight*0,
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

export default Map;
