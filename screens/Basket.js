import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Basket = () => {
  const navigator = useNavigation();
  const bottomSheetRef = React.useRef();
  const [snapPointIndex, setSnapPointIndex] = React.useState(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container]}>
          <View style={styles.topRectangle}/>
          <Text style={styles.labelText}>Історія та улюблені </Text>
          <TouchableOpacity
      style={styles.logoIcon}
      onPress={() => navigator.navigate('Home', { screen: 'Головне меню' })}>
  <Image
    style={styles.logoIcon}
    contentFit="contain"
    source={require("../assets/logo1.png")}
  />
</TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={['10%','75%']}
          onChange={index => setSnapPointIndex(index)}
        >
          <View style={styles.qrContainer}>
          <Text style={[styles.sheetText, snapPointIndex === 0 ? styles.closedBasketText : styles.BasketText]}>
              {snapPointIndex === 0 ? "До сплати" : "Ваша корзина"}
            </Text>
            <QRCode
              value="https://www.wikipedia.org/"
              size={screenHeight*0.4}
              color="black"
              backgroundColor="white"
            />
          </View>
        </BottomSheet>
        </View>
    </GestureHandlerRootView>
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
    top: screenHeight*0.1,
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 18,
    color: '#404040',
  },
  BasketText:{
    top:0,
    
  },
  closedBasketText:{
    top:0,
    left:screenWidth*0.1,
  },
  sheetText:{
    top:0,
    position:"absolute",
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
  qrContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
export default Basket;
