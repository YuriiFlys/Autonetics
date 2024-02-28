import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { SafeAreaView } from "react-native-safe-area-context";
const Scanner = ({
  styleflashlight,
  styleFrame,
  styleButtonScanner,
  isCross,
}) => {
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
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const isFocused = useIsFocused();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
    if (isFocused) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
    setScanned(false);
    setTimeout(() => {
      setScanned(true);
    }, 100);
  }, [isFocused]);

  useEffect(() => {}, [isFocused]);
  const handleBarCodeScanned = useCallback(({ type, data }) => {
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
  }, []);

  const startScan = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      setScanned(false);
    } else {
      setScanned(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const toggleFlashlight = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.torch);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  return (
    <View style={styles.container_c}>
      {isFocused && (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scannerwindow}
          flashMode={flashMode}
        >
          <SafeAreaView style={[styles.buttonCameraContainer, styleflashlight]}>
            <TouchableOpacity
              onPress={() => {
                showAlert();
              }}
            >
              {isCross && (
                <Image
                  source={require("../assets/Camera/cross.svg")}
                  style={styles.cross}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFlashlight()}>
              <Image
                source={require("../assets/Camera/light.svg")}
                style={styles.light}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={[styles.frame, styleFrame]}>
            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                isScanning ? styles.scanningButton : null,
                styleButtonScanner,
              ]}
              onPress={startScan}
            >
              <View style={styles.innerCircle} />
            </TouchableOpacity>
          </View>
        </Camera>
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
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  scannerwindow: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  scanningButton: {
    backgroundColor: "red",
  },
  frame: {
    width: screenHeight * 0.35,
    height: screenHeight * 0.35,
    marginTop: "30%",
    backgroundColor: "Red",
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth * 0.2,
    height: screenHeight * 0.1,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: Color.colorWhite,
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
    borderColor: Color.colorWhite,
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
    borderColor: Color.colorWhite,
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
    marginTop: "30%",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.17,
    height: screenWidth * 0.17,
    borderRadius: (screenWidth * 0.19) / 2,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    alignSelf: "center",
  },
  innerCircle: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderRadius: (screenWidth * 0.12) / 2,
    backgroundColor: "white",
  },
});

export default Scanner;
