import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const carpoolComplaints = [
  "Unreliable ride matches",
  "fraud",
  "Late driver arrivals",
  "Payment issues",
  "Safety concerns with drivers",
  "fake",
  "App crashes or technical glitches",
  "Inaccurate GPS or navigation problems",
  "Poor communication between driver and rider",
  "Unclear pricing or hidden fees",
  "Uncomfortable or unsafe ride conditions",
  "Lack of customer support or slow response",
  "Safety concerns with drivers",
];

const ComplainScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Complain</Text>
          <View style={styles.placeholderView} />
        </View>
      </View>
      {/* Content */}
      <ScrollView
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: "#F5F6F8",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            What is the problem?
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {carpoolComplaints.map((item, index) => (
              <View
                key={index}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#111827" }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Describe the problem
          </Text>
          <TextInput
            placeholder="Describe the problem"
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              paddingHorizontal: 16,
              paddingVertical: 12,
              height: 100,
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              textAlignVertical: "top",
            }}
            multiline
            maxLength={500}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#9CA3AF"
            style={{ marginRight: 6 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#9CA3AF",
                fontWeight: "400",
              }}
            >
              our support team check and back to you soon.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
          paddingTop: 16,
        }}
      >
        <CustomButton
          title="Send a complaint"
          onPress={() => {}}
          size="w-full"
          style={{
            backgroundColor: "#000000",
            paddingVertical: 18,
          }}
          textStyle={{
            color: "#FFFFFF",
          }}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholderView: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  infoDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  quickSettingsCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 4,
  },
  quickSetting: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  quickSettingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  quickSettingContent: {
    flex: 1,
  },
  quickSettingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  quickSettingDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  quickSettingToggle: {
    marginLeft: 16,
  },
  settingsList: {
    gap: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  settingDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  settingToggle: {
    marginLeft: 16,
  },
  toggleOn: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    position: "relative",
    justifyContent: "center",
  },
  toggleOff: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    position: "relative",
    justifyContent: "center",
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    left: 22,
  },
  advancedOptions: {
    gap: 4,
  },
  advancedOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  advancedOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  advancedOptionContent: {
    flex: 1,
  },
  advancedOptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  advancedOptionDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F9FF",
    margin: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  infoNoteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoNoteText: {
    flex: 1,
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
});

export default ComplainScreen;
