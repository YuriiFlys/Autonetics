import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  Linking,
  Modal,
} from "react-native";
// import Modal from "react-native-modal";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import BottomSheet, { TouchableHighlight } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GrayLine from "../components/GrayLine";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  const navigator = useNavigation();
  // спливаюче вікно
  const bottomSheetRef = React.useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const toggleModal = (productName) => {
    setSelectedProduct(productName);
    setModalVisible(!isModalVisible);
  };
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
      onPress={() => toggleModal(item)}
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
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsScanning(false);
    const isUrl = /^(http|https):\/\/[^ "]+$/.test(data);

    if (isUrl && Linking.canOpenURL(data)) {
      Linking.openURL(data).catch((err) =>
        console.error("Failed to open URL: ", err)
      );
    } else {
      Alert.alert(data);
    }
  };

  const startScan = () => {
    setIsScanning(!isScanning);
    if (isScanning) {
      setScanned(true);
    } else {
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.GestureHandlerRootViewContainer}>
        <View style={styles.container_c}>
          {isFocused && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scannerwindow}
            >
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
              <View style={styles.frame}>
                <View style={styles.topLeftCorner} />
                <View style={styles.topRightCorner} />
                <View style={styles.bottomLeftCorner} />
                <View style={styles.bottomRightCorner} />
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  isScanning ? styles.scanningButton : null,
                ]}
                onPress={startScan}
              >
                <View style={styles.innerCircle} />
              </TouchableOpacity>
            </BarCodeScanner>
          )}
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
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.modal.modalbackground}>
                    <View style={styles.modal.modalcontainer}>
                      <Image
                        source={selectedProduct.imageSource}
                        style={styles.modal.productimage}
                      />
                      <View style={styles.modal.productinfocontainer}>
                        <View
                          style={[
                            styles.modal.productnamecontainer,
                            { backgroundColor: "red" },
                          ]}
                        >
                          <Text>{selectedProduct.name}</Text>
                          <Text>asdsa</Text>
                        </View>
                        <View style={styles.modal.productnamecontainer}>
                          <Text>asdsa</Text>
                          <Text>asdsa</Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => toggleModal("")}>
                        <Text>Close Modal</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
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
    backgroundColor: Color.colorWhite,
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

  container_c: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: screenWidth,
    height: "100%",
  },
  scannerwindow: {
    flex: 1,
    position: "absolute",
    width: screenWidth * 1.2,
    height: screenHeight,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  scanningButton: {
    backgroundColor: "red",
  },
  frame: {
    position: "absolute",
    width: screenHeight * 0.35,
    height: screenHeight * 0.35,
    marginTop: screenHeight * 0.2,
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth * 0.2,
    height: screenHeight * 0.1,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "white",
    borderRadius: 3,
  },
  topRightCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: screenWidth * 0.2,
    height: screenHeight * 0.1,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: "white",
    borderRadius: 3,
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: screenWidth * 0.2,
    height: screenHeight * 0.1,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: "white",
    borderRadius: 3,
  },
  bottomRightCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: screenWidth * 0.2,
    height: screenHeight * 0.1,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "white",
    borderRadius: 3,
  },
  button: {
    marginTop: screenHeight * 0.4,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.17,
    height: screenWidth * 0.17,
    borderRadius: (screenWidth * 0.19) / 2,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    position: "absolute",
    alignSelf: "center",
    top: screenHeight * 0.25,
  },
  innerCircle: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: (screenWidth * 0.12) / 2,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  modal: {
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
    },
    productnamecontainer: {
      flexDirection: "column",
      justifyContent: "space-around",
    },
  },
});
export default SalesScreen;
