import React, { useState, useEffect, useCallback} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert
} from "react-native";
import {Image} from "expo-image";
import { Camera } from "expo-camera";
import {useIsFocused } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Scanner() {
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
    if (isFocused){
      setFlashMode(Camera.Constants.FlashMode.off);
    }
    setScanned(false);
    setTimeout(() => {
      setScanned(true);
    }, 100);
  }, [isFocused]);

  useEffect(() => {
    
  }
  ,[isFocused])
  const handleBarCodeScanned = useCallback(({ type, data }) => {
    setScanned(true);
    setIsScanning(false);
    const isUrl = /^(http|https):\/\/[^ "]+$/.test(data);
  
    if (isUrl && Linking.canOpenURL(data)) {
      Linking.openURL(data).catch(err => console.error('Failed to open URL: ', err));
    } else {
      Alert.alert(data)
    }
  }, []);
  

  const startScan = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      setScanned(false);
    }
    else {
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
    <View style={styles.container}>
      {isFocused && (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scannerwindow}
          flashMode={flashMode}
        />
      )}
      <View style={styles.frame}>
        <View style={styles.topLeftCorner} />
        <View style={styles.topRightCorner} />
        <View style={styles.bottomLeftCorner} />
        <View style={styles.bottomRightCorner} />
      </View>
      <View style={styles.flash}>
        <TouchableOpacity
          onPress={() => {
            toggleFlashlight();
          }}
        >
          <Image
            style={styles.icon}
            source={require("../assets/Camera/light.svg")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, isScanning ? styles.scanningButton : null]}
          onPress={startScan}
        >
          <View style={styles.innerCircle} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
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
    top: screenHeight * -0.1,
  },
  scanningButton: {
    backgroundColor: "red",
  },

  labelText: {
    position: "absolute",
    top: screenHeight * 0.01,
    fontFamily: "PalanquinDark-Regular",
    fontSize: 18,
    color: "#404040",
  },
  logoIcon: {
    alignSelf: "center",
    height: screenWidth * 0.13,
    width: screenWidth * 0.13,
    position: "absolute",
    top: screenHeight * 0,
    left: screenWidth * 0.04,
  },
  topRectangle: {
    position: "absolute",
    height: screenHeight * 0.15,
    width: screenWidth,
    top: 0,
    backgroundColor: "#fff",

    alignItems: "center",
  },
  bottomRectangle: {
    position: "absolute",
    height: screenHeight * 0.08,
    width: screenWidth,
    bottom: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#404040",
    borderTopWidth: 2,
  },
  icon: {
    width: screenWidth * 0.1,
    aspectRatio: 1,
    contentFit: "contain",
  },
  flash: {
    position: "absolute",
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
  },
  frame: {
    position: "absolute",
    width: screenHeight * 0.35,
    height: screenHeight * 0.35,
    borderColor: "rgb(0,0,0,0.5)",
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
});
