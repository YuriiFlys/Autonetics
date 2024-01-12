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
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { PanGestureHandler } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Element = ({ item }) => {
  const navigator = useNavigation();
  const x = useSharedValue(0);

  const swipeAnimatedValues = useAnimatedGestureHandler({
    onStart: (event) => {
      console.log("onStart");
    },
    onActive: (event) => {
      x.value = event.translationX;
      console.log(x.value);
    },
    onEnd: (event) => {
      if (x.value > screenWidth / 3) {
        x.value = withTiming(0);
      } else {
        x.value = withTiming(-screenWidth / 2);
      }
    },
  });

  const animatedElementStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(x.value, {
          duration: 100,
        }),
      },
    ],
  }));

  return (
    <Animated.View
      style={[animatedElementStyle, { height: screenHeight * 0.2 }]}
    >
      <View style={{ flexDirection: "row", width: screenWidth * 1.3 }}>
        <TouchableOpacity
          style={styles.shopelement}
          onPress={() => console.log("sadasdsad")}
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
        <View style={[styles.hiddenButton, { backgroundColor: "yellow" }]}>
          <Text>Деталі</Text>
        </View>
        <View style={[styles.hiddenButton, { backgroundColor: "red" }]}>
          <Text>Видалити</Text>
        </View>
      </View>
      <PanGestureHandler onGestureEvent={swipeAnimatedValues}>
        <Animated.View
          style={{
            position: "absolute",
            width: "30%",
            height: screenHeight * 0.2,
            right: 0,
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
    resizeMode: "contain",
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
  hiddenButton: {
    height: "100%",
    width: screenHeight * 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});

export default Element;
