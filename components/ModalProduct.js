import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { setData } from "./PopupWindow";
import { set } from "date-fns";

const ModalProduct = ({
  item,
  isModalVisible,
  setModalVisible,
  updateData,
  deleteElement,
}) => {
  const navigator = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState({});

  const toggleModal = (productName) => {
    setSelectedProduct(productName);
    setModalVisible(!isModalVisible);
  };
  const [quantity, setQuantity] = useState(item.number);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    updateData(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      updateData(item.id, quantity - 1);
    } else {
      Alert.alert(
        "Видалення товару",
        "Ви впевнені, що хочете видалити товар?",
        [
          {
            text: "Ні",
            onPress: () => console.log("Скасування видалення товару"),
            style: "cancel",
          },
          {
            text: "Так",
            onPress: () => {
              deleteElement(item.id);
              toggleModal("");
            },
          },
        ]
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleModal("");
      }}
    >
      <View style={styles.modalbackground}>
        <View style={styles.modalcontainer}>
          <Image source={item.imageSource} style={styles.productimage} />
          <View style={styles.productinfocontainer}>
            <View style={styles.productnamecontainer}>
              <Text>{item.name}</Text>
              <Text>{item.price}$</Text>
            </View>
            <View
              style={[
                styles.productnamecontainer,
                { flexDirection: "row", justifyContent: "center" },
              ]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDecrement()}
              >
                <Text style={styles.buttonTextPlusMinus}>-</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleIncrement()}
              >
                <Text style={styles.buttonTextPlusMinus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleModal("")}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ModalProduct;
