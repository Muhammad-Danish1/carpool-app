import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import CustomInput from "@/src/components/ui/Input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PersonalDataScreen = () => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    name: "John Deo",
    surename: "Shah sab",
    phoneNumber: "+923487488805",
    email: "easyroad@gmail.com",
    dateOfBirth: "12/12/2025",
  });
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
            Edit Personal Data
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
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#CCCCCC",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 36, fontWeight: "600", color: "#6B7280" }}>
              {formData.name ? formData.name.charAt(0) : "?"}
            </Text>
          </View>
        </View>

        <CustomInput
          label="Name"
          value={formData.name}
          onChangeText={(text: string) =>
            setFormData({ ...formData, name: text })
          }
          placeholder="Enter your name"
        />

        <CustomInput
          label="Surename"
          value={formData.surename}
          onChangeText={(text: string) =>
            setFormData({ ...formData, surename: text })
          }
          placeholder="Enter surename"
        />

        <CustomInput
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChangeText={(text: string) =>
            setFormData({ ...formData, dateOfBirth: text })
          }
          placeholder="MM/DD/YYYY"
        />

        {/* <CustomInput
          label="Phone Number"
          value={formData.phoneNumber}
          onChangeText={(text: string) =>
            setFormData({ ...formData, phoneNumber: text })
          }
          placeholder="Enter phone number"
        /> */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}>
            Phone Number
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 50,
              backgroundColor: "white",
              paddingVertical: 8,
              paddingHorizontal: 16,
              height: 60,
              overflow: "hidden",
            }}
            onPress={() => router.push("/common/change-number")}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: "black",
              }}
            >
              +923487488805
            </Text>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, color: "#9DAFF9" }}>
                verified
              </Text>
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={{ fontSize: 14, color: "#374151", marginBottom: 8 }}>
            Email
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 50,
              backgroundColor: "white",
              paddingVertical: 8,
              paddingHorizontal: 16,
              height: 60,
              overflow: "hidden",
            }}
            onPress={() => router.push("/common/email-verfication")}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: "black",
              }}
            >
              easyroad@gmail.com
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>

        {/* <CustomInput
          label="Email"
          value={formData.email}
          onChangeText={(text: string) =>
            setFormData({ ...formData, email: text })
          }
          placeholder="Enter email"
        /> */}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          paddingBottom: insets.bottom,
        }}
      >
        <CustomButton
          title="Continue"
          onPress={() => {}}
          variant="filled"
          size="w-full"
          style={{ backgroundColor: "#000000", paddingVertical: 20 }}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default PersonalDataScreen;
