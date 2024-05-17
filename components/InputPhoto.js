import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const InputPhoto = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status: libraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // Quality should be between 0 and 1
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImages = result.assets.map((asset) => ({ uri: asset.uri }));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Input Photo</Text>
        <ScrollView style={styles.containerImage} horizontal={true}>
          {images.map((item, index) => (
            <View
              key={index} // Adding key for each item
              style={styles.imageContainer}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
          ))}
          <TouchableOpacity onPress={pickImage} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.25,
    marginHorizontal: screenWidth * 0.05,
  },
  text: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
    marginBottom: 10,
  },
  containerImage: {
    height: "80%",
    borderColor: Color.colorDarkBlue,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addButton: {
    width: 100,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.colorLightGray,
    borderWidth: 2,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 24,
    color: Color.colorLightGray,
  },
});

export default InputPhoto;
