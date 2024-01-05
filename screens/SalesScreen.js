import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from "react-native";
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
  const bottomSheetRef = React.useRef();
  const keyExtractor = (item, index) => index.toString();
  data = [
    {
      name: "Моршинська",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська",
      price: 123,
      imageSource: require("../assets/Products/morshynska.png"),
    },
    {
      name: "Моршинська",
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
      <Text style={styles.shopName}>{item.name}</Text>
      <Text style={styles.street}>{item.price}</Text>
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
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.buttonCameraContainer}>
        <TouchableOpacity
          onPress={() => {
            showAlert();
            // navigator.goBack();
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
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[screenHeight * 0.09, screenHeight * 0.85]}
      >
        <View style={styles.bottomsheetcontainer}>
          <View style={styles.sumContainer}>
            <Text style={styles.sumtext}>Сума</Text>
            <Text style={[styles.sumtext, { color: "red" }]}>99.99 ₴</Text>
          </View>
          <View style={styles.bottomsheet_main_container}>
            <GrayLine />
            <FlatList data={data} renderItem={renderItem} />
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonCameraContainer: {
    marginTop: 100,
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
  sumContainer: {
    width: screenWidth * 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomsheet_main_container: {
    marginTop: screenHeight * 0.045,
  },
  sumtext: {
    fontSize: 23,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  shopelement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth * 0.9,
    height: screenHeight * 0.09,
  },
  imageSource: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
  },
});
export default SalesScreen;
