import { SwipeCustomButton } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SeatBookingBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  onConfirmBooking: () => void;
  tripData?: {
    from: string;
    fromDescription: string;
    to: string;
    toDescription: string;
    date: string;
    time: string;
    duration: string;
    driverName: string;
    driverRating: number;
    vehicleName: string;
    vehicleColor: string;
    pricePerSeat: number;
    serviceFee: number;
    totalPrice: number;
  };
}

export const SeatBookingBottomSheet: React.FC<SeatBookingBottomSheetProps> = ({
  bottomSheetModalRef,
  onConfirmBooking,
  tripData = {
    from: "Novosibirsk",
    fromDescription: "Novosibirsk Oblast, Russia",
    to: "Barnaul",
    toDescription: "Altai Krai, Russia",
    date: "Sep. 7",
    time: "21:20",
    duration: "3h 10 • 230km",
    driverName: "Anton",
    driverRating: 5.0,
    vehicleName: "Toyota Ist",
    vehicleColor: "White",
    pricePerSeat: 500.0,
    serviceFee: 0.0,
    totalPrice: 500.0,
  },
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={() => (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
      onDismiss={() => bottomSheetModalRef.current?.close()}
      handleIndicatorStyle={{
        backgroundColor: "#E5E7EB",
        width: 40,
        height: 4,
      }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 6,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#111827",
            textAlign: "center",
          }}
        >
          Check your booking details
        </Text>

        {/* Info Message */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 8,
            marginTop: 16,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#BBBBBB"
          />
          <Text
            style={{ flex: 1, fontSize: 14, color: "#BBBBBB", lineHeight: 16 }}
          >
            Your booking will be confirmed only after the driver&apos;s approval
          </Text>
        </View>

        {/* Route Section */}
        <View style={styles.tripCard}>
          <View style={styles.tripRouteIndicator}>
            <Text style={styles.routeLabel}>To</Text>
            <View style={styles.routeLineContainer}>
              <View style={styles.routeLine} />
              <Ionicons name="car-sport" size={12} color="#BBBBBB" />
              <View style={styles.routeLine} />
            </View>
            <Text style={styles.routeLabel}>From</Text>
          </View>

          <View style={styles.tripTimeAndRoute}>
            <View style={styles.departureInfo}>
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}
              >
                {"Novosibirsk"}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
              >
                street 123, floor 3
              </Text>
            </View>

            <View style={styles.arrivalInfo}>
              <Text
                style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}
              >
                {"Barnaul"}
              </Text>
              <Text
                style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
              >
                street 123, floor 3,
              </Text>
            </View>
          </View>
          <View style={styles.tripTimeAndRoute}>
            <View style={styles.departureInfo}>
              <Text style={styles.timeText}>{"10:30"}</Text>
              <Text
                style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
              >
                Sep 14, 2025
              </Text>
            </View>

            <View style={styles.tripDurationInfo}>
              <Text style={styles.durationText}>{"3h 10"}</Text>
              <View style={styles.durationDot} />
              <Text style={styles.durationText}>{"230km"}</Text>
            </View>

            <View style={styles.arrivalInfo}>
              <Text style={styles.timeText}>{"00:30"}</Text>
              <Text
                style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
              >
                Sep 14, 2025,
              </Text>
            </View>
          </View>
        </View>

        {/* Driver & Vehicle Section */}
        <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: "#F5F6F8",
              borderRadius: 16,
              flex: 1,
            }}
            onPress={() => router.push("/common/driver-profile")}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#3B82F6",
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {tripData.driverName[0]}
                  </Text>
                </View>
                <View style={{ marginLeft: 6, gap: 4 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    {tripData.driverName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#BBBBBB",
                      fontWeight: "400",
                    }}
                  >
                    <Ionicons
                      name="star"
                      size={12}
                      color="#FBBF24"
                      style={{ marginRight: 4 }}
                    />
                    {5} (2 rev.)
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: "#F5F6F8",
              borderRadius: 16,
              flex: 1,
            }}
            onPress={() => router.push(`/common/transport-detail`)}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#3B82F6",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {tripData.vehicleName[0]}
                </Text>
              </View>
              <View style={{ marginLeft: 6, gap: 4 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {tripData.vehicleName}
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#BBBBBB",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#BBBBBB",
                      fontWeight: "400",
                    }}
                  >
                    white
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Breakdown */}
        <View
          style={{
            backgroundColor: "#F5F6F8",
            padding: 16,
            borderRadius: 20,
            gap: 10,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#BBBBBB" }}>
              Price per Seat
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827" }}>
              {tripData.pricePerSeat.toFixed(2)}₽
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#BBBBBB" }}>
              Service Fee
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827" }}>
              {"000.00"}₽
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#E5E7EB",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}>
              Total Price
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#3B82F6" }}>
              {tripData.totalPrice.toFixed(2)} ₽
            </Text>
          </View>
        </View>

        {/* Swipe Button */}
        <View style={styles.buttonContainer}>
          <SwipeCustomButton
            title="Send Request for Booking"
            onPress={onConfirmBooking}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 16,
  },
  tripCard: {
    backgroundColor: "#F5F6F8",
    padding: 16,
    borderRadius: 20,
    gap: 6,
    marginTop: 6,
  },
  tripCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tripVehicleIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vehicleIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tripAmenityIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tripRouteIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  routeLabel: {
    fontSize: 12,
    color: "#BBBBBB",
    fontWeight: "500",
    width: 30,
  },
  routeLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
  },
  routeLine: {
    height: 1,
    width: "27%",
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  tripTimeAndRoute: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "space-between",
  },
  departureInfo: {
    flex: 1,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  locationText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  tripDurationInfo: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  durationText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#A6A6A8",
  },
  durationDot: {
    width: 4,
    height: 4,
    backgroundColor: "#A6A6A8",
    borderRadius: 2,
    marginHorizontal: 8,
  },
  arrivalInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  tripDriverAndPriceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  routeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  routeLeft: {
    flex: 1,
  },
  routeCenter: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginBottom: 4,
  },

  routeRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  cityDescription: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeItem: {
    alignItems: "center",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  timeLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  duration: {
    fontSize: 11,
    color: "#6B7280",
  },

  driverVehicleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  driverCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#6B7280",
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  vehicleImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  vehicleColor: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  priceContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  priceValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
  },

  policyBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 8,
    gap: 6,
    marginBottom: 16,
  },
  policyText: {
    flex: 1,
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 14,
  },

  buttonContainer: {
    marginTop: 16,
  },
});

export default SeatBookingBottomSheet;
