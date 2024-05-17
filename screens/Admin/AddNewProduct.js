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
import ProductInfo from "../ProductInfo";

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
const supplierField = [
  // "Email",
  "Банкіський акаунт",
  "Ім'я",
  "Телефонний номер",
];
const dataField = ["Тип продукту", "Країна виробник", "Клас", "Постачальник"];

const AddProductsScreen = () => {
  const navigator = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [newSupplier, setNewSupplier] = useState({});
  const [alldSupplier, setAlldSupplier] = useState([]);
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
        const supplierData = await loadData("supplier");
        setAlldSupplier(supplierData);
        const mappedSupplier = supplierData.map((item) => ({
          key: item.id,
          value: item.email,
        }));
        setSupplier(mappedSupplier);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const sendData = async (url, body) => {
    console.log("Send data", body);
    console.log("URL", url);
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
  };
  const createProduct = async () => {
    console.log("newProduct", newProduct);
    try {
      if (newProduct["Тип продукту"] < 0) {
        const typeData = {
          name: categories.find(
            (item) => item.key === newProduct["Тип продукту"]
          ).value,
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
      if (newProduct["Постачальник"] < 0) {
        const typeData = {
          ...newSupplier,
          name: categories.find(
            (item) => item.key === newProduct["Постачальник"]
          ).value,
        };
        const supplier_id = await sendData("supplier", typeData).id;
        setData("Постачальник", supplier_id);
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
      navigator.navigate("ProductInfo", { id: res.id });
    } catch (error) {
      console.error("Error while sending data", error);
    }
  };
  const setData = (name, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const setSupplierData = (name, value) => {
    setNewSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newSupplier);
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
        <InputList
          name={dataField[3]}
          data={supplier}
          setSelected={(val) => {
            setData(dataField[3], val);
            if (val > 0) {
              const newSupplier = alldSupplier.find((item) => val === item.id);
              setNewSupplier({
                "Ім'я": newSupplier.name,
                "Банкіський акаунт": newSupplier.bankAccount,
                "Телефонний номер": newSupplier.phoneNumber,
              });
            } else {
              const newSupplier = supplierField.reduce((acc, item) => {
                acc[item] = "";
                return acc;
              }, {});

              setNewSupplier(newSupplier);
            }
          }}
          isAdded={true}
        />
        {newSupplier ? (
          <>
            {supplierField.map((field) => (
              <InputField
                name={field}
                setData={setSupplierData}
                data={newSupplier[field]}
              />
            ))}
          </>
        ) : null}

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
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: Color.colorDarkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: "5%",
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
