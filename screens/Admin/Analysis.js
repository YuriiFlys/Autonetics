import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Svg, Circle, Path, Line, G } from 'react-native-svg';
import { useRef } from "react";
import { format} from "date-fns";
import {LinearGradient} from 'expo-linear-gradient';
import Logo from "../../components/Logo";
import Swiper from "react-native-swiper";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const DarkBlue = Color.colorDarkBlue;

const ArrowCircle = ({ color,rotation }) => (
  <Svg height="50" width="50" viewBox="0 0 50 50">
    <Circle
      cx="25"
      cy="25"
      r="20"
      stroke={color}
      strokeWidth="2.5"
      fill={color}
    />
    <G transform={`rotate(${rotation}, 25, 25)`}>
    <Line
      x1="15"
      y1="25"
      x2="36"
      y2="25"
      stroke="white"
      strokeWidth="2"
    />
    <Line
      x1="25"
      y1="20"
      x2="35"
      y2="25"
      stroke="white"
      strokeWidth="2"
    />
    <Line
      x1="25"
      y1="30"
      x2="35"
      y2="25"
      stroke="white"
      strokeWidth="2"
    />
    </G>
  </Svg>
);
const ProductWindow = ({ product, color }) => (
  <LinearGradient colors={[DarkBlue, color]} style={styles.productWindow}>
    <Text style={styles.productTitle}>{product.title}</Text>
    <Image source={product.image} style={styles.productImage} />
    <Text style={styles.productDescription}>{product.description}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
    <Text style={styles.productCode}>{product.code}</Text>
  </LinearGradient>
);


const ProfitcostsWidget = ({ widgetData }) => {
  return (
    <Swiper
      showsButtons={false}
      activeDotColor="white"
      dotColor="gray"
      loop={false}
      paginationStyle={{ bottom: screenHeight * 0.4 }}
    >
      {widgetData.map(({ name, color, rotation, value, transactions, products }) => (
        <View style={styles.slideContainer} key={name}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.profitcostsWidget}>
              <View style={styles.widgetLabel}>
                <ArrowCircle color={color} rotation={rotation} />
                <Text style={styles.WidgetName}>{name}</Text>
              </View>
              <Text style={styles.profitValue}>{value}</Text>
              <View style={styles.amountTransactions}>
                <Text style={styles.transactionsValue}>Всього транзакцій: {transactions}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.productContainer}>
            {products.map((product) => (
              <ProductWindow key={product.code} product={product} color={color} />
            ))}
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const Analysis = () => {
  const widgetData = [
    {
      name: "Прибуток",
      color: 'lime',
      rotation: -45,
      value: '20784.97 ₴',
      transactions: '213',
      products: [
        {
          title: 'Найчистіше купляють',
          image: require("../../assets/Image_Product_or_Shop/voda.png"),
          description: 'Вода Моршинська негазована',
          price: '20.50₴',
          code: 'код товару: 2387233849',
        },
        {
          title:"Найприбутковіший товар",
          image: require("../../assets/Image_Product_or_Shop/voda.png"),
          description: 'Вода Моршинська газована',
          price: '20.50₴',
          code: 'код товару: 2387233845',
        }
      ],
    },
    {
      name: "Витрати",
      color: 'darkorange',
      rotation: 135,
      value: '15000.00 ₴',
      transactions: '150',
      products: [
        {
          title: 'Падає попит',
          image: require("../../assets/Image_Product_or_Shop/voda.png"),
          description: 'Вода Моршинська негазована',
          price: '20.50₴',
          code: 'код товару: 2387233844',
        },
        {
          title:"Найзбитковіший товар",
          image: require("../../assets/Image_Product_or_Shop/voda.png"),
          description: 'Вода Моршинська газована',
          price: '20.50₴',
          code: 'код товару: 2387233842',
        }
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Аналіз даних" />
      <ProfitcostsWidget widgetData={widgetData}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Color.white,
    alignItems: "center",
    justifyContent:"center",
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profitcostsWidget:{
    width: screenWidth * 0.9,
    height: screenHeight * 0.35,
    backgroundColor: Color.colorDarkBlue,  
    borderRadius: 10,
    marginTop: screenHeight * 0.02,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  WidgetName: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorWhite,
    marginLeft: screenWidth * 0.02,
    marginTop: screenHeight * 0.02,
    textAlign: "left",
  },
  widgetLabel:{
    marginTop:ScreenHeight*0.01,
    marginLeft:ScreenWidth*0.02,
    flexDirection: "row",
  },
  profitValue:{
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
    marginLeft: screenWidth * 0.02,
    marginTop: screenHeight * 0.01,
  },
  amountTransactions:{
    marginTop:screenHeight*0.01,
    marginLeft:ScreenWidth*0.02,
    justifyContent:"center",
    width: screenWidth * 0.8,
    height: screenHeight * 0.05,
    backgroundColor: "#1E2B3D",  
    borderRadius: 10,
  },
  transactionsValue:{
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorWhite,
    marginLeft: screenWidth * 0.02,
    textAlign: "left",
  },
  productWindow: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.3,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productImage: {
    width: screenHeight * 0.15,
    height: screenHeight * 0.15,
    resizeMode: 'contain',
  },
  productDescription: {
    fontSize: FontSize.size_s,
    color: 'white',
  },
  productPrice: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  productCode: {
    fontSize: 12,
    color: 'white',
  },
});

export default Analysis;
