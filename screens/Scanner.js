import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container]}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.frame}>
        <View style={styles.topLeftCorner} />
        <View style={styles.topRightCorner} />
        <View style={styles.bottomLeftCorner} />
        <View style={styles.bottomRightCorner} />
      </View>
      <View>
        {scanned && (
          <TouchableOpacity style={[styles.button]} onPress={() => setScanned(false)}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.topRectangle}/>
      <Text style={styles.scanText}>Скан QR-коду</Text>
      <Image
        style={styles.logoIcon}
        contentFit="contain"
        source={require("../assets/logo1.png")}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  scanText: {
    position: 'absolute',
    top: screenHeight*0.02,
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 20,
    color: '#404040',
  },
  logoIcon: {
    alignSelf: 'center',
    height: screenWidth*0.12,
    width: screenWidth*0.12,
    position: 'absolute',
    top: screenHeight*0.01,
    left: screenWidth*0.05,
  },
  topRectangle: {
    position: 'absolute',
    height: screenHeight*0.15,
    width: screenWidth,
    top: 0,
    backgroundColor: '#fff',
    
    alignItems: 'center',
    
  },
  bottomRectangle: {
    position: 'absolute',
    height: screenHeight*0.08,
    width: screenWidth,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#404040',
    borderTopWidth: 2,
  },
  icon: {
    width: screenWidth*0.10,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  frame: {
    position: 'absolute',
    width: screenHeight*0.35,
    height: screenHeight*0.35,
    borderColor: 'rgb(0,0,0,0.5)',
    
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth*0.2,
    height: screenHeight*0.10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'white',
    borderRadius: 3,
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: screenWidth*0.2,
    height: screenHeight*0.10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
    borderRadius: 3,
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth*0.2,
    height: screenHeight*0.10,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: 'white',
    borderRadius: 3,
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: screenWidth*0.2,
    height: screenHeight*0.10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: 'white',
    borderRadius: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth*0.17,
    height: screenWidth*0.17,
    borderRadius: screenWidth*0.19/2,
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: screenHeight*0.25,
  },  
   innerCircle: {
    width: screenWidth*0.12,
    height: screenWidth*0.12,
    borderRadius: screenWidth*0.12/2,
    backgroundColor: 'white',
  },
});
