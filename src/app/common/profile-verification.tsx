import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type VerificationStep = "intro" | "passport" | "selfie" | "progress";

const ProfileVerificationScreen = () => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState<VerificationStep>("intro");
  const [passportImage, setPassportImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);

  const handleTakePassportPhoto = () => {
    // In real app, this would open camera
    setPassportImage("passport-captured");
    setCurrentStep("selfie");
  };

  const handleTakeSelfiePhoto = () => {
    // In real app, this would open camera
    setSelfieImage("selfie-captured");
    setCurrentStep("progress");
  };

  const renderIntroScreen = () => (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introContent}>
          <Text style={styles.title}>Profile Verification</Text>
          <Text style={styles.description}>
            Verifying your identity with your passport greatly enhances your
            profile and increases trust with other users, making it easier to
            find rides and ensuring booking approvals.
          </Text>

          <View style={{ flexDirection: "row", gap: 6 }}>
            <View
              style={{
                flex: 1,

                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                gap: 16,
              }}
            >
              <View style={styles.stepIconContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={32}
                  color="#9CA3AF"
                />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Step 1</Text>
                <Text style={styles.stepDescription}>Take passport photo</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                gap: 16,
              }}
            >
              <View style={styles.stepIconContainer}>
                <Ionicons name="camera-outline" size={32} color="#9CA3AF" />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Step 2</Text>
                <Text style={styles.stepDescription}>Take a selfie</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          onPress={() => setCurrentStep("passport")}
          title="Continue"
          size="w-full"
          textStyle={{
            color: "#FFFFFF",
          }}
          style={{
            backgroundColor: "#000000",
            paddingVertical: 16,
          }}
        />
        {/* <TouchableOpacity
          style={styles.continueButton}
          onPress={() => setCurrentStep("passport")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const renderPassportScreen = () => (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoContent}>
          <View style={styles.photoPreview}>
            {passportImage ? (
              <View style={styles.capturedImagePlaceholder}>
                <Ionicons name="document-text" size={80} color="#3B82F6" />
                <Text style={styles.capturedText}>Passport Captured</Text>
              </View>
            ) : (
              <View style={styles.passportPlaceholder}>
                <Image
                  source={require("@/src/assets/images/icon.png")}
                  style={styles.passportIcon}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          <Text style={styles.stepLabel}>Step 1</Text>
          <Text style={styles.photoTitle}>
            Take a photo of your passport page
          </Text>
          <Text style={styles.photoDescription}>
            To do this, position your passport camera so that your passport
            photo is visible. Make sure the entire page is in the frame. When
            you&apos;re ready, take the photo.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          onPress={handleTakePassportPhoto}
          title="Take Photo"
          size="w-full"
          textStyle={{
            color: "#FFFFFF",
          }}
          style={{
            backgroundColor: "#000000",
            paddingVertical: 16,
          }}
        />
      </View>
    </View>
  );

  const renderSelfieScreen = () => (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoContent}>
          <View style={styles.photoPreview}>
            {selfieImage ? (
              <View style={styles.capturedImagePlaceholder}>
                <Ionicons name="person-circle" size={80} color="#3B82F6" />
                <Text style={styles.capturedText}>Selfie Captured</Text>
              </View>
            ) : (
              <View style={styles.selfiePlaceholder}>
                <View style={styles.selfieCircle}>
                  <Ionicons name="person" size={80} color="#9CA3AF" />
                </View>
              </View>
            )}
          </View>
          <Text style={styles.stepLabel}>Step 2</Text>
          <Text style={styles.photoTitle}>Take a selfie to verify</Text>
          <Text style={styles.photoDescription}>
            Take a selfie to verify that it&apos;s you. Position your face in
            the center of the circle and make sure it&apos;s well lit. When
            you&apos;re ready, take the photo.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          onPress={handleTakeSelfiePhoto}
          title="Take Photo"
          size="w-full"
          textStyle={{
            color: "#FFFFFF",
          }}
          style={{
            backgroundColor: "#000000",
            paddingVertical: 16,
          }}
        />
        {/* <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={handleTakeSelfiePhoto}
        >
          <Text style={styles.takePhotoButtonText}>Take Photo</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const renderProgressScreen = () => (
    <View style={styles.container}>
      <View style={styles.progressContent}>
        <Text style={styles.progressTitle}>Verification in progress</Text>
        <Text style={styles.progressDescription}>
          Your verification process has started. We&apos;ll notify you once
          it&apos;s complete. This can take a few hours, so you can close this
          screen and return to your personal account.
        </Text>

        <View style={{ flex: 1, width: "100%", gap: 6 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 6,
              paddingRight: 16,
              backgroundColor: "#fff",
              borderRadius: 50,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F5F6F8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="clock-circle" size={20} color="#374151" />
              </View>

              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
              >
                Passport check in progress
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 6,
              paddingRight: 16,
              backgroundColor: "#fff",
              borderRadius: 50,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#F5F6F8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="clock-circle" size={20} color="#374151" />
              </View>

              <Text
                style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
              >
                Selfie check in progress
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          onPress={() => router.replace("/profile")}
          title="Go to Profile"
          size="w-full"
          textStyle={{
            color: "#FFFFFF",
          }}
          style={{
            backgroundColor: "#000000",
            paddingVertical: 16,
          }}
        />
      </View>
    </View>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "intro":
        return renderIntroScreen();
      case "passport":
        return renderPassportScreen();
      case "selfie":
        return renderSelfieScreen();
      case "progress":
        return renderProgressScreen();
      default:
        return renderIntroScreen();
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={false}
      edges={["top"]}
    >
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (currentStep === "intro") {
                router.back();
              } else if (currentStep === "passport") {
                setCurrentStep("intro");
              } else if (currentStep === "selfie") {
                setCurrentStep("passport");
              } else {
                router.back();
              }
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentStep !== "intro"
              ? currentStep === "progress"
                ? "Verification Status"
                : "Profile Verification"
              : undefined}
          </Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {renderContent()}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Intro Screen
  introContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 32,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  stepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // Photo Screens
  photoContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  photoPreview: {
    width: "100%",
    aspectRatio: 1,
    // maxWidth: 300,
    marginBottom: 32,
  },
  passportPlaceholder: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  passportIcon: {
    width: 150,
    height: 150,
  },
  selfiePlaceholder: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  selfieCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  capturedImagePlaceholder: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  capturedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  photoDescription: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    textAlign: "center",
  },

  // Progress Screen
  progressContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    // alignItems: "center",
  },
  progressIconContainer: {
    marginBottom: 32,
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  progressDescription: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 40,
  },
  checklistContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checklistIconChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  checklistIconUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  checklistDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  checklistText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  checklistTextInactive: {
    fontSize: 15,
    fontWeight: "500",
    color: "#9CA3AF",
  },

  // Success Screen
  successContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  successIconContainer: {
    position: "relative",
    marginBottom: 32,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  successBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  successDescription: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    textAlign: "center",
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    gap: 12,
  },
  continueButton: {
    backgroundColor: "#000000",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  takePhotoButton: {
    backgroundColor: "#000000",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default ProfileVerificationScreen;
