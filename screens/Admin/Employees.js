import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import UserComponent from "../../components/User";
import GrayLine from "../../components/GrayLine";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EmployeesList = ({ employees }) => {
  const navigator = useNavigation();
  const [data, setData] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleLoadEmployees();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLoadEmployees = async () => {
    setIsRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const email = jwtDecode(token).email;
      const responseEmployees = await fetch(
        "http://23.100.50.204:8080/api/staff/by-email/" + email,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!responseEmployees.ok) {
        throw new Error("Failed to fetch employees");
      }
      const employeesData = await responseEmployees.json();
      console.log("employeesData", employeesData);

      const response = await fetch(
        "http://23.100.50.204:8080/api/staff/by-shop/" + employeesData.shopId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shops");
      }
      const responseData = await response.json();
      console.log("responseDatar", responseData);
      const newData = responseData.map((item) => ({
        ...item,
        profileImage:
          "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      }));
      setData(newData);
    } catch (error) {
      console.error("Error while fetching shops:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <FlatList
      data={data}
      renderItem={({ item: employee, index }) => (
        <View style={styles.EmployeesList}>
          <TouchableOpacity
            onPress={() => navigator.navigate("ManageEmployee", { employee })}
          >
            <UserComponent
              userName={employee.firstName + " " + employee.lastName}
              profileImage={employee.profileImage}
              description={employee.staffType.name}
              imageSize={0.23}
            />
          </TouchableOpacity>
          <GrayLine />
        </View>
      )}
      keyExtractor={(employee, index) => index.toString()}
      refreshing={isRefreshing}
      onRefresh={handleLoadEmployees}
    />
  );
};

const Employees = (props) => {
  const user = props.user;
  const navigator = useNavigation();
  const [profileImage, setImage] = React.useState(null);
  const [userName, setUserName] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Працівники" />
      <EmployeesList />
    </SafeAreaView>
  );
};
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
