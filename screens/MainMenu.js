import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const MainMenu = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.view}>
      <View style={[styles.view1, styles.iconPosition]}>
        <View style={[styles.child, styles.childShadowBox]} />
        <Pressable
          style={[styles.pressable, styles.pressableLayout]}
          onPress={() => {}}
        >
          <View style={[styles.item, styles.itemBorder]} />
          <Text style={[styles.text, styles.textTypo2]}>Магазин Ашан</Text>
          <Text style={[styles.text1, styles.textClr]}>
            Вул Шевченка 100, Львівська обл, 79888
          </Text>
          <Image
            style={styles.ashanMin1Icon}
            contentFit="cover"
            source={require("../assets/ashanmin-1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.pressable1, styles.pressableLayout]}
          onPress={() => {}}
        >
          <View style={[styles.item, styles.itemBorder]} />
          <Text style={[styles.text2, styles.textTypo1]}>Магазин Сільпо</Text>
          <Text style={[styles.text3, styles.textTypo1]}>
            Вул Шевченка 235, Львівська обл, 79888
          </Text>
          <Image
            style={styles.silpoOutlineLogo1Icon}
            contentFit="cover"
            source={require("../assets/silpo-outline-logo-1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.pressable2, styles.pressableLayout]}
          onPress={() => {}}
        >
          <View style={[styles.item, styles.itemBorder]} />
          <Image
            style={[styles.atb5005001Icon, styles.text4Position]}
            contentFit="cover"
            source={require("../assets/atb500500-1.png")}
          />
          <Text style={[styles.text4, styles.text4Position]}>Магазин АТБ</Text>
          <Text style={[styles.text5, styles.textTypo1]}>
            Вул Шевченка 234, Львівська обл, 79888
          </Text>
        </Pressable>
      </View>
      <Image
        style={[styles.icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/menu.png")}
      />
      <View style={styles.view2}>
        <View style={[styles.view3, styles.view3Layout]}>
          <View style={[styles.child1, styles.childPosition]} />
          <Text style={[styles.text6, styles.textTypo2]}>Пошук магазину</Text>
        </View>
        <View style={[styles.view4, styles.view4Layout]}>
          <View style={[styles.child2, styles.view4Layout]} />
          <Text style={[styles.text7, styles.textTypo2]}>Пошук</Text>
        </View>
      </View>
      <View style={styles.view5}>
        <View style={[styles.view6, styles.view6Layout]}>
          <View style={[styles.lineView, styles.child3Position]} />
          <Text style={[styles.text8, styles.qrTypo]}>Список магазинів</Text>
        </View>
        <Pressable style={styles.pressable3} onPress={() => {}}>
          <View style={[styles.child3, styles.child3Position]} />
          <Text style={styles.text9}>Карта</Text>
        </Pressable>
        <Pressable
          style={[styles.qrCode, styles.view6Layout]}
          onPress={() => navigator.navigate("Scanner")}
        >
          <View style={[styles.child3, styles.child3Position]} />
          <Text style={[styles.qr, styles.qrTypo]}>QR Код магазину</Text>
        </Pressable>
      </View>
      <View style={[styles.view7, styles.view7Layout]}>
        <Text style={[styles.text10, styles.textTypo2]}>Список Магазинів</Text>
        <Image
          style={[styles.logoIcon, styles.view7Layout]}
          contentFit="cover"
          source={require("../assets/logo1.png")}
        />
      </View>
      <View style={[styles.child4, styles.childShadowBox]} />
      <Text style={[styles.text11, styles.textTypo]}>450м</Text>
      <Text style={[styles.text12, styles.textTypo]}>450м</Text>
      <Text style={[styles.text13, styles.textTypo]}>450м</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  childShadowBox: {
    height: 1,
    width: 431,
    borderTopWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  pressableLayout: {
    height: 127,
    width: 378,
    position: "absolute",
  },
  itemBorder: {
    borderWidth: 2,
    borderColor: Color.colorSilver,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  textTypo2: {
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  textClr: {
    color: Color.colorSilver,
    fontSize: FontSize.size_2xs,
    position: "absolute",
  },
  textTypo1: {
    left: 118,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
  },
  text4Position: {
    top: 31,
    position: "absolute",
  },
  view3Layout: {
    width: 286,
    height: 42,
    position: "absolute",
  },
  childPosition: {
    borderRadius: Border.br_base,
    top: 0,
    left: 0,
  },
  view4Layout: {
    height: 37,
    width: 83,
    position: "absolute",
  },
  view6Layout: {
    height: 31,
    width: 131,
    top: 0,
    position: "absolute",
  },
  child3Position: {
    height: 3,
    width: 134,
    borderTopWidth: 3,
    left: -1,
    top: -1,
    borderStyle: "solid",
    position: "absolute",
  },
  qrTypo: {
    fontSize: FontSize.size_sm,
    top: 6,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  view7Layout: {
    height: 51,
    position: "absolute",
  },
  textTypo: {
    height: 30,
    width: 53,
    fontSize: FontSize.size_xs,
    left: 336,
    color: Color.colorSilver,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  child: {
    top: 706,
  },
  item: {
    borderRadius: Border.br_11xl,
    top: 0,
    height: 127,
    width: 378,
    position: "absolute",
    left: 0,
  },
  text: {
    top: 35,
    color: Color.colorBlack,
    fontSize: FontSize.size_base,
    left: 121,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    position: "absolute",
  },
  text1: {
    top: 64,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    left: 121,
  },
  ashanMin1Icon: {
    top: 24,
    width: 96,
    height: 72,
    left: 5,
    position: "absolute",
  },
  pressable: {
    top: 284,
    left: 26,
    width: 378,
  },
  text2: {
    top: 30,
    color: Color.colorBlack,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  text3: {
    top: 59,
    color: Color.colorSilver,
    fontSize: FontSize.size_2xs,
    position: "absolute",
  },
  silpoOutlineLogo1Icon: {
    top: 46,
    left: 11,
    width: 92,
    height: 36,
    position: "absolute",
  },
  pressable1: {
    top: 142,
    left: 26,
    width: 378,
  },
  atb5005001Icon: {
    left: 20,
    width: 66,
    height: 66,
  },
  text4: {
    left: 118,
    textAlign: "left",
    fontFamily: FontFamily.palanquinDarkRegular,
    color: Color.colorBlack,
    fontSize: FontSize.size_base,
  },
  text5: {
    top: 60,
    color: Color.colorSilver,
    fontSize: FontSize.size_2xs,
    position: "absolute",
  },
  pressable2: {
    top: 0,
    left: 26,
    width: 378,
  },
  view1: {
    top: 292,
    height: 706,
  },
  icon: {
    top: 865,
    height: 60,
  },
  child1: {
    width: 286,
    height: 42,
    position: "absolute",
    borderWidth: 2,
    borderColor: Color.colorSilver,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  text6: {
    top: 3,
    left: 17,
    fontSize: 20,
    color: Color.colorBlack,
    position: "absolute",
  },
  view3: {
    top: 0,
    left: 0,
  },
  child2: {
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_base,
    top: 0,
    left: 0,
  },
  text7: {
    top: 4,
    left: 14,
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  view4: {
    top: 2,
    left: 295,
  },
  view2: {
    top: 212,
    height: 42,
    width: 378,
    left: 26,
    position: "absolute",
  },
  lineView: {
    borderColor: Color.colorDarkslategray,
  },
  text8: {
    left: 5,
  },
  view6: {
    left: 131,
  },
  child3: {
    borderColor: Color.colorGainsboro,
  },
  text9: {
    left: 43,
    top: 6,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.palanquinDarkRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  pressable3: {
    left: 262,
    width: 131,
    height: 35,
    top: 0,
    position: "absolute",
  },
  qr: {
    left: 8,
  },
  qrCode: {
    left: 0,
  },
  view5: {
    top: 148,
    left: 18,
    width: 393,
    height: 35,
    position: "absolute",
  },
  text10: {
    top: 11,
    left: 129,
    color: Color.colorBlack,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  logoIcon: {
    width: 42,
    top: 0,
    left: 0,
  },
  view7: {
    top: 66,
    left: 15,
    width: 271,
  },
  child4: {
    top: 272,
  },
  text11: {
    top: 389,
  },
  text12: {
    top: 673,
  },
  text13: {
    top: 531,
  },
  view: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorWhite,
  },
});

export default MainMenu;
