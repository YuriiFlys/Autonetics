import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  View,
} from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import InputField from "../../components/InputField";
import InputPhoto from "../../components/InputPhoto";
import InputList from "../../components/InputList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProductInfo from "../ProductInfo";
import { Image } from "expo-image";
import ScannerCamera from "../../components/ScannerCamera";
import { jwtDecode } from "jwt-decode";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const fields = [
  "Назва товару",
  "Вихідна ціна",
  "Вхідна ціна",
  "Вага",
  // "Штрих-код",
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
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [newSupplier, setNewSupplier] = useState({});
  const [alldSupplier, setAlldSupplier] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const loadData = async (url) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://23.100.50.204:8080/api/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error while fetching data from ${url}`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await loadData("goods-type");
        setCategories(
          categoriesData.map((item) => ({ key: item.id, value: item.name }))
        );

        const countriesData = await loadData("location/countries");
        setCountries(
          countriesData.map((item) => ({ key: item.id, value: item.name }))
        );

        const classesData = await loadData("class");
        setClasses(
          classesData.map((item) => ({ key: item.id, value: item.name }))
        );

        const supplierData = await loadData("supplier");
        setAlldSupplier(supplierData);
        setSupplier(
          supplierData.map((item) => ({ key: item.id, value: item.email }))
        );
      } catch (error) {
        console.error("Error while fetching initial data:", error);
      }
    };

    fetchData();
  }, []);

  const sendData = async (url, body) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://23.100.50.204:8080/api/${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to send data to ${url}: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error while sending data to ${url}`, error);
    }
  };

  const createGoodsType = async (name) => {
    if (newProduct["Тип продукту"] < 0) {
      const typeData = {
        name: categories.find((item) => item.key === newProduct["Тип продукту"])
          .value,
      };
      const { id } = await sendData("goods-type", typeData);
      return id;
    }
    return newProduct["Тип продукту"];
  };

  const createClass = async (name) => {
    if (newProduct["Клас"] < 0) {
      const classData = {
        name: classes.find((item) => item.key === newProduct["Клас"]).value,
      };
      const { id } = await sendData("class", classData);
      return id;
    }
    return newProduct["Клас"];
  };

  const createSupplier = async (name) => {
    if (newProduct["Постачальник"] < 0) {
      const typeData = {
        phoneNumber: newSupplier["Телефонний номер"],
        name: newSupplier["Ім'я"],
        bankAccount: newSupplier["Банкіський акаунт"],
        email: supplier.find((item) => item.key === newProduct["Постачальник"])
          .value,
      };
      const { id } = await sendData("supplier", typeData);
      return id;
    }
    return newProduct["Постачальник"];
  };

  const createData = async () => {
    try {
      const goods_id = await createGoodsType();
      const class_id = await createClass();
      const supplier_id = await createSupplier();
      console.log("ID", goods_id, class_id, supplier_id);
      await createProduct(goods_id, class_id, supplier_id);
    } catch (error) {
      console.error("Error while sending data", error);
    }
  };

  const createProduct = async (goods_id, class_id, supplier_id) => {
    const productData = {
      priceIn: parseFloat(newProduct["Вхідна ціна"]),
      priceOut: parseFloat(newProduct["Вихідна ціна"]),
      weight: parseFloat(newProduct["Вага"]),
      rating: 5,
      goodsTypeId: goods_id,
      barcode: newProduct["Штрих код"],
      name: newProduct["Назва товару"],
      description: newProduct["Опис"],
      producer: newProduct["Виробник"],
      storageCondition: newProduct["Умови зберігання"],
      composition: newProduct["Вміст"],
      countryID: newProduct["Країна виробник"],
      classID: class_id,
      supplierID: supplier_id,
    };

    const res = await sendData("goods", productData);

    const token = await AsyncStorage.getItem("token");
    const email = jwtDecode(token).email;

    const employeeResponse = await fetch(
      `http://23.100.50.204:8080/api/staff/by-email/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!employeeResponse.ok) {
      throw new Error("Failed to fetch employee");
    }
    const employee = await employeeResponse.json();

    await sendData("inventories", {
      goodsID: res.id,
      shopID: employee.shopId,
      number: 0,
    });

    navigator.navigate("ProductInfo", { id: res.id });
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
  };

  const scanned = (data) => {
    closeModal();
    setData("Штрих код", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: screenWidth * 0.9 }}>
        <InputPhoto />
        {fields.map((field) => (
          <InputField key={field} name={field} setData={setData} />
        ))}
        <View style={{ width: screenWidth, alignItems: "center" }}>
          <InputField name={"Штрих код"} setData={setData} />
          <TouchableOpacity style={styles.searchBarcode} onPress={openModal}>
            <Image
              source={require("../../assets/Admin/barcode.svg")}
              style={styles.barcodeImage}
            />
            <Text>Відсканувати штрих коду</Text>
          </TouchableOpacity>
        </View>
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
          setSelected={(val) => setData(dataField[2], val)}
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
              setNewSupplier(
                supplierField.reduce((acc, item) => {
                  acc[item] = "";
                  return acc;
                }, {})
              );
            }
          }}
          isAdded={true}
        />
        {newSupplier ? (
          <>
            {supplierField.map((field) => (
              <InputField
                key={field}
                name={field}
                setData={setSupplierData}
                data={newSupplier[field]}
              />
            ))}
          </>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={createData}>
          <Text style={styles.buttonText}>Додати товар</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView>
          <ScannerCamera
            styleflashlight={{}}
            styleFrame={{ marginTop: screenHeight * 0.2 }}
            styleButtonScanner={{ marginTop: screenHeight * 0.1 }}
            isCross={true}
            handleScanned={scanned}
            onClose={closeModal}
          />
        </SafeAreaView>
      </Modal>
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
  },
  buttonText: {
    fontFamily: FontFamily.CommissioneMedium,
    fontSize: FontSize.size_m,
    color: Color.colorWhite,
  },
  searchBarcode: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 16,
    height: screenHeight * 0.05,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  barcodeImage: {
    height: "100%",
    width: "10%",
    contentFit: "contain",
    marginRight: 10,
  },
  productContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Color.colorLightGray,
    alignItems: "center",
  },
});

export default AddProductsScreen;
