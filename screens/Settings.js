import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, Button } from "react-native";
import Slider from "react-native-slider";
import RNPickerSelect from "react-native-picker-select";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/Logo";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Settings = () => {
  const сurrency = [
    { label: "Українська", value: "ua" },
    { label: "Польська", value: "pl" },
    { label: "Англійська", value: "en" },
  ];
  const navigator = useNavigation();
  const [value, setValue] = React.useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Logo name={"Налаштування"} />
      <View style={styles.settingContainer}>
        <View style={styles.settingItem}>
          <View style={styles.buttonSetting}>
            <Text style={styles.settingText}>Змінити мову</Text>
            <RNPickerSelect
              style={{
                inputIOS: styles.pickerText,
                inputAndroid: styles.pickerText,
              }}
              onValueChange={(value) => console.log(value)}
              items={сurrency}
              placeholder={{}}
            />
          </View>
          <View style={styles.buttonSetting}>
            <Text style={styles.settingText}>Змінити валюту</Text>
            <RNPickerSelect
              style={{
                inputIOS: styles.pickerText,
                inputAndroid: styles.pickerText,
              }}
              onValueChange={(value) => console.log(value)}
              items={сurrency}
              placeholder={{}}
            />
          </View>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Змінити розмір шрифту</Text>
          <Slider
            value={value}
            onValueChange={setValue}
            minimumValue={0}
            maximumValue={5}
            step={0.25}
            style={{ width: screenWidth * 0.8, alignSelf: "center" }}
          />
          <Text>{value}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Темний режим</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  settingContainer: {
    flex: 1,
    paddingTop: screenHeight * 0.02,
    alignItems: "center",
    backgroundColor: Color.colorSuperLightGray,
  },
  settingItem: {
    marginTop: screenHeight * 0.02,
    width: screenWidth * 0.9,
    padding: screenHeight * 0.02,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSetting: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  settingText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkBlue,
  },
  pickerText: {
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_m,
    color: Color.colorDarkBlue,
  },
});

export default Settings;
