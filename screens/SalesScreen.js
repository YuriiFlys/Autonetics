import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BottomSheet, { TouchableHighlight } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import GrayLine from "../components/GrayLine";
import PopupWindow from "../components/PopupWindow";
import Scanner from "../components/ScannerCamera";
import PayButton from "../components/PayButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  list = [
    {
      id: 1,
      name: "Моршинська1",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 10,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 2,
      name: "Моршинська2",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 3,
      name: "Моршинська3",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 4,
      name: "Моршинська4",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 5,
      name: "Моршинська5",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
    {
      id: 6,
      name: "Моршинська6",
      price: 123,
      imageSource: require("../assets/voda.png"),
      number: 1,
      description:
        "Природна мінеральна вода «Моршинська» походить з Прикарпаття, з моршинської долини, що розташована в курортному регіоні поблизу східного схилу Карпатського хребта і оточена з усіх боків лісами.",
    },
  ];
  const [data, setData] = useState(list);
  shop = {
    name: "Магазин АТБ",
    address: "вул. Шевченка, 1",
    imageSource: require("../assets/atb500.png"),
  };
  const navigator = useNavigation();
  const bottomSheetRef = React.useRef();
  const bottomSheetRef1 = React.useRef();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // Додана змінна стану

  const handleClosePress = () => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.close();
    }
    setIsBottomSheetOpen(false);
  };

  const handleOpenPress = () => {
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.expand();
      setIsBottomSheetOpen(true);
    }
    setIsBottomSheetOpen(true);
  };

  const [sum, setSum] = useState(
    data.reduce((acc, item) => acc + item.number * item.price, 0)
  );

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
        <Scanner />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[screenHeight * 0.15, screenHeight * 0.9]}
        >
          <PopupWindow
            handleOpenPress={handleOpenPress}
            sum={sum}
            setSum={setSum}
            data={data}
            setData={setData}
          />
        </BottomSheet>
        {isBottomSheetOpen && (
          <BottomSheet
            ref={bottomSheetRef1}
            index={0}
            snapPoints={[screenHeight * 0.93]}
            enablePanDownToClose={true}
            style={{ alignContent: "center" }}
          >
            <View
              style={{
                backgroundColor: Color.colorLightLightGray,
                alignItems: "center",
              }}
            >
              <View style={styles.shopInfoContainer}>
                <View style={styles.shopMainInfoContainer}>
                  <Image source={shop.imageSource} style={styles.shopImage} />
                  <View style={styles.shopNameContainer}>
                    <Text style={styles.shopName}>{shop.name}</Text>
                  </View>
                </View>
                <Text style={styles.addressText}>{shop.address}</Text>
                <Text style={[styles.addressText, { marginTop: 10 }]}>
                  {formattedDateTime}
                </Text>
                <Text style={styles.sumText}>До Сплати: {sum}$</Text>
              </View>
              <PayButton
                payLogo={require("../assets/ApplePayLogo.svg")}
                payName={"Apple Pay"}
                styleButton={{
                  backgroundColor: Color.colorBlack,
                }}
              />
              <PayButton
                payLogo={require("../assets/GooglePayLogo.svg")}
                payName={"Google Pay"}
                styleButton={{
                  backgroundColor: Color.colorWhite,
                  borderColor: Color.colorBlack,
                  borderWidth: Border.br_1,
                }}
                styleText={{
                  color: Color.colorBlack,
                }}
              />
            </View>
          </BottomSheet>
        )}
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
  shopInfoContainer: {
    marginTop: 30,
    width: "80%",
    height: screenHeight * 0.3,
    borderRadius: Border.br_20,
    backgroundColor: Color.colorLightLightGray,
    flexDirection: "column",
    padding: 20,
  },
  shopMainInfoContainer: {
    flexDirection: "row",
    height: "50%",
  },
  shopImage: {
    width: "35%",
    height: "100%",
    resizeMode: "contain",
  },
  shopNameContainer: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  shopName: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    textAlignVertical: "center",
    textAlign: "center",
  },
  addressText: {
    fontSize: FontSize.size_s,
    fontFamily: FontFamily.CommissioneLight,
    color: Color.colorLightGray,
  },
  sumText: {
    marginTop: 10,
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    textAlignVertical: "center",
    textAlign: "right",
  },
});
export default SalesScreen;
