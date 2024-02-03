import React, { useState, useEffect } from "react";
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
import ModalProduct from "./ModalProduct";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Element = ({ item, updateData, deleteElement }) => {
  const navigator = useNavigation();
  const x = useSharedValue(0);
  const swipeAnimatedValues = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      x.value = event.translationX;
    },

    onEnd: (event) => {
      if (x.value > screenWidth / 3) {
        console.log(x.value + " > " + screenWidth / 3 + " => 0");
        x.value = withTiming(0);
      } else {
        console.log(
          x.value + " < " + screenWidth / 3 + " => " + -screenWidth / 2
        );
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
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Animated.View
        style={[animatedElementStyle, { height: screenHeight * 0.2 }]}
      >
        <View style={{ flexDirection: "row", width: screenWidth * 1.3 }}>
          <TouchableOpacity
            style={styles.shopelement}
            onPress={() => {
              navigator.navigate("ProductInfo", { item: item });
            }}
          >
            <Image source={item.imageSource} style={styles.imageSource} />
            <View style={styles.nameContainer}>
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.counterText}>Ціна: {item.price}$</Text>
            </View>
            <View style={styles.counterContainer}>
              <View style={{ flexDirection: "row", marginRight: 20 }}>
                <Text style={styles.counterText}>Кількість: </Text>
                <Text
                  style={[
                    styles.counterText,
                    { fontFamily: FontFamily.CommissioneBold },
                  ]}
                >
                  {item.number}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginRight: 20 }}
              >
                <Text style={styles.counterText}>Сума: </Text>
                <Text
                  style={[
                    styles.counterText,
                    { fontFamily: FontFamily.CommissioneBold },
                  ]}
                >
                  {item.number * item.price}$
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.hiddenButton,
              { backgroundColor: Color.colorDarkBlue },
            ]}
            onPress={() => {
              console.log("sadasdsad");
              setModalVisible(true);
            }}
          >
            <Text style={styles.hiddenText}>Деталі</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteElement(item.id);
            }}
            style={[styles.hiddenButton, { backgroundColor: "red" }]}
          >
            <Text style={styles.hiddenText}>Видалити</Text>
          </TouchableOpacity>
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
      <ModalProduct
        item={item}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        updateData={updateData}
        deleteElement={deleteElement}
      />
    </View>
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
  counterContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneMedium,
    color: Color.colorDarkBlue,
  },
  hiddenButton: {
    height: "100%",
    width: screenWidth * 0.25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  hiddenText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
});

export default Element;
