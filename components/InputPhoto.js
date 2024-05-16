import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const InputPhoto = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    (async () => {
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [16, 9],
      quality: 2,
    });

    if (!result.cancelled) {
      console.log("result.uri", result);
      setImage(image.concat(result));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input Photo</Text>
      <ScrollView style={styles.containerImage} horizontal={true}>
        {image.map((item) => {
          return (
            <View
              style={{
                flex: 1,
                width: 100,
                margin: 10,
              }}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
          );
        })}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            flex: 1,
            width: 100,
            margin: 20,
            alignItems: "center",
            justifyContent: "center",
            borderColor: Color.colorLightGray,
            borderWidth: 2,
            borderRadius: 16,
            marginRight: 20,
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.25,
  },
  text: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
    margin: 10,
  },
  containerImage: {
    height: "33%",
    width: 0.9 * screenWidth,
    borderColor: Color.colorDarkBlue,
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: "row",
  },

  image: {
    height: "100%",
    flex: 1,
    contentFit: "contain",
    margin: 10,
    // backgroundColor: Color.colorLightGray,
  },
});

export default InputPhoto;
