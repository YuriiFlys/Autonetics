import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import InputField from "../../components/InputField.js";
import InputPhoto from "../../components/InputPhoto.js";
import SelectList from "../../components/SelectList";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fields = [
  "Назва товару",
  "Вхідна ціна",
  "Вага",
  "Тип продукту",
  "Штрих-код",
  "Опис",
  "Виробник",
  "Умови зберігання",
  "Вміст",
  "Країна виробник",
  "Клас",
];

const data = [
  { key: "1", value: "Mobiles" },
  { key: "2", value: "Appliances" },
  { key: "3", value: "Cameras" },
  { key: "4", value: "Computers" },
  { key: "5", value: "Vegetables" },
  { key: "6", value: "Diary Products" },
  { key: "7", value: "Drinks" },
];

const AddProductsScreen = () => {
  const [selected, setSelected] = React.useState("");
  // let selected;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ weight: screenWidth * 0.9 }}>
        <InputPhoto />
        {fields.map((field) => (
          <InputField name={field} />
        ))}
        <SelectList
          setSelected={setSelected}
          data={data}
          searchPlaceholder="Виберіть класс"
          search={true}
          dropdownShown={false}
        />
        <SelectList
          setSelected={setSelected}
          data={data}
          searchPlaceholder="Виберіть класс"
          search={true}
          dropdownShown={false}
        />
        <SelectList
          setSelected={setSelected}
          data={data}
          placeholder={"Виберіть класс"}
          searchPlaceholder="Виберіть класс"
          search={true}
          dropdownShown={false}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>Додати товар</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.colorWhite,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Color.colorDarkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    // height: 40,
    // // weight: "100%",
    // // borderColor: Color.colorDarkBlue,
    // borderWidth: 1,
    // // width: "100%",
    // // borderRadius: 5,
    // // padding: 10,
    // marginVertical: 10,
  },
  buttontext: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_m,
    color: Color.colorWhite,
  },
});

export default AddProductsScreen;
