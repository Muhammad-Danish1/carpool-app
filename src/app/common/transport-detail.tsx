import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TransportDetail = () => {
  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={false}
      edges={["top"]}
    >
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Transport Details</Text>
          <View style={styles.placeholderView} />
        </View>
      </View> */}
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
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#111827" }}>
            Transport Details
          </Text>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#F5F6F8",
          paddingHorizontal: 20,
          paddingTop: 16,
        }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Vehicle Card */}
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 16,
            paddingVertical: 20,
            borderRadius: 16,
            gap: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
                }}
                style={{ width: 84, height: 84, borderRadius: 42 }}
              />
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.vehicleTitle}>Toyota Ist, 2005</Text>

            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>T 196 AC 154</Text>
            </View>

            {/* Specs Pills */}
            <View style={styles.pillsRow}>
              <View
                style={[
                  styles.pill,
                  { borderRightWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Text style={styles.pillText}>4 seats</Text>
              </View>
              <View style={[styles.pill]}>
                <View style={styles.radioDot} />
                <Text style={styles.pillText}>White</Text>
              </View>
              <View
                style={[
                  styles.pill,
                  { borderLeftWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Text style={styles.pillText}>Hatchback</Text>
              </View>
            </View>
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
            Car Safety
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 16,
              gap: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="checkmark" size={18} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Car documents validated
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="hammer-outline" size={18} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Technical Inspection
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="airplane-outline" size={18} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Airbags
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="airplane-outline" size={18} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Anti-lock Braking System
                </Text>
              </View>
            </View>
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
            Departure Time
          </Text>
          <View style={{ gap: 6 }}>
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
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
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
                  <Ionicons name="car-outline" size={20} color="#374151" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    Cargo capacity
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Compact trunk with minimal space
                  </Text>
                </View>
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
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
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
                  <Ionicons name="snow" size={20} color="#374151" />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    Climate control system
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Air Conditioner (AC) and Heater
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default TransportDetail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderView: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  vehicleCardWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  avatarWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  vehicleTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },
  plateBadge: {
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  plateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    letterSpacing: 1,
  },
  pillsRow: {
    marginTop: 8,
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 67,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 6,
    backgroundColor: "#fff",
  },
  pillText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#374151",
  },

  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  cardList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  listIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  listIconCapsule: {
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  absText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
  },
  listText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  amenity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 28,
    marginBottom: 8,
  },
  amenityIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  amenityContent: {
    flex: 1,
  },
  amenityLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  amenityTitle: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
    marginTop: 2,
  },
});
