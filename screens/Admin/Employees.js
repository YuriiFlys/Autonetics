import React from "react";
import { StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text, View,FlatList} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import UserComponent from "../../components/User";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EmployeesList = ({ employees }) => {
  const navigator = useNavigation();
  return (
    <FlatList
      data={employees}
      renderItem={({ item: employee, index }) => (
        <View style={styles.EmployeesList}>
          <TouchableOpacity
          onPress={() => navigator.navigate("ManageEmployee",{employee})}
          >
          <UserComponent
            userName={employee.userName}
            profileImage={employee.profileImage}
            description={employee.description}
            imageSize={0.23}
          />
          </TouchableOpacity>
          <GrayLine />
        </View>
      )}
      keyExtractor={(employee, index) => index.toString()}
    />
  );
};

const employees = [
    {
      userName: "Ростислав Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Директор",
    },
    {
      userName: "Марія Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Менеджер",
    },
    {
      userName: "Іван Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Менеджер",
    },
    {
      userName: "Ірина Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Менеджер",
    },
    {
      userName: "Олександра Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description:"Касир",
    },
    {
      userName: "Олександр Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Охоронець",
    },
    {
      userName: "Василь Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Охоронець",
    },
    {
      userName: "Ігор Пастернак",
      profileImage: "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      description: "Маркетолог",
    }
  ];

const Employees = (props) => {
    const user = props.user;
    const navigator = useNavigation();
    const [profileImage, setImage] = React.useState(null);
    const [userName, setUserName] = React.useState("");
    return (
    <SafeAreaView style={styles.container}>
        
    <Logo name="Працівники"/>
    <EmployeesList employees={employees} /> 
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    EmployeesList: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
    },
  });
export default Employees;