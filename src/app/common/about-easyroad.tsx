import { SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AboutEasyRoadScreen = () => {
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
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About EasyRoad</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* App Info Section */}
        <View style={styles.appInfoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="car-sport" size={80} color="#3B82F6" />
          </View>
          <Text style={styles.appName}>EasyRoad</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>
            Your trusted ridesharing companion
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              EasyRoad is dedicated to making transportation accessible,
              affordable, and sustainable for everyone. We connect drivers and
              passengers heading in the same direction, reducing traffic
              congestion and environmental impact while building a community of
              trusted travelers.
            </Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.card}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Safe & Secure</Text>
                <Text style={styles.featureDescription}>
                  Verified profiles and secure payment system
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="cash" size={24} color="#3B82F6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Affordable Rides</Text>
                <Text style={styles.featureDescription}>
                  Share costs and save money on every trip
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="leaf" size={24} color="#10B981" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Eco-Friendly</Text>
                <Text style={styles.featureDescription}>
                  Reduce carbon footprint by sharing rides
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="people" size={24} color="#F59E0B" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Community</Text>
                <Text style={styles.featureDescription}>
                  Connect with verified and trusted travelers
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Company Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Founded</Text>
              <Text style={styles.infoValue}>2024</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Headquarters</Text>
              <Text style={styles.infoValue}>United States</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>support@easyroad.com</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>www.easyroad.com</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 EasyRoad. All rights reserved.
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for better journeys
          </Text>
        </View>
      </ScrollView>
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
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  appInfoSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  paragraph: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
    paddingTop: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 13,
    color: "#9CA3AF",
  },
});

export default AboutEasyRoadScreen;
