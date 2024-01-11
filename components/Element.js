import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Element = ({ item }) => {
  const navigator = useNavigation();
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
  console.log(item);
  console.log("sadasdsad");

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

const styles = StyleSheet.create({
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
});

export default Element;
