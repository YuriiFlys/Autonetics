import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import PromotionsWidget from "../../components/PromotionsWidget";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PromotionsAdmin = () => {
  const list = [
    {
      name: "Вода 0,5 л Боржомі мінеральна сильногазована",
      price: 67.99,
      imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
      shopLogo: require("../../assets/Image_Product_or_Shop/atbLogo.png"),
      dataTime: {
        start: "01.01.2022",
        end: "01.01.2023",
      },
    },
    {
      name: "Вода 0,5 л Боржомі мінеральна сильногазована",
      price: 67.99,
      discount: 20,
      imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
      shopLogo: require("../../assets/Image_Product_or_Shop/atbLogo.png"),
      dataTime: {
        start: "01.01.2022",
        end: "01.01.2023",
      },
    },
    {
      name: "Вода 0,5 л Боржомі мінеральна сильногазована",
      price: 67.99,
      discount: "New",
      imageSource: require("../../assets/Image_Product_or_Shop/voda.png"),
      shopLogo: require("../../assets/Image_Product_or_Shop/atbLogo.png"),
      dataTime: {
        start: "01.01.2022",
        end: "01.01.2023",
      },
    },
  ];
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //--------
    console.log("refresh");
    //-------
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ name: "Додати новий елемент", start: true }].concat(list)}
        renderItem={({ item }) => <PromotionsWidget item={item} />}
        keyExtractor={(item) => item.name}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
  },
});

export default PromotionsAdmin;
