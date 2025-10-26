import CustomInput from "@/src/components/ui/Input";
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import SwipeCustomButton from "@/src/components/ui/SwipButton";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const countryCodes = [
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+50", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+592", name: "Guyana", flag: "🇬🇾" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+594", name: "French Guiana", flag: "🇬🇫" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+596", name: "Martinique", flag: "🇲🇶" },
  { code: "+597", name: "Suriname", flag: "🇸🇷" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+599", name: "Netherlands Antilles", flag: "🇳🇱" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "+674", name: "Tuvalu", flag: "🇹🇻" },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+676", name: "Tonga", flag: "🇹🇴" },
  { code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { code: "+679", name: "Fiji", flag: "🇫🇯" },
  { code: "+680", name: "Marshall Islands", flag: "🇲🇭" },
  { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
  { code: "+682", name: "Cook Islands", flag: "🇨🇰" },
  { code: "+683", name: "Niue", flag: "🇳🇺" },
  { code: "+685", name: "Samoa", flag: "🇼🇸" },
  { code: "+686", name: "Kiribati", flag: "🇰🇮" },
  { code: "+687", name: "New Caledonia", flag: "🇳🇨" },
  { code: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { code: "+689", name: "French Polynesia", flag: "🇵🇫" },
  { code: "+690", name: "Tokelau", flag: "🇹🇰" },
  { code: "+691", name: "Micronesia", flag: "🇫🇲" },
  { code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
];

const SignInScreen = () => {
  React.useEffect(() => {
    router.replace("/(auth)/signin");
  }, []);

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 180,
  },
  titleText: {
    fontSize: 64,
    fontWeight: "500",
    color: "black",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 0,
  },
  flagContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  flagText: {
    fontSize: 24,
  },
  getCodeButton: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  getCodeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  arrowContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 20,
    maxWidth: "90%",
    alignSelf: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});

export default SignInScreen;
