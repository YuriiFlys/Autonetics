import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { updateProfile } from "firebase/auth";
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { useRef } from "react";
import {format} from 'date-fns';
import { TouchableWithoutFeedback,Keyboard } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const Profile = () => {
  const navigator = useNavigation();
  const fullnameRef = React.useRef();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(' ');
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIREBASE_DB;
  

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, 'users', user.email);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          fullnameRef.current = userData.fullname;
          setEmail(userData.email);
          const birthdate = userData.birthdate;
          setDay(birthdate.day);
          setMonth(birthdate.month);
          setYear(birthdate.year);
        } else {
          console.log("No such document!");
        }
        
      });
    }
  }, []);

  const handleSave = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: fullnameRef.current,
      }).then(() => {
        const userDoc = doc(firestore, 'users', user.email);
        const birthdate = { day: day, month: month, year: year };

        setDoc(userDoc, { email: user.email, fullname: fullnameRef.current, birthdate: birthdate }, { merge: true })
          .then(() => {
            getUpdatedUserDataFromFirestore(userDoc);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      });
    }
    setIsEditing(false);
  }, [fullnameRef, day, month, year]);

  const getUpdatedUserDataFromFirestore = (userDoc) => {
    getDoc(userDoc).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        fullnameRef.current = userData.fullname;
        setEmail(userData.email);
        const birthdate = userData.birthdate;
        setDay(birthdate.day);
        setMonth(birthdate.month);
        setYear(birthdate.year);
      } else {
        console.log("No such document!");
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFullnameChange = useCallback((text) => {
    fullnameRef.current = text;
  }, []);

  const handleDateChange = useCallback((text, type) => {
    const num = parseInt(text, 10);
    if (type === 'day') {
      setDay(num);
    } else if (type === 'month') {
      setMonth(num);
    } else if (type === 'year') {
      setYear(num);
    }
  }, []);




  const MainInfo=({widgetname, sex})=>{
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainWidgetView}>
        <View style={styles.widgetInfoRow}>
        <View style={styles.mainWidgetLabel}>
          <Image
            style={{height: screenWidth*0.09, width: screenWidth*0.09}}
            contentFit="contain"
            source={require('../assets/account.png')}/>
          <Text style={styles.widgetProfileName}>{widgetname}</Text>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Ім'я та прізвище"}</Text>
          {isEditing ? (
          <TextInput
            style={styles.MainWidgetText}
            defaultValue={fullnameRef.current}
            onChangeText={handleFullnameChange}
            onSubmitEditing={handleSave}
            />
        ) : (
          <Text style={styles.MainWidgetText} onPress={handleEdit}>{fullnameRef.current}</Text>
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
                    handleDateChange(text, 'day');
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
                    handleDateChange(text, 'month');
                    setTimeout(() => yearRef.current.focus(), 0);
                  }
                  else if (text.length === 0) {
                    setMonth('');
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
                    handleDateChange(text, 'year');
                    
                  }
                  else if (text.length === 0) {
                    setYear('');
                    setTimeout(() => monthRef.current.focus(), 0);
                  }
                }}
                
              />
            </View>
          ) : (
            <Text style={styles.MainWidgetText} onPress={handleEdit}>
              {format(new Date(year, month - 1, day), 'dd.MM.yyyy')}
            </Text>
          )}
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{"Стать "}</Text>
          {isEditing ? (
            
          <TextInput
            style={styles.MainWidgetText}
            defaultValue={"Чоловіча"}
            onChangeText={handleFullnameChange}
            onSubmitEditing={handleSave}
            />
            
        ) : (
          <Text style={styles.MainWidgetText} onPress={handleEdit}>{"Чоловіча"}</Text>
        )}
        </View>
        <Text style={styles.MainWidgetText}
        onPress={handleSave}>{"Зберегти зміни "}</Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  const ContactsWidget=({widgetname, phone, email})=>{
    return (
      <View style={styles.ContactsWidgetView}>
        <View style={styles.widgetInfoRow}>
          <View style={styles.mainWidgetLabel}>
          <Image
            style={{height: screenWidth*0.08, width: screenWidth*0.08}}
            contentFit="contain"
            source={require('../assets/telephone.png')}/>
          <Text style={styles.widgetProfileName}>{widgetname}</Text>
          </View>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{phone}</Text>
          <View style={styles.sepLine}></View>
          <Text style={styles.MainWidgetText}>{email}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style ={[styles.container]}>
      <Text style={styles.labelText}>Профіль </Text>
      <TouchableOpacity
        style={styles.logoIcon}
        onPress={() => navigator.navigate('Home', { screen: 'Головне меню' })}>
        <Image
          style={styles.logoIcon}
          contentFit="contain"
          source={require("../assets/logo1.png")}
        />
      </TouchableOpacity>
      <MainInfo
        widgetname={"Персональні дані"}
        fullname={fullnameRef}
        sex={"Чоловіча"}
      />
      <ContactsWidget
        widgetname={"Контакти"}
        phone={"+380123456789"}
        email={email}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  labelText: {
    position: 'absolute',
    top: screenHeight*0.1,
    fontFamily: 'PalanquinDark-Regular',
    fontSize: 18,
    color: '#404040',
  },
  logoIcon: {
    alignSelf: 'center',
    height: screenWidth*0.1299,
    width: screenWidth*0.1299,
    position: 'absolute',
    top: screenHeight*0.0446,
    left: screenWidth*0.04,
  },
  datepicker: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  mainWidgetView: {
    height: screenWidth * 0.7,
    width: screenWidth * 0.9,
    position: 'absolute',
    justifyContent: 'center',
    top: screenHeight * 0.35,
    left: screenWidth * 0.05,
    backgroundColor: '#fff',
    borderColor: '#lightgrey',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  widgetProfileName: {
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_xl,
    color: Color.black,
    textAlign: 'left',
    marginLeft: 10,
  },
  MainWidgetText: {
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_l,
    color: Color.black,
    textAlign: 'left',
    marginLeft: 10,
  },
  mainWidgetLabel: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  dateplaceholder: {
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_l,
    color: Color.grey,
    textAlign: 'left',
  },
  dateSeparator: {
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_l,
    color: Color.black,
    textAlign: 'left',
  },
  sepLine:{
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  ContactsWidgetView: {
    height: screenWidth * 0.4,
    justifyContent: 'center',
    width: screenWidth * 0.9,
    position: 'absolute',
    top: screenHeight * 0.7,
    left: screenWidth * 0.05,
    backgroundColor: '#fff',
    borderColor: '#lightgrey',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  
  },
});
export default Profile;
