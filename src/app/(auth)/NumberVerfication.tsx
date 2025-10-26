import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import SwipeCustomButton from "@/src/components/ui/SwipButton";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const NumberVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleVerify = () => {
    // TODO: Implement OTP verification logic
    router.replace("/(user-onboarding)");
  };

  return (
    <SafeAreaWrapper
      backgroundColor="white"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Entypo name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Get Code</Text>
        <Text style={styles.subtitleText}>
          Enter the 4-digit code sent to your phone number{" "}
          <Text style={styles.phoneNumberText}> +7 (999) 999-99-99</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[styles.otpInput, digit ? styles.filledOtpInput : {}]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <SwipeCustomButton
          title="Verify"
          onPress={handleVerify}
          disabled={otp.some((digit) => digit === "")}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 24,
    zIndex: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 10,
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
  phoneNumberText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 16,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    textAlign: "center",
    fontSize: 24,
    color: "black",
  },
  filledOtpInput: {
    borderColor: "black",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  resendText: {
    color: "#6B7280",
    fontSize: 16,
  },
  timerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
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
  keypadContainer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  keypadButton: {
    width: 80,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  keypadText: {
    fontSize: 24,
    color: "black",
  },
});

export default NumberVerificationScreen;
