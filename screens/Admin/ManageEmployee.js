import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  Switch,
} from "react-native";
import Logo from "../../components/Logo";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import UserComponent from "../../components/User";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Permission = ({ name, value }) => {
  const [switchStates, setSwitchStates] = useState(value);
  console.log("switchStates", switchStates);
  return (
    <View>
      <View style={styles.sepLine}></View>
      <View style={styles.row}>
        <Text style={styles.MainWidgetText}>{name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00FF00" }}
          thumbColor={switchStates ? "#f4f3f4" : "#f4f3f3"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            setSwitchStates(!switchStates);
          }}
          value={switchStates}
        />
      </View>
    </View>
  );
};

const Permissions = ({ widgetname, fields }) => {
  const [switchStates, setSwitchStates] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
  );

  const toggleSwitch = (field) => {
    const newState = !switchStates[field];
    setSwitchStates({ ...switchStates, [field]: newState });
    console.log(`Field: ${field}, State: ${newState}`);
  };
  console.log("switchStates", switchStates);

  return (
    <View style={styles.mainWidgetView}>
      <Text style={styles.widgetProfileName}>{widgetname}</Text>
      {Object.entries(switchStates).map(([key, value]) => (
        <Permission name={key} value={value} />
      ))}
    </View>
  );
};

const ManageEmployee = ({ route }) => {
  const { employee } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Logo name="Керування правами" />
      <UserComponent
        userName={employee.userName}
        profileImage={employee.profileImage}
        description={employee.description}
        imageSize={0.25}
      />

      <Permissions
        widgetname={"Права доступу"}
        fields={[
          "Продажа товару",
          "Доступ до складу",
          "Повернення товарів",
          "Списання товарів",
          "Аналіз даних",
        ]}
      />
      <Permissions
        widgetname={"Права адміністратора"}
        fields={["Керування магазином", "Керування персоналом"]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainWidgetView: {
    marginTop: screenHeight * 0.05,
    padding: 10,
    width: screenWidth * 0.9,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainWidgetLabel: {
    textAlign: "left",
  },
  widgetProfileName: {
    fontSize: FontSize.size_m,
    fontFamily: FontFamily.CommissioneBold,
    color: Color.colorDarkBlue,
  },
  sepLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  MainWidgetText: {
    fontFamily: FontFamily.CommissioneRegular,
    fontSize: FontSize.size_s,
    color: Color.black,
    textAlign: "left",
    marginTop: screenWidth * 0.02,
    marginBottom: screenWidth * 0.02,
  },
});

export default ManageEmployee;
