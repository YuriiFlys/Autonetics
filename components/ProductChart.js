import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Color } from "../GlobalStyles";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProductChart = ({ countSales }) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: countSales,
        color: () => Color.colorLightGray, // optional
        strokeWidth: 1, // optional
      },
    ],
    legend: ["Кількість продаж"],
  };
  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={{
          backgroundGradientFrom: Color.colorWhite,
          backgroundGradientTo: Color.colorSuperLightGray,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grayLine: {
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
  },
});

export default ProductChart;
