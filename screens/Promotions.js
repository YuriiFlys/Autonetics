import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Promotions = () => {
  const navigator = useNavigation();
  const MainWidget = ({ name, price, image, brand, description }) => {
    return (
      <View style={styles.mainWidgetView}>
        <View style={styles.widgetInfoRow}>
          <Text style={styles.widgetProductMainInfo}>{name}</Text>
          <Text style={styles.widgetProductMainInfo}>{price}</Text>
        </View>
        <View style={styles.widgetImageRow}>
          <Image source={image} style={styles.widgetProductImage} />
          <Image source={brand} style={styles.widgetProductBrandLogo} />
        </View>
        <Text style={styles.widgetProductDescription}>{description}</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <Text style={styles.labelText}>Акції </Text>
      <TouchableOpacity
        style={styles.logoIcon}
        onPress={() => navigator.navigate('Home', { screen: 'Головне меню' })}>
        <Image
          style={styles.logoIcon}
          contentFit="contain"
          source={require("../assets/logo1.png")}
        />
      </TouchableOpacity>
      <MainWidget
        name={"Банани "}
        price={"47.59₴"}
        image={require("../assets/bananas.jpeg")}
        brand={require("../assets/atb500.png")}
        description={"Банани Іспанія"}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  labelText: {
    position: 'absolute',
    top: screenHeight * 0.1,
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 18,
    color: '#404040',
  },

  logoIcon: {
    alignSelf: 'center',
    height: screenWidth * 0.1299,
    width: screenWidth * 0.1299,
    position: 'absolute',
    top: screenHeight * 0.0446,
    left: screenWidth * 0.04,
  },
  topRectangle: {
    position: 'absolute',
    height: screenHeight * 0.15,
    width: screenWidth,
    top: 0,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  mainWidgetView: {
    height: screenWidth * 0.4,
    width: screenWidth * 0.9,
    position: 'absolute',
    top: screenHeight * 0.2,
    left: screenWidth * 0.05,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  widgetInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
  },
  widgetProductMainInfo: {
    fontFamily: "PalanquinDark-Regular",
    fontSize: 24,
    color: "#404040",
  },
  widgetImageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '15%',
    left: 0,
    right: 0,
    height: screenHeight * 0.25,
    width: screenWidth * 0.75,
  },
  widgetProductImage: {
    width: '70%',
    height: '50%',
    objectFit: 'contain',
  },
  
  widgetProductBrandLogo: {
    width: '30%',
    height: '30%',
    objectFit: 'contain',
  },
  widgetProductDescription: {
    position: 'absolute',
    top: '0%',
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  }

});
export default Promotions;
