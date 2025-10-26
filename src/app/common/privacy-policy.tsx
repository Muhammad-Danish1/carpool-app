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

const PrivacyPolicyScreen = () => {
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
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
              At EasyRoad, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our ridesharing platform. Please read
              this policy carefully to understand our practices regarding your
              personal data.
            </Text>
          </View>
        </View>

        {/* Information We Collect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <View style={styles.card}>
            <Text style={styles.subheading}>Personal Information</Text>
            <Text style={styles.paragraph}>
              We collect information that you provide directly to us:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Name, email address, and phone number
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Profile photo and bio information
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Payment information and transaction history
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Driver&apos;s license and vehicle information (for drivers)
                </Text>
              </View>
            </View>

            <Text style={styles.subheading}>Usage Information</Text>
            <Text style={styles.paragraph}>
              We automatically collect certain information about your device and
              how you interact with our services:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Location data (with your permission)
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Device information and identifiers
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  App usage patterns and preferences
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Communication between users (for safety purposes)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* How We Use Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. How We Use Your Information
          </Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We use the collected information for various purposes:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To provide and maintain our ridesharing services
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To match drivers with passengers efficiently
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To process payments and prevent fraud
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To verify user identity and ensure safety
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To send notifications about your rides and account
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To improve our services and develop new features
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  To comply with legal obligations
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Information Sharing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Information Sharing</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We may share your information in the following circumstances:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>With other users:</Text> Limited
                  profile information is shared to facilitate ridesharing
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>Service providers:</Text> Third
                  parties who help us operate our platform
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>Legal requirements:</Text> When
                  required by law or to protect rights and safety
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  <Text style={styles.bold}>Business transfers:</Text> In
                  connection with mergers or acquisitions
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Security</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We implement appropriate technical and organizational measures to
              protect your personal information:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Encryption of data in transit and at rest
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Regular security assessments and updates
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Secure payment processing through trusted providers
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Limited access to personal data by authorized personnel
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Your Rights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Privacy Rights</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>You have the right to:</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Access and review your personal information
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Correct inaccurate or incomplete data
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Request deletion of your account and data
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Opt-out of marketing communications
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Export your data in a portable format
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Retention */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Data Retention</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We retain your personal information for as long as necessary to
              provide our services and comply with legal obligations. When you
              delete your account, we will remove or anonymize your personal
              data, except where we are required to retain it by law.
            </Text>
          </View>
        </View>

        {/* Children's Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Children&apos;s Privacy</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              Our services are not intended for users under the age of 18. We do
              not knowingly collect personal information from children. If you
              believe we have collected information from a child, please contact
              us immediately.
            </Text>
          </View>
        </View>

        {/* Changes to Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            9. Changes to This Privacy Policy
          </Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting the new policy on
              this page and updating the &quot;Last Updated&quot; date. We
              encourage you to review this policy periodically.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>privacy@easyroad.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="location-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>
                  123 Privacy Street, Suite 100
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerNote}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            <Text style={styles.footerNoteText}>
              Your privacy is important to us. We are committed to protecting
              your personal information and being transparent about our data
              practices.
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
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 12,
    marginBottom: 8,
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
  bold: {
    fontWeight: "600",
    color: "#111827",
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
    backgroundColor: "#ECFDF5",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  footerNoteText: {
    flex: 1,
    fontSize: 14,
    color: "#065F46",
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
