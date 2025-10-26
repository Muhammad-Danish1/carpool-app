import { CustomButton } from "@/src/components/ui";
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchFilter = () => {
  const insets = useSafeAreaInsets();
  const [showFirst, setShowFirst] = useState("cheapest");
  const [departureTime, setDepartureTime] = useState<string[]>([]);
  const [verifiedProfile, setVerifiedProfile] = useState(true);
  const [onlyForWomen, setOnlyForWomen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleDepartureTime = (time: string) => {
    if (departureTime.includes(time)) {
      setDepartureTime(departureTime.filter((t) => t !== time));
    } else {
      setDepartureTime([...departureTime, time]);
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleReset = () => {
    setShowFirst("cheapest");
    setDepartureTime([]);
    setVerifiedProfile(true);
    setOnlyForWomen(false);
    setSelectedAmenities([]);
  };

  const handleApply = () => {
    // Apply filters logic here
    router.back();
  };

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={false}
      edges={["top"]}
    >
      {/* Header */}

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
            Filters
          </Text>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 16,
          backgroundColor: "#F5F6F8",
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Show First */}
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Show First
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
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
              onPress={() => setShowFirst("cheapest")}
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
                  <Ionicons name="pricetag-outline" size={20} color="#6B7280" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Cheapest trips
                </Text>
              </View>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#D1D5DB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showFirst === "cheapest" && (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      backgroundColor: "#3B82F6",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
              onPress={() => setShowFirst("earliest")}
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
                  <Ionicons name="time-outline" size={20} color="#6B7280" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Earliest rides
                </Text>
              </View>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#D1D5DB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showFirst === "earliest" && (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      backgroundColor: "#3B82F6",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
              onPress={() => setShowFirst("shortest")}
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
                  <Ionicons
                    name="speedometer-outline"
                    size={20}
                    color="#6B7280"
                  />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Shortest travel times
                </Text>
              </View>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#D1D5DB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showFirst === "shortest" && (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      backgroundColor: "#3B82F6",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Departure Time */}
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
          <View style={{ gap: 6, flexDirection: "row", flexWrap: "wrap" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
              onPress={() => toggleDepartureTime("morning")}
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
                  <Ionicons
                    name="sunny-outline"
                    size={20}
                    color={
                      departureTime.includes("morning") ? "#3B82F6" : "#6B7280"
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Morning
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    06:00 - 12:00
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
              onPress={() => toggleDepartureTime("day")}
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
                  <Ionicons
                    name="sunny"
                    size={20}
                    color={
                      departureTime.includes("day") ? "#3B82F6" : "#6B7280"
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Day
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    12:00 - 18:00
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
              onPress={() => toggleDepartureTime("evening")}
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
                  <Ionicons
                    name="cloudy-night-outline"
                    size={20}
                    color={
                      departureTime.includes("evening") ? "#3B82F6" : "#6B7280"
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Evening
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    18:00 - 00:00
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
              onPress={() => toggleDepartureTime("night")}
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
                  <Ionicons
                    name="moon-outline"
                    size={20}
                    color={
                      departureTime.includes("night") ? "#3B82F6" : "#6B7280"
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#111827",
                    }}
                  >
                    Night
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    00:00 - 06:00
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Safety
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
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#6B7280"
                  />
                </View>

                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Verified Profile
                </Text>
              </View>
              <Switch
                value={verifiedProfile}
                onValueChange={setVerifiedProfile}
                trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
                thumbColor={verifiedProfile ? "#3B82F6" : "#F3F4F6"}
              />
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
                  <Ionicons name="female-outline" size={20} color="#6B7280" />
                </View>

                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Only for Women
                </Text>
              </View>
              <Switch
                value={onlyForWomen}
                onValueChange={setOnlyForWomen}
                trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
                thumbColor={onlyForWomen ? "#3B82F6" : "#F3F4F6"}
              />
            </View>
          </View>
          {/* <View style={styles.switchGroup}>
            <View style={styles.switchItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#6B7280"
              />
              <Text style={styles.switchLabel}>Verified Profile</Text>
              <Switch
                value={verifiedProfile}
                onValueChange={setVerifiedProfile}
                trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
                thumbColor={verifiedProfile ? "#3B82F6" : "#F3F4F6"}
              />
            </View>

            <View style={styles.switchItem}>
              <Ionicons name="female-outline" size={20} color="#6B7280" />
              <Text style={styles.switchLabel}>Only for Women</Text>
              <Switch
                value={onlyForWomen}
                onValueChange={setOnlyForWomen}
                trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
                thumbColor={onlyForWomen ? "#3B82F6" : "#F3F4F6"}
              />
            </View>
          </View> */}
        </View>

        {/* Amenities */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Amenities
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {[
              "Only two in the back",
              "Pet-friendly",
              "Instant booking",
              "Smoking Allowed",
              "No Pets",
              "Child seat available",
            ].map((amenity) => (
              <View
                key={amenity}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="#BBBBBB"
                />

                <Text
                  style={{ fontSize: 14, color: "#111827", fontWeight: "400" }}
                >
                  {amenity}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}

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
          onPress={() => {}}
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
          onPress={() => {}}
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

export default SearchFilter;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },

  radioGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  radioLabel: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeButton: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeButtonActive: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  timeButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 6,
  },
  timeButtonTextActive: {
    color: "#3B82F6",
  },
  timeRange: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },

  switchGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
  },
  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  amenityButtonActive: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  amenityText: {
    fontSize: 12,
    color: "#6B7280",
  },
  amenityTextActive: {
    color: "#3B82F6",
  },

  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
