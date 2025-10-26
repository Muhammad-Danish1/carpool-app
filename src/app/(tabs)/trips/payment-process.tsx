import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SwipeCustomButton from "../../../components/ui/SwipButton";
import { getTripById } from "../../../data/tripData";

const PaymentProcessScreen = () => {
  const params = useLocalSearchParams();
  const tripId = params.tripId as string;
  const paymentMethod = params.paymentMethod as string;
  const trip = getTripById(tripId);

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        "Payment Successful!",
        "Your booking has been confirmed. You will receive a confirmation email shortly.",
        [
          {
            text: "OK",
            onPress: () =>
              router.push({
                pathname: "/(tabs)/trips/booking-success",
                params: { tripId: trip.id },
              }),
          },
        ]
      );
    }, 3000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return text;
    }
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  if (isProcessing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.processingContainer}>
          <View style={styles.processingContent}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.processingTitle}>Processing Payment</Text>
            <Text style={styles.processingSubtitle}>
              Please wait while we process your payment securely
            </Text>

            <View style={styles.processingSteps}>
              <View style={styles.processingStep}>
                <View style={styles.stepIcon}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.stepText}>Verifying payment details</Text>
              </View>
              <View style={styles.processingStep}>
                <View style={styles.stepIcon}>
                  <ActivityIndicator size="small" color="#3B82F6" />
                </View>
                <Text style={styles.stepText}>Processing transaction</Text>
              </View>
              <View style={styles.processingStep}>
                <View style={[styles.stepIcon, styles.stepIconInactive]}>
                  <Ionicons name="checkmark" size={16} color="#9CA3AF" />
                </View>
                <Text style={[styles.stepText, styles.stepTextInactive]}>
                  Confirming booking
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Trip Summary */}
        <View style={styles.tripSummary}>
          <Text style={styles.tripRoute}>
            {trip.departure} → {trip.destination}
          </Text>
          <Text style={styles.tripDetails}>
            {trip.date} • {trip.departureTime}
          </Text>
          <Text style={styles.tripPrice}>{trip.price}</Text>
        </View>

        {/* Payment Form */}
        <View style={styles.paymentForm}>
          <Text style={styles.formTitle}>Card Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroupHalf}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={styles.inputGroupHalf}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.textInput}
                placeholder="123"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe"
              value={cardHolderName}
              onChangeText={setCardHolderName}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <MaterialIcons name="security" size={20} color="#10B981" />
          <Text style={styles.securityText}>
            Your payment is secured with 256-bit SSL encryption
          </Text>
        </View>
      </View>

      {/* Pay Button */}
      <View style={styles.paymentSection}>
        <SwipeCustomButton
          title={`Swipe to Pay ${trip.price}`}
          onPress={handlePayment}
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
    paddingHorizontal: 20,
  },
  tripSummary: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  tripRoute: {
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#3B82F6",
  },
  paymentForm: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroupHalf: {
    flex: 1,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: "#166534",
    fontWeight: "500",
    marginLeft: 12,
  },
  paymentSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  processingContent: {
    alignItems: "center",
  },
  processingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 24,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },
  processingSteps: {
    width: "100%",
  },
  processingStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepIconInactive: {
    backgroundColor: "#E5E7EB",
  },
  stepText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  stepTextInactive: {
    color: "#9CA3AF",
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

export default PaymentProcessScreen;
