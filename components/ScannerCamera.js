import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Scanner = ({ style }) => {
  const navigator = useNavigation();

  // Вихід
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
            style={[styles.button, isScanning ? styles.scanningButton : null]}
            onPress={startScan}
          >
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </BarCodeScanner>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Scanner;
