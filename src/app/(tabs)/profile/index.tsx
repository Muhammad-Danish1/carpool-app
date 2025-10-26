import { SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const handleMenuPress = (screen: string) => {
    router.push(`../common/${screen}` as any);
  };

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
          <View style={styles.placeholderView} />
          <Text style={styles.headerTitle}>Personal Account</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="log-out-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() =>
            router.push({
              pathname: "/common/driver-profile",
              params: { fromProfile: "true" },
            })
          }
        >
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>S</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sergey</Text>
              <Text style={styles.profilePhone}>+7 (999) 999-99-99</Text>
            </View>
            <View style={styles.profileEditButton}>
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color="#9CA3AF"
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleMenuPress("personal-data")}
          >
            <View style={styles.gridItemIcon}>
              <Ionicons name="person-outline" size={20} color="#9CA3AF" />
            </View>
            <Text style={styles.gridItemText}>Personal Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleMenuPress("profile-verification")}
          >
            <View style={styles.gridItemIcon}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#9CA3AF"
              />
            </View>
            <View>
              <Text style={styles.gridItemText}>Profile verification</Text>
              <Text style={styles.verificationStatus}>Not verified</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleMenuPress("notifications")}
          >
            <View style={styles.gridItemIcon}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#9CA3AF"
              />
            </View>
            <Text style={styles.gridItemText}>Notifications</Text>
          </TouchableOpacity>

          <View style={styles.gridItem}>
            <View style={styles.darkModeContainer}>
              <View style={styles.gridItemIcon}>
                <Ionicons name="moon-outline" size={20} color="#9CA3AF" />
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ true: "#3B82F6", false: "#E5E7EB" }}
                thumbColor={Platform.OS === "android" ? "#3B82F6" : "#FFFFFF"}
              />
            </View>
            <Text style={styles.gridItemText}>Dark Mode</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("legal-information")}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#9CA3AF"
                />
              </View>
              <Text style={styles.menuItemText}>Legals information</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("about")}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#9CA3AF"
                />
              </View>
              <Text style={styles.menuItemText}>About the Service</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("support")}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemIcon}>
                <Ionicons name="chatbox-outline" size={20} color="#9CA3AF" />
              </View>
              <Text style={styles.menuItemText}>Support Chat</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  // Header Styles
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

  // ScrollView Styles
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },

  // Profile Section Styles
  profileSection: {
    gap: 12,
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  profileInitial: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  profilePhone: {
    fontSize: 14,
    color: "#6B7280",
  },
  profileEditButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  // Grid Container Styles
  gridContainer: {
    gap: 6,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    gap: 4,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    height: 130,
    justifyContent: "space-between",
    flex: 1,
    minWidth: "37%",
  },
  gridItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  verificationStatus: {
    fontSize: 12,
    fontWeight: "500",
    color: "blue",
  },
  walletBalance: {
    fontSize: 12,
    fontWeight: "500",
    color: "blue",
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Menu Container Styles
  menuContainer: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 6,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
});

export default ProfileScreen;
