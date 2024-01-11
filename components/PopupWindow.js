import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import GrayLine from "./GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const PopupWindow = ({ style }) => {
  list = [
    {
      id: 1,
      name: "Моршинська1asdasdsa s asd sad asd as d asdasdsadas dasdsadasd as",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
    {
      id: 2,
      name: "Моршинська2",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
    {
      id: 3,
      name: "Моршинська3",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
    {
      id: 4,
      name: "Моршинська4",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
    {
      id: 5,
      name: "Моршинська5",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
    {
      id: 6,
      name: "Моршинська6",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
    },
  ];
  const [data, setData] = useState(list);
  const x = useSharedValue(0);

  const swipeAnimatedValues = useAnimatedGestureHandler({
    onStart: () => {
      console.log("onStart");
    },
    onActive: (event) => {
      x.value = event.translationX;
    },
    onEnd: (event) => {
      console.log(event);
    },
  });

  const animatedElementStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const renderItem = ({ item }) => {
    return (
      <Animated.View style={[styles.shopelement, animatedElementStyle]}>
        <TouchableOpacity
          style={styles.shopelement}
          onPress={() => toggleModal(item)}
        >
          <Image source={item.imageSource} style={styles.imageSource} />
          <View style={styles.nameContainer}>
            <Text style={styles.shopName}>{item.name}</Text>
            <Text style={styles.street}>${item.price}</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.productNumberText}>{item.number}</Text>
          </View>
        </TouchableOpacity>
        <PanGestureHandler onGestureEvent={swipeAnimatedValues}>
          <Animated.View
            style={{
              position: "absolute",
              width: screenWidth,
              height: screenHeight * 0.2,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          ></Animated.View>
        </PanGestureHandler>
      </Animated.View>
    );
  };
  return (
    <View style={styles.bottomsheetcontainer}>
      <View style={styles.bottomsheet_header_container}>
        <Text style={styles.textCartContainer}>Ваша Козина</Text>
      </View>
      <View style={styles.bottomsheet_main_container}>
        <GrayLine />
        <View style={{ height: screenHeight * 0.5 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <GrayLine />
        <View style={styles.sumContainer}>
          <Text style={styles.sumtext}>Сума</Text>
          <Text style={[styles.sumtext, { color: "red" }]}>99.99 ₴</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => console.log("Переходимо до сплати")}
            style={styles.paybuttoncontainer}
          >
            <Text style={styles.paybuttonText}>Перейти до сплати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomsheetcontainer: {
    alignItems: "center",
  },
  bottomsheet_main_container: {
    marginTop: screenHeight * 0.045,
    alignItems: "center",
  },
  textCartContainer: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },

  shopelement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: screenWidth,
    height: screenHeight * 0.2,
  },
  imageSource: {
    width: screenWidth * 0.1,
    height: "100%",
    contentFit: "contain",
    overflow: "hidden",
    flex: 1,
  },
  nameContainer: {
    flex: 2,
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  shopName: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },

  counterContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  productNumberText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  sumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.7,
    marginTop: screenHeight * 0.05,
  },
  sumtext: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  paybuttoncontainer: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.07,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.03,
  },
  paybuttonText: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
  modalbackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% прозорий
  },
  modalcontainer: {
    height: screenHeight * 0.8,
    width: screenWidth * 0.8,
    backgroundColor: Color.colorWhite,
    borderWidth: 2,
    borderColor: Color.colorDarkBlue,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "column",
  },
  productimage: {
    width: "100%",
    height: screenHeight * 0.4,
    contentFit: "contain",
    overflow: "hidden",
  },
  productinfocontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  productnamecontainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    paddingLeft: 20,
    width: "50%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: Color.colorLightGray,
    borderRadius: 25,
  },
  buttonTextPlusMinus: {},
  countText: {
    fontSize: FontSize.size_xl,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PopupWindow;
