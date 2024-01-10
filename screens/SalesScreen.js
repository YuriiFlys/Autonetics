import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
  Modal,
  SafeAreaView,
} from "react-native";
// import Modal from "react-native-modal";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { TouchableHighlight } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GrayLine from "../components/GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  const navigator = useNavigation();
  // спливаюче вікно
  const bottomSheetRef = React.useRef();
  data = [
    {
      name: "Моршинська1",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська2",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська3",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська4",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська5",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська6",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.shopelement}
      onPress={() => {
        console.log(item.name);
        navigator.navigate("SalesScreen", { shopName: item.name });
      }}
    >
      <Image source={item.imageSource} style={styles.imageSource} />
      <View>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.street}>${item.price}</Text>
      </View>
      <Image
        style={{
          contentFit: "contain",
          height: screenHeight * 0.03,
          width: screenHeight * 0.03,
        }}
        source={require("../assets/Profile/help.svg")}
      />
    </TouchableOpacity>
  );
  const showAlert = () => {
    Alert.alert("Вихід", "Чи справді ви хочете вийти?", [
      {
        text: "Ні",
        onPress: () => console.log("Відміна"),
        style: "cancel",
      },
      { text: "Так", onPress: () => navigator.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
        <View style={styles.buttonCameraContainer}>
          <TouchableOpacity
            onPress={() => {
              showAlert();
            }}
          >
            <Image
              source={require("../assets/Camera/cross.svg")}
              style={styles.cross}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Ліхатрик")}>
            <Image
              source={require("../assets/Camera/light.svg")}
              style={styles.light}
            />
          </TouchableOpacity>
        </View>

        {/* спливаюче вікно */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[screenHeight * 0.15, screenHeight * 0.9]}
        >
          <View style={styles.bottomsheetcontainer}>
            <View style={styles.bottomsheet_header_container}>
              <Text style={styles.textCartContainer}>Ваша Козина</Text>
            </View>
            <View style={styles.bottomsheet_main_container}>
              <GrayLine />
              <View style={{ height: screenHeight * 0.5 }}>
                <FlatList data={data} renderItem={renderItem} />
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
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  GestureHandlerRootViewContainer: {
    height: screenHeight,
    width: screenWidth,

    alignItems: "center",
  },
  buttonCameraContainer: {
    marginTop: 10,
    width: screenWidth * 0.8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  light: {
    justifyContent: "center",
    alignItems: "center",
    width: (screenHeight * 0.045 * 10) / 25,
    height: screenHeight * 0.045,
  },
  cross: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.045,
    width: screenHeight * 0.045,
  },
  bottomsheetcontainer: {
    alignItems: "center",
  },
  textCartContainer: {
    width: screenWidth * 0.7,
    flexDirection: "row",
    justifyContent: "center",
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
    height: screenHeight * 0.09,
    marginTop: screenHeight * 0.01,
  },
  imageSource: {
    width: screenWidth * 0.1,
    height: "100%",
    contentFit: "contain",
    overflow: "hidden",
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
});
export default SalesScreen;
