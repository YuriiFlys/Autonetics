import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const getInitials = (name) => {
  try {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  } catch (error) {
    return "";
  }
};

const UserComponent = ({ userName, profileImage,imageSize, description }) => {
  return (
    <View style={styles.userData}>
      <View style={{...styles.userIcon, width: screenWidth* imageSize, height: screenWidth*imageSize }}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{...styles.userIconImage, width: screenWidth* imageSize, height: screenWidth*imageSize}}
          />
        ) : (
          <Text style={styles.userIconText}>{getInitials(userName)}</Text>
        )}
      </View>
      <View style={styles.userText}>
      <Text style={styles.userName}>{userName}</Text>
        {description && <Text style={styles.userDescription}>{description}</Text>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    userData: {
        width: screenWidth,
        height: screenHeight * 0.1,
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
        marginBottom:screenHeight * 0.01,
        marginTop:screenHeight * 0.01,
      },
      userIcon: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        borderRadius: 1000,
        backgroundColor: Color.colorWhite,
        left: screenWidth * 0.05,
        borderWidth: 2,
        borderColor: Color.colorLightGray,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Color.colorDarkBlue,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        
      },
      userIconImage: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: Color.colorLightGray,
      },
      userIconText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: Color.colorDarkBlue,
      },
      userText: {
        //Розмістити текст по центру по вертикалі
        
        width: screenWidth * 0.65,
        backgroundColor: Color.colorTransparent,
        justifyContent: 'center',
        marginLeft: screenWidth * 0.1,
        shadowColor: Color.colorDarkBlue,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      userName: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 21,
        color: Color.colorDarkBlue,
      },
      userDescription: {
        textAlign: "left",
        fontSize: 12,
        color: Color.colorLightGray,
        
      },
      
});

export default UserComponent;
