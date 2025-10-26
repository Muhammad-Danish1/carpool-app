import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "../../../components/ui/Button";
import { getTripById } from "../../../data/tripData";

const PaymentScreen = () => {
  const params = useLocalSearchParams();
  const tripId = params.tripId as string;
  const trip = getTripById(tripId);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const paymentMethods = [
    {
      id: "card",
      title: "Credit/Debit Card",
      subtitle: "Visa, Mastercard, American Express",
      icon: "card-outline",
      iconLibrary: "Ionicons",
    },
    {
      id: "cash",
      title: "Cash Payment",
      subtitle: "Pay directly to driver",
      icon: "payments",
      iconLibrary: "MaterialIcons",
    },
    {
      id: "wallet",
      title: "Digital Wallet",
      subtitle: "Apple Pay, Google Pay",
      icon: "wallet-outline",
      iconLibrary: "Ionicons",
    },
    {
      id: "bank",
      title: "Bank Transfer",
      subtitle: "Direct bank transfer",
      icon: "account-balance",
      iconLibrary: "MaterialIcons",
    },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProceedToPayment = () => {
    if (selectedPaymentMethod === "cash") {
      // Navigate to booking confirmation for cash payment
      router.push({
        pathname: "/(tabs)/trips/booking",
        params: { tripId: trip.id, paymentMethod: "cash" },
      });
    } else {
      // Navigate to payment processing screen
      router.push({
        pathname: "/(tabs)/trips/payment-process",
        params: { tripId: trip.id, paymentMethod: selectedPaymentMethod },
      });
    }
  };

  const renderIcon = (iconName: string, iconLibrary: string) => {
    if (iconLibrary === "MaterialIcons") {
      return <MaterialIcons name={iconName as any} size={24} color="#3B82F6" />;
    } else {
      return <Ionicons name={iconName as any} size={24} color="#3B82F6" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Summary */}
        <View style={styles.tripSummary}>
          <Text style={styles.tripRoute}>
            {trip.departure} → {trip.destination}
          </Text>
          <Text style={styles.tripDetails}>
            {trip.date} • {trip.departureTime} • {trip.passengers.length}{" "}
            passenger(s)
          </Text>
          <Text style={styles.tripPrice}>{trip.price}</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                selectedPaymentMethod === method.id &&
                  styles.paymentMethodCardSelected,
              ]}
              onPress={() => handlePaymentMethodSelect(method.id)}
            >
              <View style={styles.paymentMethodIcon}>
                {renderIcon(method.icon, method.iconLibrary)}
              </View>
              <View style={styles.paymentMethodContent}>
                <Text style={styles.paymentMethodTitle}>{method.title}</Text>
                <Text style={styles.paymentMethodSubtitle}>
                  {method.subtitle}
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod === method.id &&
                    styles.radioButtonSelected,
                ]}
              >
                {selectedPaymentMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <View style={styles.securityIcon}>
            <MaterialIcons name="security" size={20} color="#10B981" />
          </View>
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.continueSection}>
        <CustomButton
          title="Continue to Payment"
          onPress={handleProceedToPayment}
          variant="filled"
          disabled={!selectedPaymentMethod}
          style={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  tripSummary: {
    backgroundColor: "#F8F9FA",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  tripRoute: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  tripDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  tripPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3B82F6",
  },
  paymentMethodsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  paymentMethodCardSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#F0F9FF",
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3B82F6",
  },
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  securityIcon: {
    marginRight: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: "#166534",
    fontWeight: "500",
  },
  continueSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  continueButton: {
    marginTop: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#EF4444",
    fontWeight: "600",
  },
});

export default PaymentScreen;
