import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Promotions = () => {
  const navigator = useNavigation();
  const MainWidget = ({ name, price, image, brand, description }) => {
    return (
      <View style={styles.mainWidgetView}>
        <View style={styles.widgetInfoRow}>
          <Text style={[styles.widgetProductMainInfo]}>{name}</Text>
          <Text style={styles.widgetProductMainInfo}>{price}</Text>
        </View>
        <View style={styles.widgetImageRow}>
          <View style={styles.widgetImageBox}>
            <Image source={image} style={styles.widgetProductImage} />
          </View>
          <View style={[styles.widgetImageBox]}>
            <Image source={brand} style={styles.widgetProductBrandLogo} />
          </View>
        </View>
        <View style={styles.widgetProductDescriptionContainer}>
          <Text style={styles.widgetProductDescription}>{description}</Text>
        </View>
      </View>
    );
  };
  const SmallWidget = ({ name, price, image, brand }) => {
    return (
      <View style={styles.smallWidgetView}>
        <View style={styles.smallWidgetInfoRow}>
          <Text style={[styles.widgetProductMainInfo]}>{name}</Text>
          <Text style={styles.widgetProductMainInfo}>{price}</Text>
        </View>
        <View style={styles.widgetImageRow}>
          <View style={styles.widgetImageBox}>
            <Image source={image} style={styles.widgetProductImage} />
          </View>
          <View style={[styles.widgetImageBox]}>
            <Image source={brand} style={styles.widgetProductBrandLogo} />
          </View>
        </View>
      </View>
    );
  };
  const scrollViewRef = useRef();
  return (
    <SafeAreaView style={[styles.container]}>
      <Logo name={"Акції"} />
      <ScrollView ref={scrollViewRef} automaticallyAdjustContentInsets={true}>
        <MainWidget
          name={"Банани"}
          price={"47.59₴"}
          image={require("../assets/bananas.jpeg")}
          brand={require("../assets/atb500.png")}
          description={"Банани - смачний та корисний фрукт, багатий на калій та вітаміни. Їх аромат та смак завжди радують. Ідеальний перекус для енергії!"}
        />
        <View style={styles.smallWidgets}>
          <SmallWidget
            name={"Пиво"}
            price={"34.95₴"}
            image={require("../assets/beer.png")}
            brand={require("../assets/blizenko.png")}
          />
          <SmallWidget
            name={"Пиво"}
            price={"34.95₴"}
            image={require("../assets/beer.png")}
            brand={require("../assets/blizenko.png")}
          />
        </View>
        <View style={styles.smallWidgets}>
          <SmallWidget
            name={"Пиво"}
            price={"34.95₴"}
            image={require("../assets/beer.png")}
            brand={require("../assets/blizenko.png")}
          />
          <SmallWidget
            name={"Пиво"}
            price={"34.95₴"}
            image={require("../assets/beer.png")}
            brand={require("../assets/blizenko.png")}
          />
        </View>

      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  mainWidgetView: {
    flexDirection: "column",
    width: screenWidth * 0.9,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  widgetInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  widgetProductMainInfo: {
    fontFamily: FontFamily.CommissioneBold,
    fontSize: 24,
    color: "#404040",
  },
  widgetImageRow: {
    flexDirection: "row",
    height: screenHeight * 0.15,
    justifyContent: "space-between",
  },
  widgetImageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  widgetProductImage: {
    flex: 1,
    width: "150%",
    contentFit: "contain",
  },
  widgetProductBrandLogo: {
    width: "30%",
    height: "30%",
  },
  widgetProductDescription: {
    fontFamily: FontFamily.Commissione,
    fontSize: 16,
    color: "#404040",
  },
  widgetProductDescriptionContainer: {
    width: "90%",
  },
  smallWidgets: {
    display: "flex",
    flexDirection: "row",
  },
  smallWidgetView: {
    flexDirection: "column",
    width: screenWidth * 0.43,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    overflow: "hidden",
    padding: 20,
    alignItems: "center",
    margin: screenWidth * 0.01,
  },
  smallWidgetInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
});
export default Promotions;
