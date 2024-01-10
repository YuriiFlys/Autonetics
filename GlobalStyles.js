import * as Font from "expo-font";
export default async function Fonts() {
  let fontsLoaded = await Font.loadAsync({
    CommissioneBold: require("./assets/fonts/Commissioner-Bold.ttf"),
    CommisioneExtraBold: require("./assets/fonts/Commissioner-ExtraBold.ttf"),
    CommissioneLight: require("./assets/fonts/Commissioner-Light.ttf"),
    CommissioneExtraLight: require("./assets/fonts/Commissioner-ExtraLight.ttf"),
    CommissioneRegular: require("./assets/fonts/Commissioner-Regular.ttf"),
    CommissioneSemiBold: require("./assets/fonts/Commissioner-SemiBold.ttf"),
    CommissioneThin: require("./assets/fonts/Commissioner-Thin.ttf"),
    CommissioneMedium: require("./assets/fonts/Commissioner-Medium.ttf"),
    palanquinDarkRegular: require("./assets/fonts/PalanquinDark-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return fontsLoaded;
}

export const FontFamily = {
  CommissioneExtraBold: "CommissioneExtraBold",
  CommissioneBold: "CommissioneBold",
  CommissioneLight: "CommissioneLight",
  CommissioneExtraLight: "CommissioneExtraLight",
  CommissioneRegular: "CommissioneRegular",
  CommissioneSemiBold: "CommissioneSemiBold",
  CommissioneThin: "CommissioneThin",
  CommissioneMedium: "CommissioneMedium",
  palanquinDarkRegular: "PalanquinDark-Regular",
};
/* font sizes */
export const FontSize = {
  size_xl: 20,
  size_21xl: 40,
};
/* Colors */
export const Color = {
  colorDarkslategray_100: "#23334a",
  colorDarkslategray_200: "#213045",
  colorGray: "rgba(255, 255, 255, 0)",
  colorWhite: "#fff",
  colorBlack: "black",
  colorGainsboro: "#d9d9d9",
  colorSteelblue: "#2469a2",

  // our colors
  colorDarkBlue: "#26364D",
  colorLightCyan: "#e0fafd",
  colorLightGray: "#B6B6B6",
};
/* border radiuses */
export const Border = {
  br_4xs: 9,
  br_3xs: 10,
  br_20: 20,
};
