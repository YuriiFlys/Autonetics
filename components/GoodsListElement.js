import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { CheckBox } from "@rneui/themed";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const GoodsElement = ({ item, handleIsBuy }) => {
  console.log(item);
  const [check1, setCheck1] = useState(false);

  return (
    <View style={styles.containerNameOrder}>
      <CheckBox
        center
        checked={check1}
        onPress={() => {
          setCheck1(!check1);
          item.isBuy = check1;
          handleIsBuy();
        }}
      />
      <Image source={item.image} style={{ width: 50, height: 50 }} />
      <Text style={styles.orderName}>{item.goodsName}</Text>
      <Text style={styles.orderName}>{item.amount}</Text>
      <Text style={styles.orderName}>{item.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerNameOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: screenWidth,
  },
  orderName: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_m,
    color: Color.colorDarkBlue,
  },
});

export default GoodsElement;
