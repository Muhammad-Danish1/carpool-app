import CustomInput from "@/src/components/ui/Input";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../components/ui/Button";
import SafeAreaWrapper from "../../components/ui/SafeAreaWrapper";

const UserOnboardingScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
  });

  const handleNext = () => {
    // Proceed to next screen or complete onboarding
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Personal Data</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>
              {formData.name ? formData.name.charAt(0) : "?"}
            </Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <CustomInput
            label="Name"
            value={formData.name}
            onChangeText={(text: string) =>
              setFormData({ ...formData, name: text })
            }
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputGroup}>
          <CustomInput
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChangeText={(text: string) =>
              setFormData({ ...formData, dateOfBirth: text })
            }
            placeholder="MM/DD/YYYY"
          />
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <CustomButton
          title="Continue"
          onPress={handleNext}
          variant="filled"
          size="w-full"
          style={styles.continueButton}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: "600",
    color: "#6B7280",
  },
  inputGroup: {
    gap: 16,
    marginBottom: 16,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  continueButton: {
    backgroundColor: "#000000",
  },
});

export default UserOnboardingScreen;
