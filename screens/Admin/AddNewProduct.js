import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import InputField from "../../components/InputField.js";
import InputPhoto from "../../components/InputPhoto.js";
import InputList from "../../components/InputList.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fields = [
  "Назва товару",
  "Вхідна ціна",
  "Вага",
  "Штрих-код",
  "Опис",
  "Виробник",
  "Умови зберігання",
  "Вміст",
];
const dataField = ["Тип продукту", "Країна виробник", "Клас"];

const AddProductsScreen = () => {
  const navigator = useNavigation();
  ``;
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const loadData = async (url) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://23.100.50.204:8080/api/" + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data url: " + url);
      }
      const responseData = await response.json();
      // console.log("Response data", responseData);
      return responseData;
    } catch (error) {
      console.error("Error while fetching", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await loadData("goods-type");
        const mappedCategories = categoriesData.map((item, index) => ({
          key: item.id,
          value: item.name,
        }));

        setCategories(mappedCategories);

        const countriesData = await loadData("location/countries");
        const mappedCountries = countriesData.map((item) => ({
          key: item.id,
          value: item.name,
        }));

        setCountries(mappedCountries);

        const classesData = await loadData("class");
        const mappedClasses = classesData.map((item) => ({
          key: item.id,
          value: item.name,
        }));
        setClasses(mappedClasses);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const setData = (name, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("New product", newProduct);
  };
  useEffect(() => {
    setData(dataField[0], selectedCategories);
  }, [selectedCategories]);
  useEffect(() => {
    setData(dataField[1], selectedCountries);
  }, [selectedCountries]);
  useEffect(() => {
    setData(dataField[2], selectedClasses);
  }, [selectedClasses]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedCountries, setSelectedCountries] = useState("");
  const [selectedClasses, setSelectedClasses] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ weight: screenWidth * 0.9 }}>
        <InputPhoto />
        {fields.map((field) => (
          <InputField name={field} setData={setData} />
        ))}
        <InputList
          name={dataField[0]}
          data={categories}
          setSelected={setSelectedCategories}
          isAdded={true}
        />
        <InputList
          name={dataField[1]}
          data={countries}
          setSelected={setSelectedCountries}
          isAdded={false}
        />
        <InputList
          name={dataField[2]}
          data={classes}
          setSelected={(val) => {
            setData(dataField[2], val);
          }}
          // isAdded={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("newProduct", newProduct);
            console.log("classes", classes);
          }}
        >
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
