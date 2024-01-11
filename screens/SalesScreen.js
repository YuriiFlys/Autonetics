import React, { useState } from "react";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BottomSheet, { TouchableHighlight } from "@gorhom/bottom-sheet";
import GrayLine from "../components/GrayLine";
import PopupWindow from "../components/PopupWindow";
import Scanner from "../components/ScannerCamera";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  const navigator = useNavigation();
  // Спливаюче вікно
  const bottomSheetRef = React.useRef();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
        <Scanner /> {"Камера"}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[screenHeight * 0.15, screenHeight * 0.9]}
        >
          <PopupWindow /> {"Спливаюче вікно"}
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorWhite,
  },
  GestureHandlerRootViewContainer: {
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
});
export default SalesScreen;
