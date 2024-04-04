import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, View, Text } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { FlatList } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SellHistory = () => {
  const data = [
    {
      id: 1,
      name: "Іван Петренко",
      time: "2024-12-12 12:12:12",
      sum: 1200,
    },
    {
      id: 2,
      name: "Іван sss",
      time: "2024-12-12 12:12:12",
      sum: 1200,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLogo}></View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <Text style={styles.itemTimeText}>{item.time}</Text>
        </View>
        <Text>{item.sum}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Історія продаж" />
      <FlatList
        renderItem={(item) => renderItem(item)}
        data={data}
        keyExtractor={(item) => item.id}
        refreshing={true}
        onRefresh={() => console.log("refresh")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: screenHeight * 0.12,
    // backgroundColor: "red",
    paddingHorizontal: screenHeight * 0.02,
    alignItems: "center",
  },
  itemLogo: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    borderRadius: screenHeight * 0.05,
    // backgroundColor: "blue",
  },
  itemNameContainer: {
    width: screenWidth * 0.5,
    // backgroundColor: "green",
    height: "80%",
    justifyContent: "center",
    // justifyContent: "space-around",
  },
  itemNameText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkBlue,
  },
  itemTimeText: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_xs,
    color: Color.colorLightGray,
  },
});

export default SellHistory;
