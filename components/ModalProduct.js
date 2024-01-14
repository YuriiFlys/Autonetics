import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ModalProduct = ({
  item,
  isModalVisible,
  setModalVisible,
  updateData,
  deleteElement,
}) => {
  const navigator = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState({});

  const toggleModal = () => {
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
      deleteElement(item.id);
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
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalbackground}>
          <TouchableWithoutFeedback
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles.modalcontainer}>
              <Image source={item.imageSource} style={styles.productimage} />
              <View style={styles.productinfocontainer}>
                <View style={styles.productnamecontainer}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}$</Text>
                </View>
                <View style={[styles.productnamecontainer]}>
                  <View
                    style={[
                      styles.productnCountContainer,
                      {
                        flexDirection: "row",
                        justifyContent: "center",
                      },
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
                  <Text>Сума: {item.number * item.price}</Text>
                </View>
              </View>
              <View
                style={{
                  height: screenHeight * 0.2,
                  width: "100%",
                }}
              >
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Переходимо на сторінку продукту")}
                style={styles.moreInfoButton}
              >
                <Text style={styles.moreInfoText}>
                  Перейти на сторінку Продукту
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalbackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalcontainer: {
    width: screenWidth * 0.8,
    backgroundColor: Color.colorWhite,
    borderWidth: 2,
    borderColor: Color.colorDarkBlue,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
  },
  productimage: {
    width: "100%",
    height: screenHeight * 0.4,
    contentFit: "contain",
    overflow: "hidden",
  },
  productinfocontainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  productnamecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
    width: "100%",
  },
  productName: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_m,
    color: Color.colorDarkBlue,
  },
  productPrice: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_m,
    color: Color.colorDarkBlue,
  },
  productnCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: Color.colorLightGray,
    borderRadius: 25,
  },
  buttonTextPlusMinus: {
    color: Color.colorDarkBlue,
  },
  countText: {
    fontSize: FontSize.size_m,
    marginLeft: 10,
    marginRight: 10,
  },
  descriptionText: {
    fontFamily: FontFamily.CommissioneLight,
    fontSize: FontSize.size_s,
    color: Color.colorLightGray,
  },
  moreInfoButton: {
    margin: 10,
    width: "90%",
    height: screenHeight * 0.1,
    backgroundColor: Color.colorDarkBlue,
    borderRadius: Border.br_25,
    alignItems: "center",
    justifyContent: "center",
  },
  moreInfoText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_s,
    color: Color.colorWhite,
  },
});

export default ModalProduct;
