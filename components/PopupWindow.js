import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Element from "./Element";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import GrayLine from "./GrayLine";
import { set } from "date-fns";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const PopupWindow = ({ handleOpenPress, sum, setSum, data, setData }) => {
  const updateData = (id, number) => {
    setData((data) => {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, number: number } : item
      );
      return updatedData;
    });
    setSum((prevSum) => {
      const total = data.reduce((acc, item) => {
        return acc + item.number * item.price;
      }, 0);

      return total;
    });
  };

  const deleteElement = (id) => {
    Alert.alert("Видалення товару", "Ви впевнені, що хочете видалити товар?", [
      {
        text: "Ні",
        onPress: () => console.log("Скасування видалення товару"),
        style: "cancel",
      },
      {
        text: "Так",
        onPress: () => {
          setData((prevData) => {
            const updatedData = prevData.filter((item) => item.id !== id);
            setSum((prevSum) => {
              const total = data.reduce((acc, item) => {
                return acc + item.number * item.price;
              }, 0);

              return total;
            });
            return updatedData;
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.bottomsheetcontainer}>
      <View style={styles.bottomsheet_header_container}>
        <Text style={styles.textCartContainer}>Ваша Козина</Text>
      </View>
      <View style={styles.bottomsheet_main_container}>
        <GrayLine />
        <View style={{ height: screenHeight * 0.5 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Element
                item={item}
                updateData={updateData}
                deleteElement={deleteElement}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <GrayLine />
        <View style={styles.sumContainer}>
          <Text style={styles.sumtext}>Сума</Text>
          <Text style={[styles.sumtext, { color: "red" }]}>{sum} ₴</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log("Переходимо до сплати");
              console.log(data);
              handleOpenPress();
            }}
            style={styles.paybuttoncontainer}
          >
            <Text style={styles.paybuttonText}>Перейти до сплати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomsheetcontainer: {
    alignItems: "center",
  },
  bottomsheet_main_container: {
    marginTop: screenHeight * 0.045,
    alignItems: "center",
  },
  textCartContainer: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },

  counterContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  productNumberText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  sumContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.7,
    marginTop: screenHeight * 0.05,
  },
  sumtext: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  paybuttoncontainer: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.07,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.03,
  },
  paybuttonText: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorWhite,
  },
  modalbackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% прозорий
  },
  modalcontainer: {
    height: screenHeight * 0.8,
    width: screenWidth * 0.8,
    backgroundColor: Color.colorWhite,
    borderWidth: 2,
    borderColor: Color.colorDarkBlue,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "column",
  },
  productimage: {
    width: "100%",
    height: screenHeight * 0.4,
    contentFit: "contain",
    overflow: "hidden",
  },
  productinfocontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  productnamecontainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    paddingLeft: 20,
    width: "50%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: Color.colorLightGray,
    borderRadius: 25,
  },
  buttonTextPlusMinus: {},
  countText: {
    fontSize: FontSize.size_xl,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PopupWindow;