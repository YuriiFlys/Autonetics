import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AdminWindow = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Window</Text>
      {/* Add your admin window content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default AdminWindow;
