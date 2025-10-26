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

const PublicOfferScreen = () => {
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
          <Text style={styles.headerTitle}>Public Offer</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Updated */}
        <View style={styles.updateBanner}>
          <Ionicons name="time-outline" size={20} color="#6B7280" />
          <Text style={styles.updateText}>Last updated: January 1, 2024</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              This Public Offer Agreement (&quot;Agreement&quot;) is a legally
              binding document between EasyRoad (&quot;Company&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and you
              (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;). By using
              our ridesharing platform, you accept and agree to be bound by the
              terms and conditions of this Agreement.
            </Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Services Provided</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              EasyRoad provides a digital platform that connects drivers and
              passengers for ridesharing purposes. Our services include:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Matching drivers with passengers traveling similar routes
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Secure payment processing and transaction management
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Communication tools between users
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  User verification and safety features
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Obligations</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              By using EasyRoad, you agree to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Provide accurate and truthful information
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Maintain the confidentiality of your account credentials
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Comply with all applicable laws and regulations
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Respect other users and maintain appropriate conduct
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Not use the service for illegal or unauthorized purposes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Payment Terms</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              All payments are processed securely through our platform. The
              Company charges a service fee for facilitating connections between
              users. Payment terms include:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Service fees are clearly displayed before booking
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Payments are processed at the time of booking confirmation
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Refunds are subject to our cancellation policy
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Liability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              EasyRoad acts as an intermediary platform connecting drivers and
              passengers. We are not responsible for:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  The conduct or actions of users on the platform
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Damages or losses incurred during rides
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Quality or safety of vehicles used by drivers
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>Disputes between users</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Termination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Termination</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We reserve the right to suspend or terminate your account at any
              time if you violate this Agreement or engage in fraudulent,
              illegal, or harmful activities. You may also terminate your
              account at any time through the app settings.
            </Text>
          </View>
        </View>

        {/* Changes to Agreement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Changes to Agreement</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We may modify this Agreement from time to time. We will notify
              users of significant changes through the app or via email.
              Continued use of the service after changes constitutes acceptance
              of the modified Agreement.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Contact Information</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              For questions or concerns regarding this Public Offer Agreement,
              please contact us at:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>legal@easyroad.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="globe-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>www.easyroad.com/legal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerNote}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#3B82F6"
            />
            <Text style={styles.footerNoteText}>
              By using EasyRoad, you acknowledge that you have read, understood,
              and agree to be bound by this Public Offer Agreement.
            </Text>
          </View>
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
  updateBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  updateText: {
    fontSize: 14,
    color: "#6B7280",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3B82F6",
    marginTop: 8,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
    lineHeight: 24,
  },
  contactInfo: {
    marginTop: 16,
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactText: {
    fontSize: 15,
    color: "#3B82F6",
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  footerNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  footerNoteText: {
    flex: 1,
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
});

export default PublicOfferScreen;
