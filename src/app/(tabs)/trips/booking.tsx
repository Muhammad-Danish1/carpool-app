import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SwipeCustomButton from "../../../components/ui/SwipButton";

const BookingScreen = () => {
  const [bookingDetails] = useState({
    route: "Novosibirsk → Barnaul",
    date: "September 7",
    time: "21:20 - 00:30",
    duration: "3h 10m",
    price: "500.00 ₽",
    passengers: 1,
    driver: "Anton",
    vehicle: "Hyundai 2018",
  });

  const handleConfirmBooking = () => {
    Alert.alert(
      "Booking Confirmed!",
      "Your trip has been successfully booked. You will receive a confirmation email shortly.",
      [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/trips"),
        },
      ]
    );
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
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Booking Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Trip Summary</Text>

          <View style={styles.routeSection}>
            <View style={styles.routeHeader}>
              <Text style={styles.routeText}>{bookingDetails.route}</Text>
              <Text style={styles.dateText}>{bookingDetails.date}</Text>
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeSection}>
                <Text style={styles.timeText}>21:20</Text>
                <Text style={styles.cityText}>Novosibirsk</Text>
              </View>

              <View style={styles.durationSection}>
                <Text style={styles.durationText}>
                  {bookingDetails.duration}
                </Text>
                <View style={styles.routeLine}>
                  <View style={styles.routeDot} />
                  <View style={styles.line} />
                  <Ionicons name="location" size={12} color="#FF6B6B" />
                </View>
              </View>

              <View style={styles.timeSection}>
                <Text style={styles.timeText}>00:30</Text>
                <Text style={styles.cityText}>Barnaul</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Driver Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Driver Details</Text>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>A</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{bookingDetails.driver}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FBBF24" />
                <Text style={styles.ratingText}>5.0 (3 reviews)</Text>
              </View>
              <Text style={styles.vehicleText}>{bookingDetails.vehicle}</Text>
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Booking Information</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Passengers</Text>
            <Text style={styles.detailValue}>
              {bookingDetails.passengers} person
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pickup Location</Text>
            <Text style={styles.detailValue}>
              Station or convenient location
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Price</Text>
            <Text style={styles.priceValue}>{bookingDetails.price}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <View style={styles.paymentRow}>
            <MaterialIcons name="payment" size={24} color="#4CAF50" />
            <Text style={styles.paymentText}>Cash Payment</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Cancellation allowed up to 2 hours before departure{"\n"}• Driver
            contact will be shared 1 hour before trip{"\n"}• Please be ready 10
            minutes before pickup time{"\n"}• Maximum 2 bags per passenger
            allowed
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Booking Button */}
      <View style={styles.bookingSection}>
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>{bookingDetails.price}</Text>
        </View>
        <SwipeCustomButton
          title="Swipe to Confirm Booking"
          onPress={handleConfirmBooking}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
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
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  routeSection: {
    marginBottom: 12,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  dateText: {
    fontSize: 14,
    color: "#666666",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeSection: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  cityText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  durationSection: {
    flex: 1,
    alignItems: "center",
  },
  durationText: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  vehicleText: {
    fontSize: 14,
    color: "#666666",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B82F6",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    fontWeight: "500",
  },
  termsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  termsText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  bookingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3B82F6",
  },
});

export default BookingScreen;
