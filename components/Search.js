import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Color } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";

const Search = ({ search }) => {
  const navigator = useNavigation();
  const [field, setField] = React.useState("");
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <TextInput
        style={styles.field}
        value={field}
        onChangeText={(text) => setField(text)}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          console.log("Search");
          search(field);
        }}
      >
        <Text style={styles.buttonSearch}>Пошук</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderWidth: 2,
    borderColor: "#B6B6B6",
    borderRadius: 16,
    height: screenHeight * 0.05,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    marginLeft: 10,
    width: screenWidth * 0.2,
    height: screenHeight * 0.05,
    backgroundColor: "#26364D",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSearch: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Search;
