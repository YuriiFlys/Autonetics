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
import { Color, FontFamily, FontSize } from "../GlobalStyles";
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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigator = useNavigation();
  const [initials, setInitials] = useState("");
  const fullnameRef = React.useRef();
  const [date, setDate] = useState(new Date());
  const phoneRef = useRef("");
  const [gender, setGender] = useState("Не вказано ");
  const [, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const emailRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setLoading] = React.useState(true);

  function getInitials(name) {
    try {
      const words = name.split(" ");
      const initials = words
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
      return initials;
    } catch (error) {
      return "";
    }
  }
  async function fetchData() {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    const decoded_jwt = jwtDecode(token);
    const role = decoded_jwt.role[0].authority;
    let res;
    try {
      if(role === "ROLE_CLIENT") {
        res = await axios.get(
          `http://23.100.50.204:8080/api/clients/by-email/${decoded_jwt.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.get(
          `http://23.100.50.204:8080/api/staff/by-email/${decoded_jwt.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      const userData = res.data;
      setUser(userData);
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
    if (user) {
      setGender(user.gender || "Не вказано");
      setDate(new Date(user.birthDate || Date.now()));
      phoneRef.current = user.phoneNumber
        ? user.phoneNumber.substring(4)
        : "Не вказано";
      emailRef.current = user.email || "";
      fullnameRef.current =
        user.firstName && user.lastName
          ? user.firstName + " " + user.lastName
          : "Не вказано";
      if (fullnameRef.current === "Не вказано") {
        setInitials(" ");
      } else {
        setInitials(getInitials(fullnameRef.current));
      }
    }
  }, [user]);



const handleMainSave = useCallback(async() => {  
  const UpdatedData = {
    "firstName": fullnameRef.current.split(" ")[0],
    "lastName": fullnameRef.current.split(" ")[1],
    "birthDate": format(date, "yyyy-MM-dd"),
    "gender": gender
  };

  try {
    const token = await AsyncStorage.getItem("token");
    const decoded_jwt = jwtDecode(token);
    const role = decoded_jwt.role[0].authority;
    if(role === "ROLE_CLIENT") {
      const response = await axios.patch(`http://23.100.50.204:8080/api/clients/${user.id}`, UpdatedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    }
    if(role === "ROLE_STAFF") {
      const response = await axios.patch(`http://23.100.50.204:8080/api/staff/${user.id}`, UpdatedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    }
    fetchData();
  } catch (error) {
    console.error(error);
  }

  setIsEditing(false);
}, [fullnameRef, date, gender]);

const handleContactSave = useCallback(async() => {
  const UpdatedData = {
    "phoneNumber": `+380${phoneRef.current}`
  };
  
  try {
    const token = await AsyncStorage.getItem("token");
    const decoded_jwt = jwtDecode(token);
    const role = decoded_jwt.role[0].authority;
    if(role === "ROLE_CLIENT") {
      const response = await axios.patch(`http://23.100.50.204:8080/api/clients/${user.id}`, UpdatedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    }
    if(role === "ROLE_STAFF") {
      const response = await axios.patch(`http://23.100.50.204:8080/api/staff/${user.id}`, UpdatedData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    }
    fetchData();
  } catch (error) {
    console.error(error);
  }

  setIsEditingContacts(false);
}, [phoneRef, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleContactEdit = () => {
    setIsEditingContacts(true);
  };

  const handleFullnameChange = useCallback((fullname) => {
    fullnameRef.current = fullname;
  }, []);
  const handlePhoneChange = useCallback((phone) => {
    phoneRef.current = phone;
  }, []);

  const genderlist = [
    { label: "Чоловіча", value: "Чоловіча" },
    { label: "Жіноча", value: "Жіноча" },
    { label: "Не вказано", value: "Не вказано" },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const MainInfo = ({ widgetname }) => {
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
              source={require("../assets/account.png")}
            />
            <Text style={styles.widgetProfileName}>{widgetname}</Text>
            <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
              <Image
                style={styles.editIcon}
                contentFit="contain"
                source={require("../assets/Profile/Settings.svg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Ім'я та прізвище"}</Text>
          {isEditing ? (
            <TextInput
              style={styles.EditedText}
              defaultValue={fullnameRef.current}
              onChangeText={handleFullnameChange}
            />
          ) : (
            <Text style={styles.EditedText}>{fullnameRef.current}</Text>
          )}
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText} onPress={showDatePicker}>
            {"Дата народження"}
          </Text>
          {isEditing ? (
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.dateplaceholder}>
                {format(date, "dd-MM-yyyy")}
              </Text>
              <View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  textColor="black"
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.EditedText}>{format(date, "dd-MM-yyyy")}</Text>
          )}
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>Стать</Text>
          {isEditing ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <RNPickerSelect
                style={{
                  inputIOS: styles.pickerText,
                  inputAndroid: styles.pickerText,
                }}
                onValueChange={(value) => setGender(value)}
                items={genderlist}
                placeholder={{}}
                value={gender}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "column" }}>
              <RNPickerSelect
                style={{
                  inputIOS: styles.pickerText,
                  inputAndroid: styles.pickerText,
                }}
                onValueChange={(value) => setGender(value)}
                items={genderlist}
                disabled={true}
                placeholder={{}}
                value={gender}
              />
            </View>
          )}
          {isEditing && <View style={styles.sepLine}></View>}
          {isEditing && (
            <TouchableOpacity styles={styles.saveIcon} onPress={handleMainSave}>
              <Image
                style={styles.saveIcon}
                contentFit="contain"
                source={require("../assets/tick.svg")}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const ContactsWidget = ({ widgetname }) => {
    return (
      <View style={styles.ContactsWidgetView}>
        <View style={styles.widgetInfoRow}>
          <View style={styles.mainWidgetLabel}>
            <Image
              style={{ height: screenWidth * 0.08, width: screenWidth * 0.08 }}
              contentFit="contain"
              source={require("../assets/telephone.png")}
            />
            <Text style={styles.widgetProfileName}>{widgetname}</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleContactEdit}
            >
              <Image
                style={styles.editIcon}
                contentFit="contain"
                source={require("../assets/Profile/Settings.svg")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Номер телефону"}</Text>
          <View style={styles.Phonenumber}>
            <Text style={styles.EditedText}>{"+380"}</Text>
            {isEditingContacts ? (
              <TextInput
                style={styles.EditedText}
                defaultValue={phoneRef.current}
                keyboardType="numeric"
                onChangeText={handlePhoneChange}
                maxLength={9}
              />
            ) : (
              <Text style={styles.EditedText}>{phoneRef.current}</Text>
            )}
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Електронна пошта"}</Text>
          <Text style={styles.EditedText}>{emailRef.current}</Text>
        </View>
        {isEditingContacts && <View style={styles.sepLine}></View>}
        {isEditingContacts && (
          <TouchableOpacity
            styles={styles.saveIcon}
            onPress={handleContactSave}
          >
            <Image
              style={styles.saveIcon}
              contentFit="contain"
              source={require("../assets/tick.svg")}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const SignOut = () => {
    const handleSignOut = async () => {
      await AsyncStorage.clear();
      navigator.navigate("StartMenu");
    };
    const confirmation = () => {
      Alert.alert("Вихід", "Чи справді ви хочете вийти?", [
        {
          text: "Ні",
          onPress: () => console.log("Відміна"),
          style: "cancel",
        },
        { text: "Так", onPress: () => handleSignOut() },
      ]);
    };
    return (
      <TouchableOpacity style={styles.SignOutView} onPress={confirmation}>
        <Text style={styles.SignOutText}>Вийти з аккаунту</Text>
      </TouchableOpacity>
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
                  <Text style={styles.userIconText}>{initials}</Text>
                )}
              </View>
              <MainInfo
                widgetname={"Персональні дані"}
                fullname={fullnameRef}
              />
              <ContactsWidget
                widgetname={"Контакти"}
                phone={"+380123456789"}
                email={emailRef.current}
              />
              <SignOut />
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
export default UserProfile;