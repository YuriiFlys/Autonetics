import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { TouchableHighlight } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  const navigator = useNavigation();
  const bottomSheetRef = React.useRef();
  //   const [isTorchOn, setIsTorchOn] = React.useState(false);

  //   const toggleTorch = () => {
  //     try {
  //       if (isTorchOn) {
  //         Torch.switchOff(); // Turn off the flashlight
  //       } else {
  //         Torch.switchOn(); // Turn on the flashlight
  //       }
  //       setIsTorchOn(!isTorchOn);
  //     } catch (error) {
  //       console.error("Error toggling torch:", error);
  //     }
  //   };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.buttonCameraContainer}>
        <TouchableOpacity
          onPress={() => {
            navigator.goBack();
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
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={["10%", "85%"]}>
        <View style={styles.sumContainer}>
          <Text>Сума</Text>
          <Text>99.99</Text>
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
  sumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default SalesScreen;
