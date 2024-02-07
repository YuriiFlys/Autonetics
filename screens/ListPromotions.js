import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Color } from "../GlobalStyles";
import Logo from "../components/Logo";
import PromotionsWidget from "../components/PromotionsWidget";
const screenWidth = Dimensions.get("window").width;

const ListPromotions = ({ route }) => {
  const { list } = route.params;
  console.log("list: ", list);
  return (
    <SafeAreaView style={styles.container}>
      <Logo name={list.name} isGoBack={true} />
      <FlatList
        data={list.item}
        renderItem={({ item }) => <PromotionsWidget item={item} />}
        keyExtractor={(item) => item.name}
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

export default ListPromotions;
