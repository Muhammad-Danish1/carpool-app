import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaWrapper from "../../../components/ui/SafeAreaWrapper";
import { getActiveTrips, getPastTrips, TripData } from "../../../data/tripData";

const TripsScreen = () => {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const activeTrips = getActiveTrips();
  const pastTrips = getPastTrips();

  // Create Trip Bottom Sheet
  const createTripBottomSheetRef = useRef<BottomSheet>(null);
  const [createTripData, setCreateTripData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "1",
    price: "",
    description: "",
  });

  const navigateToTripDetails = (trip: TripData) => {
    router.push({
      pathname: "/(tabs)/trips/details",
      params: { tripId: trip.id, source: "trips" },
    });
  };

  const handleCreateTrip = () => {
    createTripBottomSheetRef.current?.expand();
  };

  const handleCloseCreateTrip = () => {
    createTripBottomSheetRef.current?.close();
  };

  const handleSubmitTrip = () => {
    if (
      !createTripData.from ||
      !createTripData.to ||
      !createTripData.date ||
      !createTripData.time
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Trip Created",
      "Your trip has been created successfully! Passengers can now book seats.",
      [
        {
          text: "OK",
          onPress: () => {
            setCreateTripData({
              from: "",
              to: "",
              date: "",
              time: "",
              seats: "1",
              price: "",
              description: "",
            });
            handleCloseCreateTrip();
          },
        },
      ]
    );
  };

  const updateCreateTripData = (field: string, value: string) => {
    setCreateTripData((prev) => ({ ...prev, [field]: value }));
  };

  const TripCard = ({ trip }: { trip: TripData }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigateToTripDetails(trip)}
    >
      <View style={styles.tripCardHeader}>
        <View style={styles.tripVehicleIcons}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.vehicleIcon}>
              <Ionicons name="car-sport" size={18} color="#BBBBBB" />
            </View>
          ))}
        </View>
        <View style={styles.tripAmenityIcons}>
          {[1, 2, 3, 4].map((_, index) => (
            <Ionicons key={index} name="car-sport" size={18} color="#BBBBBB" />
          ))}
        </View>
      </View>

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
          <Text style={styles.timeText}>{trip.departureTime}</Text>
          <Text style={styles.locationText}>{trip.departure}</Text>
        </View>

        <View style={styles.tripDurationInfo}>
          <Text style={styles.durationText}>{trip.duration}</Text>
          <View style={styles.durationDot} />
          <Text style={styles.durationText}>{trip.distance}</Text>
        </View>

        <View style={styles.arrivalInfo}>
          <Text style={styles.timeText}>{trip.arrivalTime}</Text>
          <Text style={styles.locationText}>{trip.destination}</Text>
        </View>
      </View>

      <View style={styles.tripDriverAndPriceInfo}>
        <View style={styles.driverDetails}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverInitial}>{trip.driverPhoto}</Text>
          </View>
          <View>
            <Text style={styles.driverName}>{trip.driverName}</Text>
            <View style={styles.driverRating}>
              <Ionicons name="star" size={12} color="#FBBF24" />
              <Text style={styles.ratingText}>
                {trip.driverRating} ({trip.driverReviews})
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.priceInfo}>
          <Text style={styles.priceText}>{trip.price}</Text>
          <Text style={styles.seatsAvailableText}>
            {trip.seats} seats available
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.placeholderView} />
          <Text style={styles.headerTitle}>My Trips</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleCreateTrip}
          >
            <Ionicons name="add" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "active" && { backgroundColor: "#000" },
            ]}
            onPress={() => setActiveTab("active")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "active" && { color: "#fff" },
              ]}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "past" && { backgroundColor: "#000" },
            ]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && { color: "#fff" },
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {activeTab === "active" ? (
          activeTrips.length > 0 ? (
            <View style={styles.tripsList}>
              {activeTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyStateContent}>
                <View style={styles.emptyStateIcon}>
                  <Ionicons name="car-outline" size={48} color="#9CA3AF" />
                </View>
                <Text style={styles.emptyStateTitle}>No active trips</Text>
                <Text style={styles.emptyStateDescription}>
                  Plan your next trip to get started
                </Text>
              </View>
            </View>
          )
        ) : pastTrips.length > 0 ? (
          <View style={styles.tripsList}>
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateContent}>
              <View style={styles.emptyStateIcon}>
                <Ionicons name="time-outline" size={48} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyStateTitle}>No past trips</Text>
              <Text style={styles.emptyStateDescription}>
                Your completed trips will appear here
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholderView: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },

  // Tab Navigation Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F6F8",
    borderRadius: 20,
    padding: 4,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#111827",
    fontWeight: "600",
  },

  // ScrollView Styles
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
    backgroundColor: "#F5F6F8",
  },
  scrollViewContent: {
    paddingBottom: 25,
  },
  tripsList: {
    gap: 12,
  },

  // Trip Card Styles
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
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
    width: "35%",
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
    backgroundColor: "#F5F6F8",
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
    marginTop: 16,
  },
  driverDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3B82F6",
  },
  seatsAvailableText: {
    fontSize: 12,
    color: "#A6A6A8",
    fontWeight: "500",
  },

  // Empty State Styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyStateContent: {
    alignItems: "center",
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },

  // Bottom Sheet Styles
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: "#E5E7EB",
    width: 40,
    height: 4,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  createTripForm: {
    flex: 1,
  },
  formSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateTimeInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: "#1F2937",
  },
  dateTimePlaceholder: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  seatsRow: {
    flexDirection: "row",
    gap: 12,
  },
  seatsInputContainer: {
    flex: 1,
  },
  seatsSelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  seatsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  seatsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    minWidth: 30,
    textAlign: "center",
  },
  tripPreview: {
    marginTop: 16,
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  previewRoute: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  previewFrom: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  previewArrow: {
    marginHorizontal: 8,
  },
  previewTo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  previewDateTime: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  previewSeats: {
    fontSize: 14,
    color: "#6B7280",
  },
  bottomSheetActions: {
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
});

export default TripsScreen;
