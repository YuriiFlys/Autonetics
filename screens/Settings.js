import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/Logo";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Settings = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Logo name={"Налаштування"} />
      <View style={styles.settingContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Змінити мову</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Змінити валюту</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Змінити розмір шрифту</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Змінити тему</Text>
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
    borderTopWidth: Border.borderBottomWidth,
    borderTopColor: Color.colorGray,
    height: screenHeight * 0.4,
  },
});

export default Settings;
