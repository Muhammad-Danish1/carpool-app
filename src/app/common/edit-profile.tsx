import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PreferenceGroupProps {
  title?: string;
  icon: React.ReactNode;
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const PreferenceGroup: React.FC<PreferenceGroupProps> = ({
  title,
  icon,
  options,
  selectedIndex,
  onSelect,
}) => {
  return (
    <View style={styles.preferenceContainer}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.preferenceGroup}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={styles.preferenceItem}
            onPress={() => onSelect(index)}
          >
            <View style={styles.preferenceContent}>
              <View style={styles.preferenceIcon}>{icon}</View>
              <Text style={styles.preferenceText}>{option}</Text>
            </View>
            <View style={styles.radioOuter}>
              {selectedIndex === index && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ProfileEditScreen = () => {
  const insets = useSafeAreaInsets();
  const [about, setAbout] = useState(
    "Hello! I'd be happy to share the trip! Please feel free to reach out if you're interested or have any questions."
  );
  const [musicPreference, setMusicPreference] = useState(0);
  const [smokingPreference, setSmokingPreference] = useState(0);
  const [petPreference, setPetPreference] = useState(0);
  const [chatPreference, setChatPreference] = useState(0);

  const musicOptions = [
    "Turn the music up!",
    "Depends on my mood",
    "I prefer silence",
  ];
  const smokingOptions = [
    "Smoking in my car is fine",
    "Allowed to smoke outside",
    "Prefer no smokers inside",
  ];
  const petOptions = [
    "I love pets!",
    "Depending on the pet",
    "Prefer trips without pets",
  ];
  const chatOptions = [
    "Happy to chat",
    "Not averse to chatting",
    "I prefer quiet",
  ];

  const handleReset = () => {
    setAbout(
      "Hello! I'd be happy to share the trip! Please feel free to reach out if you're interested or have any questions."
    );
    setMusicPreference(0);
    setSmokingPreference(0);
    setPetPreference(0);
    setChatPreference(0);
  };

  const handleApply = () => {
    // Here you would typically save the changes to a backend or local storage
    // For now, just navigate back
    router.back();
  };

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={false}
      edges={["top"]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Myself</Text>
          <TextInput
            value={about}
            onChangeText={setAbout}
            placeholder="Hello! I'd be happy to share the trip! Please feel free to reach out if you're interested or have any questions."
            style={styles.aboutInput}
            multiline
            maxLength={200}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <PreferenceGroup
          title="Music Preferences"
          icon={<Ionicons name="musical-notes" size={20} color="#6B7280" />}
          options={musicOptions}
          selectedIndex={musicPreference}
          onSelect={setMusicPreference}
        />

        <PreferenceGroup
          icon={<Ionicons name="cloud-outline" size={20} color="#6B7280" />}
          options={smokingOptions}
          selectedIndex={smokingPreference}
          onSelect={setSmokingPreference}
        />

        <PreferenceGroup
          icon={<Ionicons name="paw-outline" size={20} color="#6B7280" />}
          options={petOptions}
          selectedIndex={petPreference}
          onSelect={setPetPreference}
        />

        <PreferenceGroup
          icon={
            <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
          }
          options={chatOptions}
          selectedIndex={chatPreference}
          onSelect={setChatPreference}
        />
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom,
          paddingTop: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <CustomButton
          title="Reset"
          onPress={handleReset}
          size="sm"
          style={{
            flex: 1,
            paddingVertical: 18,
            paddingHorizontal: 0,
          }}
        />
        <CustomButton
          variant="filled"
          title="Apply"
          onPress={handleApply}
          size="sm"
          style={{
            flex: 1,
            backgroundColor: "#000000",
            paddingVertical: 18,
            paddingHorizontal: 0,
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
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
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
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  headerPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  aboutInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    textAlignVertical: "top",
  },
  preferenceContainer: {
    marginBottom: 6,
  },
  preferenceGroup: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 6,
  },
  preferenceContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  preferenceIcon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  radioOuter: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#3B82F6",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 0,
  },
  applyButton: {
    backgroundColor: "#000000",
  },
  applyButtonText: {
    color: "#FFFFFF",
  },
});

export default ProfileEditScreen;
