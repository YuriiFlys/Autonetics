import React, { useState } from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import PopupWindow from "../components/PopupWindow";
import Scanner from "../components/ScannerCamera";
import PayButton from "../components/PayButton";
import { SafeAreaProvider } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  let list = []; // воно потрібно але я хз як це забрати
  const [data, setData] = useState([]);
  shop = {
    name: "Магазин АТБ",
    address: "вул. Шевченка, 1, Львів, Львівська область, 79000",
    imageSource: require("../assets/Image_Product_or_Shop/atbLogo.png"),
  };
  const navigator = useNavigation();
  const bottomSheetRef = React.useRef();
  const bottomSheetRef1 = React.useRef();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
    data.reduce((acc, item) => acc + item.number * item.goodPriceOut, 0)
  );

  const handleScanned = (barcode) => {
    fetch(`http://23.100.50.204:8080/goods/byBarCode/${barcode}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Помилка при завантаженні даних");
        }
        return res.json();
      })
      .then((res) => {
        let existingIndex = list.findIndex(
          (item) => item.goodID === res.goodID
        );
        console.log("existingIndex", existingIndex);

        if (existingIndex !== -1) {
          list[existingIndex].number = list[existingIndex].number + 1;
        } else {
          res.photo = require("../assets/Image_Product_or_Shop/voda.png");
          res.number = 1;
          list.push(res);
        }
        setData([...list]);
        setSum(
          list.reduce((acc, item) => acc + item.number * item.goodPriceOut, 0)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
        <Scanner isCross={true} handleScanned={handleScanned} />
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[screenHeight * 0.09, screenHeight * 0.85]}
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
            style={{
              alignContent: "center",
              borderColor: Color.colorLightGray,
              borderWidth: 1,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                backgroundColor: Color.colorWhite,
                alignItems: "center",
              }}
            >
              <Text style={styles.payNameScreen}>Опалата</Text>
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
                <Text style={styles.sumText}>До cплати: {sum.toFixed(2)}$</Text>
              </View>
              <PayButton
                payLogo={require("../assets/ApplePayLogo.svg")}
                payName={"Apple Pay"}
                arrow={require("../assets/Arrow.svg")}
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
                  borderWidth: 1,
                }}
                arrow={require("../assets/Arrow_black.svg")}
                styleText={{
                  color: Color.colorBlack,
                }}
              />
              <PayButton
                payLogo={require("../assets/CashPayment.svg")}
                payName={"Оплата на касі"}
                styleButton={{
                  backgroundColor: Color.colorDarkBlue,
                  borderColor: Color.colorBlack,
                  borderWidth: 1,
                }}
                arrow={require("../assets/Arrow.svg")}
              />
            </View>
          </BottomSheet>
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
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
    backgroundColor: Color.colorSuperLightGray,
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
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    textAlignVertical: "center",
    textAlign: "right",
  },
  payNameScreen: {
    fontSize: FontSize.size_2xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
});
export default SalesScreen;
