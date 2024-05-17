import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { format, set } from "date-fns";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "react-native-axios";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ShopDetails = ({route}) => {
  const [shop, setShop] = useState(route.params.shop);
  const navigator = useNavigation();
  const shopNameRef = React.useRef();
  const [, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [ShopType, setShopType] = useState(null);
  const [adress, setAdress] = useState("");
  const [settlememt, setSettlement] = useState("");
  const [AdditionalType, setAdditionalType] = useState("");
  const [isParking, setIsParking] = useState(false);
  const [AtFloor, setAtFloor] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [isEditingAdditional, setIsEditingAdditional] = useState(false);

  
  async function fetchData() {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    const decoded_jwt = jwtDecode(token);
    try {
      const res = await axios.get(
        `http://23.100.50.204:8080/api/shops/${shop.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const shopData = res.data;
        setShop(shopData);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadData();
  }, []);
  

  useEffect(() => {
    if (shop) {
      shopNameRef.current = shop.name;
        setAdress(shop.address.name);
        setSettlement(shop.address.settlement.name);
        setShopType(shop.shopType.shopName);
        setAdditionalType(shop.additionalType);
        setIsParking(shop.isParking);
        setAtFloor(shop.atFloor);
    }
  }, [shop]);
  const handleMainSave = useCallback(async() => {  
    const UpdatedData = {
      name: shopNameRef.current,
    };
  
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.patch(`http://23.100.50.204:8080/api/shops/${shop.id}`, UpdatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  
    setIsEditing(false);
  }, [shopNameRef.current]);

  const handleAdditionalSave = useCallback(async() => {
    const UpdatedData = {
      isParking: isParking,
        atFloor: AtFloor,
    };
    try {
      const token = await AsyncStorage.getItem("token");
      
      const response = await axios.patch(`http://23.100.50.204:8080/api/shops/${shop.id}`, UpdatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  
    setIsEditingAdditional(false);
  }, [isParking, AtFloor]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleAdditionalEdit = () => {
    setIsEditingAdditional(true);
    };

  const handleShopnameChange = useCallback((shopname) => {
    shopNameRef.current = shopname;
  }, []);


  const IsParkingStatus = [
    { label: "Присутня", value: true },
    { label: "Відсутня", value: false },
  ];
  
  const floors = Array.from({length: 23}, (_, i) => i - 2);


  const MainDetailsWidget = ({ widgetname }) => {
    return isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainWidgetView}>
          <View style={styles.mainWidgetLabel}>
            <Image
              style={{
                height: screenWidth * 0.09,
                width: screenWidth * 0.09,
              }}
              contentFit="contain"
              source={require("../../assets/Admin/shop.svg")}
            />
            <Text style={styles.widgetProfileName}>{widgetname}</Text>
            <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
              <Image
                style={styles.editIcon}
                contentFit="contain"
                source={require("../../assets/Profile/Settings.svg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Назва магазину"}</Text>
          {isEditing ? (
            <TextInput
              style={styles.EditedText}
              defaultValue={shopNameRef.current}
              onChangeText={handleShopnameChange}
            />
          ) : (
            <Text style={styles.EditedText}>{shopNameRef.current}</Text>
          )}
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Місто"}</Text>
          <Text style={styles.EditedText}>{settlememt}</Text>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Адреса магазину"}</Text>
            <Text style={styles.EditedText}>{adress}</Text>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Тип магазину"}</Text>
          <Text style={styles.EditedText}>{ShopType}</Text>
          {isEditing && <View style={styles.sepLine}></View>}
          {isEditing && (
            <TouchableOpacity styles={styles.saveIcon} onPress={handleMainSave}>
              <Image
                style={styles.saveIcon}
                contentFit="contain"
                source={require("../../assets/tick.svg")}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const AdditionalDetailsWidget = ({ widgetname }) => {
    return (
      <View style={styles.ContactsWidgetView}>
        <View style={styles.widgetInfoRow}>
          <View style={styles.mainWidgetLabel}>
            <Image
              style={{ height: screenWidth * 0.08, width: screenWidth * 0.08 }}
              contentFit="contain"
              source={require("../../assets/telephone.png")}
            />
            <Text style={styles.widgetProfileName}>{widgetname}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleAdditionalEdit}
            >
              <Image
                style={styles.editIcon}
                contentFit="contain"
                source={require("../../assets/Profile/Settings.svg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Поверх"}</Text>
          {isEditingAdditional ? (
            <RNPickerSelect
            style={{
                inputIOS: styles.pickerText,
                inputAndroid: styles.pickerText,
                }}
                onValueChange={(value) => setAtFloor(Number(value))} 
                items={floors.map((item) => ({ label: item.toString(), value: item.toString() }))} 
                value={AtFloor.toString()} 
          />
            ) : (
                <Text style={styles.EditedText}>
                    {AtFloor}
                </Text>
                )
        }
          
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Парковка"}</Text>
            {isEditingAdditional ? (

                <RNPickerSelect
                    style={{
                    inputIOS: styles.pickerText,
                    inputAndroid: styles.pickerText,
                    }}
                    onValueChange={(value) => setIsParking(value)}
                    items={IsParkingStatus}
                    placeholder={{}}
                    value={isParking}
                />

            ) : (
                <Text style={styles.pickerText}>
                    {isParking ? 'Присутня' : 'Відсутня'}
                </Text>

            )}
        </View>
        {isEditingAdditional && <View style={styles.sepLine}></View>}
        {isEditingAdditional && (
          <TouchableOpacity
            styles={styles.saveIcon}
            onPress={handleAdditionalSave}
          >
            <Image
              style={styles.saveIcon}
              contentFit="contain"
              source={require("../../assets/tick.svg")}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };


  const scrollViewRef = useRef();
  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            automaticallyAdjustContentInsets={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
            }
          >
            <View style={styles.scrollView}>
              <View style={styles.userIcon}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.userIconImage} />
                ) : (
                  <Text style={styles.userIconText}>{"І Л"}</Text>
                )}
              </View>
              <MainDetailsWidget
                widgetname={"Основна інформація"}
                fullname={"Ім'я Прізвище"}
              />
              <AdditionalDetailsWidget
                widgetname={"Додаткова інформація"}
                phone={"+380123456789"}
                email={"lol"}
              />
              
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  datepicker: {
    flexDirection: "row",
  },
  userIcon: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 1000,
    backgroundColor: Color.colorLightCyan,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
  },
  userIconImage: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.35,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Color.colorLightGray,
  },
  userIconText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Color.colorDarkBlue,
    fontFamily: FontFamily.CommissioneBold,
  },
  mainWidgetView: {
    marginTop: screenHeight * 0.02,
    padding: 10,
    width: screenWidth * 0.9,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  Phonenumber: {
    flexDirection: "row",
  },
  SignOutView: {
    marginTop: screenHeight * 0.02,
    padding: 10,
    width: screenWidth * 0.9,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  SignOutText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: "red",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: screenHeight * 0.4,
    width: screenWidth * 0.6,
  },
  modalButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  modalLabel: {
    fontSize: 20,
    fontFamily: FontFamily.CommissioneBold,
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    fontFamily: FontFamily.CommissioneBold,
    textAlign: "center",
    color: "#404040",
  },
  widgetProfileName: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_xl,
    color: Color.black,
    textAlign: "left",
  },
  MainWidgetText: {
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_l,
    color: Color.black,
    textAlign: "left",
  },
  EditedText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_l,
    color: Color.black,
    textAlign: "left",
  },
  mainWidgetLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editIcon: {
    height: screenWidth * 0.09,
    width: screenWidth * 0.09,
  },
  saveIcon: {
    height: screenWidth * 0.09,
    width: screenWidth * 0.09,
    left: screenWidth * 0.72,
  },
  dateplaceholder: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_l,
    color: Color.grey,
    textAlign: "left",
  },
  dateSeparator: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_l,
    color: Color.black,
    textAlign: "left",
  },
  sepLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  ContactsWidgetView: {
    marginTop: screenHeight * 0.02,
    justifyContent: "center",
    padding: 10,
    width: screenWidth * 0.9,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  scrollView: {
    alignItems: "center",
  },
  pickerText: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: FontSize.size_l,
    color: Color.colorDarkBlue,
  },
});
export default ShopDetails;