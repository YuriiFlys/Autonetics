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
  "Вихідна ціна",
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
  const sendData = async (url, body) => {
    console.log("Send data", body);
    console.log("URL", url);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://23.100.50.204:8080/api/" + url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
      const responseData = await response.json();
      console.log("Response data", responseData);
      return responseData;
    } catch (error) {
      console.error("Error while sending data", error);
      throw error;
    }
  };
  const createProduct = async () => {
    console.log("newProduct", newProduct);
    if (newProduct["Тип продукту"] < 0) {
      const typeData = {
        name: categories.find((item) => item.key === newProduct["Тип продукту"])
          .value,
      };
      const class_id = await sendData("goods-type", typeData).id;
      setData("Тип продукту", class_id);
    }
    if (newProduct["Клас"] < 0) {
      const classData = {
        name: classes.find((item) => item.key === newProduct["Клас"]).value,
      };
      const type_id = await sendData("class", classData).id;
      setData("Клас", type_id);
    }
    const productData = {
      priceIn: parseFloat(newProduct["Вхідна ціна"]),
      priceOut: parseFloat(newProduct["Вихідна ціна"]),
      weight: parseFloat(newProduct["Вага"]),
      rating: 0,
      goodsTypeId: newProduct["Тип продукту"],
      barcode: parseInt(newProduct["Штрих-код"]),
      name: newProduct["Назва товару"],
      description: newProduct["Опис"],
      producer: newProduct["Виробник"],
      storageCondition: newProduct["Умови зберігання"],
      composition: newProduct["Вміст"],
      countryID: newProduct["Країна виробник"],
      classID: newProduct["Клас"],
      supplierID: 2, // ToDo
    };

    const res = await sendData("goods", productData);
    console.log("Response", res);
  };
  const setData = (name, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          setSelected={(val) => setData(dataField[0], val)}
          isAdded={true}
        />
        <InputList
          name={dataField[1]}
          data={countries}
          setSelected={(val) => setData(dataField[1], val)}
          isAdded={false}
        />
        <InputList
          name={dataField[2]}
          data={classes}
          setSelected={(val) => {
            setData(dataField[2], val);
          }}
          isAdded={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // console.log("newProduct", newProduct);
            // console.log("classes", classes);
            createProduct();
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
