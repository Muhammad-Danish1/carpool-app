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

const UserAgreementScreen = () => {
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
          <Text style={styles.headerTitle}>User Agreement</Text>
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
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              Welcome to EasyRoad! By accessing or using our ridesharing
              platform, you agree to be bound by this User Agreement
              (&quot;Agreement&quot;). This Agreement constitutes a legally
              binding contract between you and EasyRoad. If you do not agree to
              these terms, please do not use our services.
            </Text>
          </View>
        </View>

        {/* Account Registration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Account Registration</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              To use EasyRoad, you must create an account. You agree to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Provide accurate, current, and complete information
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Maintain and update your information to keep it accurate
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Keep your password secure and confidential
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Be at least 18 years old to create an account
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Notify us immediately of any unauthorized account access
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Conduct */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Conduct</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              When using EasyRoad, you agree NOT to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Violate any laws or regulations
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Harass, threaten, or harm other users
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Provide false or misleading information
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Use the platform for commercial purposes without authorization
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Attempt to hack, disrupt, or interfere with the platform
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Create multiple accounts or share your account
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Discriminate against users based on protected characteristics
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Driver Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Driver Responsibilities</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              If you are a driver on EasyRoad, you additionally agree to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Possess a valid driver&apos;s license and insurance
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Maintain your vehicle in safe, roadworthy condition
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Follow all traffic laws and drive safely
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Not drive under the influence of alcohol or drugs
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Respect passenger safety and comfort
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Accurately represent your vehicle and route information
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Passenger Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Passenger Responsibilities</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              If you are a passenger on EasyRoad, you agree to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Be punctual and ready at the agreed pickup location
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Respect the driver&apos;s vehicle and property
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Follow the driver&apos;s reasonable requests
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Not bring prohibited items or engage in illegal activities
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Pay the agreed fare promptly
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payments and Fees */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Payments and Fees</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              EasyRoad facilitates payments between users. Key terms include:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Service fees are charged for platform usage
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Prices are displayed before booking confirmation
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Payments are processed securely through our payment partners
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Cancellation fees may apply according to our cancellation
                  policy
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Drivers receive payment after trip completion, minus service
                  fees
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Cancellation Policy</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              Users may cancel bookings according to the following terms:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Free cancellation up to 24 hours before departure
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  50% refund for cancellations between 24-12 hours before
                  departure
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  No refund for cancellations less than 12 hours before
                  departure
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Exceptions may be made for emergencies or extenuating
                  circumstances
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Intellectual Property */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              All content, features, and functionality of the EasyRoad platform,
              including but not limited to text, graphics, logos, and software,
              are owned by EasyRoad and protected by intellectual property laws.
              You may not copy, modify, or distribute our content without
              explicit permission.
            </Text>
          </View>
        </View>

        {/* Dispute Resolution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Dispute Resolution</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              In the event of disputes between users, EasyRoad may provide
              assistance but is not responsible for resolving conflicts. Users
              are encouraged to:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Communicate respectfully to resolve issues
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Report serious violations to our support team
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Seek mediation or legal counsel for unresolved disputes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Limitation of Liability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              EasyRoad provides a platform connecting users but does not provide
              transportation services directly. We are not liable for:
            </Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Actions or conduct of users
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Accidents, injuries, or property damage during rides
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Quality or safety of vehicles
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Delays, cancellations, or route changes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Termination */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Account Termination</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We reserve the right to suspend or terminate your account if you
              violate this Agreement or engage in prohibited activities. You may
              also delete your account at any time through the app settings.
              Upon termination, your right to use the platform ceases
              immediately.
            </Text>
          </View>
        </View>

        {/* Changes to Agreement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Changes to This Agreement</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              We may modify this User Agreement from time to time. Significant
              changes will be communicated through the app or via email.
              Continued use of EasyRoad after changes constitutes acceptance of
              the modified Agreement.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Information</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              For questions about this User Agreement, please contact us:
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>support@easyroad.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="globe-outline" size={20} color="#3B82F6" />
                <Text style={styles.contactText}>www.easyroad.com/support</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerNote}>
            <Ionicons name="document-text-outline" size={24} color="#F59E0B" />
            <Text style={styles.footerNoteText}>
              By using EasyRoad, you acknowledge that you have read, understood,
              and agree to be bound by this User Agreement. Please review this
              document carefully.
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
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  footerNoteText: {
    flex: 1,
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
});

export default UserAgreementScreen;
