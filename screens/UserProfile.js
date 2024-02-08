import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { format, set } from "date-fns";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Logo from "../components/Logo";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UserProfile = (props) => {
  const user = props.user;

  const navigator = useNavigation();
  const [initials, setInitials] = useState("");
  const fullnameRef = React.useRef();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(" ");
  const phoneRef = useRef("123456789");
  const [gender, setGender] = useState("Не вказано ");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const emailRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContacts, setIsEditingContacts] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIREBASE_DB;

  function getInitials(fullName) {
    const names = fullName.split(" ");
    let initials = names.map((name) => name.charAt(0).toUpperCase());
    return initials.join("");
  }

  useEffect(() => {
    if (user) {
      const dateparts = user.birthDate.split("-");
      const [year, month, day] = dateparts.map((part) => parseInt(part, 10));
      console.log("Dateparts: ", year, month, day);
      setInitials(getInitials(user.firstName + " " + user.lastName));
      setGender(user.gender);
      setDay(day);
      setMonth(month);
      setYear(year);
      phoneRef.current = user.phoneNumber.substring(4);
      emailRef.current = user.email;
      fullnameRef.current = user.firstName + " " + user.lastName;
      const date = new Date(`${year}-${month}-${day}`); //Convert to date object
      //console.log(date.toISOString().split('T')[0]);//Get the date in the format yyyy-mm-dd
    }
  }, [user]);

  useEffect(() => {
    if (fullnameRef.current) {
      setInitials(getInitials(fullnameRef.current));
    }
  }, [fullnameRef.current]);

  const handleContactSave = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(firestore, "users", emailRef.current);
      setDoc(
        userDoc,
        {
          phone: "+380" + phoneRef.current,
          email: emailRef.current,
        },
        { merge: true }
      )
        .then(() => {
          getUpdatedUserDataFromFirestore(userDoc);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
    setIsEditingContacts(false);
  }, [phoneRef]);

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

  const handleEmailChange = useCallback((email) => {
    emailRef.current = email;
  }, []);

  const handleDateChange = useCallback((text, type) => {
    const num = parseInt(text, 10);
    if (type === "day") {
      setDay(num);
    } else if (type === "month") {
      setMonth(num);
    } else if (type === "year") {
      setYear(num);
    }
  }, []);
  const GenderModal = ({ modalVisible, setModalVisible, setGender }) => {
    const handleGenderSelect = (selectedGender) => {
      setGender(selectedGender);
      setModalVisible(false);
    };

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>Оберіть стать</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Не вказано ")}
            >
              <Text style={styles.modalText}>Не вказано </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Чоловіча ")}
            >
              <Text style={styles.modalText}>Чоловіча </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleGenderSelect("Жіноча ")}
            >
              <Text style={styles.modalText}>Жіноча </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalText}>Скасувати </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const MainInfo = ({ widgetname }) => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainWidgetView}>
          <View style={styles.widgetInfoRow}>
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
            <Text style={styles.MainWidgetText}>{"Дата народження"}</Text>
            {isEditing ? (
              <View style={styles.datepicker}>
                <TextInput
                  ref={dayRef}
                  style={styles.dateplaceholder}
                  defaultValue={day.toString()}
                  placeholder="DD"
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => {
                    if (text.length === 2) {
                      handleDateChange(text, "day");
                      setTimeout(() => monthRef.current.focus(), 0);
                    }
                  }}
                />
                <Text style={styles.dateSeparator}>.</Text>
                <TextInput
                  ref={monthRef}
                  style={styles.dateplaceholder}
                  defaultValue={month.toString()}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => {
                    if (text.length === 2) {
                      handleDateChange(text, "month");
                      setTimeout(() => yearRef.current.focus(), 0);
                    } else if (text.length === 0) {
                      setMonth("");
                      setTimeout(() => dayRef.current.focus(), 0);
                    }
                  }}
                />
                <Text style={styles.dateSeparator}>.</Text>
                <TextInput
                  ref={yearRef}
                  style={styles.dateplaceholder}
                  defaultValue={year.toString()}
                  placeholder="YYYY"
                  keyboardType="numeric"
                  maxLength={4}
                  onChangeText={(text) => {
                    if (text.length === 4) {
                      handleDateChange(text, "year");
                    } else if (text.length === 0) {
                      setYear("");
                      setTimeout(() => monthRef.current.focus(), 0);
                    }
                  }}
                />
              </View>
            ) : (
              <Text style={styles.EditedText}>
                {format(new Date(year, month - 1, day), "dd.MM.yyyy")}
              </Text>
            )}
            <View style={styles.sepLine}></View>
            <Text style={styles.MainWidgetText}>{"Стать "}</Text>

            {isEditing ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={[styles.EditedText]}>{gender}</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "column" }}>
                <Text style={[styles.EditedText]}>{gender}</Text>
              </View>
            )}
            {isEditing && <View style={styles.sepLine}></View>}
            {isEditing && (
              <TouchableOpacity styles={styles.saveIcon}>
                <Image
                  style={styles.saveIcon}
                  contentFit="contain"
                  source={require("../assets/tick.svg")}
                />
              </TouchableOpacity>
            )}
            <GenderModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setGender={setGender}
            />
          </View>
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
          {isEditingContacts ? (
            <TextInput
              style={styles.EditedText}
              defaultValue={emailRef.current}
              onChangeText={handleEmailChange}
            />
          ) : (
            <Text style={styles.EditedText}>{emailRef.current}</Text>
          )}
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
    const handleSignOut = () => {
      auth.signOut().then(() => {
        navigator.navigate("StartMenu");
      });
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollViewRef} automaticallyAdjustContentInsets={true}>
          <View style={styles.scrollView}>
            <View style={styles.userIcon}>
              {image ? (
                <Image source={{ uri: image }} style={styles.userIconImage} />
              ) : (
                <Text style={styles.userIconText}>{initials}</Text>
              )}
            </View>
            <MainInfo widgetname={"Персональні дані"} fullname={fullnameRef} />
            <ContactsWidget
              widgetname={"Контакти"}
              phone={"+380123456789"}
              email={emailRef.current}
            />
            <SignOut />
          </View>
        </ScrollView>
      </SafeAreaView>
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
    marginTop: screenHeight * 0.02,
  },
});
export default UserProfile;
