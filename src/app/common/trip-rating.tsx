import { SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
const TripTratingScreen = () => {
  const params = useLocalSearchParams();
  const { fromDriver } = params;
  console.log(params, "params");
  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
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
            {fromDriver ? "Trip Rating" : "Trip Companions Rating"}
          </Text>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "#F5F6F8",
          paddingHorizontal: 20,
          paddingTop: 16,
        }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Driver Profile Card */}

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
                  uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
                }}
                style={{ width: 84, height: 84, borderRadius: 42 }}
              />
              <View
                style={{
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
                }}
              >
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
            </View>

            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: "500",
                color: "#111827",
              }}
            >
              Anton
            </Text>

            {/* Specs Pills */}
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                gap: 6,
                backgroundColor: "#F3F4F6",
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  { borderRightWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  5.0(5)
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  5 years on service
                </Text>
              </View>
              <View
                style={[
                  {
                    // flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  { borderLeftWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  32 y.o.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
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
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default TripTratingScreen;
