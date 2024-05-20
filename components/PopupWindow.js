import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Element from "./Element";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import GrayLine from "./GrayLine";
import SmallWidget from "./SmallWidget";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import get_photo from "../api/Photo";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const PopupWindow = ({
  handleOpenPress,
  sum,
  setSum,
  data,
  setData,
  shopId,
}) => {
  const navigation = useNavigation();
  const [AiData, setAiData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      await loadAiData();
    };
    loadData();
  }, []);
  const loadAiData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "http://23.100.50.204:8080/api/ai/best-product-for-weather",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            shopId: 8,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const responseData = await response.json();
      responseData.map((item) => {
        item.photo = get_photo(item.photo)._j;
      });
      setAiData(responseData);
    } catch (e) {
      console.error("Ai error", e);
    }
  };
  const updateData = (id, number) => {
    setData((data) => {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, number: number } : item
      );
      return updatedData;
    });
    setSum((prevSum) => {
      const total = data.reduce((acc, item) => {
        return acc + item.number * item.priceOut;
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
            setSum(() => {
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
  const scrollViewRef = useRef();
  return (
    <View style={styles.bottomsheetcontainer}>
      <View style={styles.bottomsheet_header_container}>
        <Text style={styles.textCartContainer}>Ваша Корзина</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={styles.bottomsheet_main_container}
      >
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
          <Text style={[styles.sumtext, { color: "red" }]}>
            {sum.toFixed(2)} ₴
          </Text>
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
        <View style={styles.offersContainer}>
          <Text style={styles.personalSuggestions}>Ваші пропозиції</Text>
          <FlatList
            data={AiData}
            renderItem={({ item }) => <SmallWidget item={item} />}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomsheetcontainer: {
    alignItems: "center",
  },
  bottomsheet_header_container: {
    alignItems: "center",
    width: "100%",
    height: screenHeight * 0.07,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
  },
  bottomsheet_main_container: {
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
  offersContainer: {
    marginTop: screenHeight * 0.05,
    width: screenWidth,
    marginBottom: screenHeight * 0.1,
  },
  personalSuggestions: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
    marginBottom: screenHeight * 0.02,
    marginLeft: screenWidth * 0.05,
  },
});

export default PopupWindow;
