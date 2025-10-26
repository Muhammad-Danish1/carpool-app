import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import CustomInput from "@/src/components/ui/Input";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const countryCodes = [
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
];

const ChangeNumber = () => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState<"input" | "verify">("input");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const otpInputRefs = [
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
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleGetCode = () => {
    // TODO: Implement phone verification logic
    setCurrentStep("verify");
    Keyboard.dismiss();
  };

  const handleResend = () => {
    // TODO: Implement resend logic
    setOtp(["", "", "", ""]);
    router.back();
  };

  // Step 1: Phone Number Input
  if (currentStep === "input") {
    return (
      <SafeAreaWrapper
        backgroundColor="#FFFFFF"
        statusBarStyle="dark-content"
        edges={["top"]}
      >
        {/* Header */}
        <View
          style={{
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F9FAFB",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#374151" />
            </TouchableOpacity>
            <View style={{ width: 40, height: 40, borderRadius: 20 }} />
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "#F9FAFB",
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 40,
            paddingBottom: 30,
            flexGrow: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Change Phone Number
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 20,
                textAlign: "center",
                paddingHorizontal: 10,
              }}
            >
              Enter the new phone number to which you want to transfer this
              account
            </Text>

            <View style={{ marginTop: 40 }}>
              <CustomInput
                leftComponent={
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 4,
                    }}
                    onPress={() => {
                      // TODO: Open country selector
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{selectedCountry.flag}</Text>
                    <Entypo name="chevron-down" size={20} color="gray" />
                  </TouchableOpacity>
                }
                placeholder={`${selectedCountry.code} (000) 000-00-00`}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <CustomButton
                title="Get Code"
                onPress={handleGetCode}
                variant="filled"
                size="w-full"
                style={{ backgroundColor: "#000000", paddingVertical: 20 }}
                disabled={phoneNumber.length < 10}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaWrapper>
    );
  }

  // Step 2: OTP Verification
  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={{
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F9FAFB",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setCurrentStep("input")}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: "#F9FAFB",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 30,
          flexGrow: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Get Code
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 20,
              textAlign: "center",
              paddingHorizontal: 10,
            }}
          >
            Enter the verification code sent to the phone number{" "}
            <Text style={{ color: "#111827", fontWeight: "600" }}>
              {selectedCountry.code}
              {phoneNumber}
            </Text>
          </Text>

          {/* OTP Input */}
          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpInputRefs[index]}
                  style={{
                    width: 64,
                    height: 64,
                    borderWidth: 1,
                    borderColor: digit ? "#111827" : "#E5E7EB",
                    borderRadius: 25,
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "600",
                    color: "#111827",
                    backgroundColor: "white",
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                />
              ))}
            </View>
            <CustomButton
              title="Resend OTP"
              onPress={handleResend}
              variant="filled"
              size="w-full"
              style={{ backgroundColor: "#000000", paddingVertical: 20 }}
              disabled={otp.some((digit) => digit === "")}
            />
          </View>

          <Text
            style={{
              fontSize: 13,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 20,
              maxWidth: 300,
              marginHorizontal: "auto",
              marginTop: 16,
            }}
          >
            Did not receive the code? You can request the code again through{" "}
            <Text style={{ color: "#111827", fontWeight: "500" }}>0:42</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ChangeNumber;
