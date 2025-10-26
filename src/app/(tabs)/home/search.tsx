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

interface TripData {
  id: string;
  departureTime: string;
  departure: string;
  arrivalTime: string;
  destination: string;
  duration: string;
  distance: string;
  driverName: string;
  driverPhoto: string;
  driverRating: number;
  driverReviews: number;
  price: string;
  seats: number;
  amenities: string[];
}

const SearchScreen = () => {
  const [selectedDate, setSelectedDate] = useState("Sep. 7");
  const [subscribeToRoute, setSubscribeToRoute] = useState(false);

  const dates = [
    { label: "Sep. 6", value: "Sep. 6" },
    { label: "Sep. 7", value: "Sep. 7" },
    { label: "Sep. 8", value: "Sep. 8" },
    { label: "Sep. 9", value: "Sep. 9" },
  ];

  const trips: TripData[] = [
    {
      id: "1",
      departureTime: "21:20",
      departure: "Novosibirsk",
      arrivalTime: "00:30",
      destination: "Barnaul",
      duration: "3h 10",
      distance: "235km",
      driverName: "Anton",
      driverPhoto: "A",
      driverRating: 5.0,
      driverReviews: 6,
      price: "500'00 ₽",
      seats: 1,
      amenities: ["ac", "music", "pet", "luggage"],
    },
    {
      id: "2",
      departureTime: "23:50",
      departure: "Novosibirsk",
      arrivalTime: "03:20",
      destination: "Barnaul",
      duration: "3h 20",
      distance: "235km",
      driverName: "Vitaliy",
      driverPhoto: "V",
      driverRating: 5.0,
      driverReviews: 7,
      price: "550'00 ₽",
      seats: 1,
      amenities: ["electric", "music", "pet", "luggage"],
    },
    {
      id: "3",
      departureTime: "23:50",
      departure: "Novosibirsk",
      arrivalTime: "03:20",
      destination: "Barnaul",
      duration: "3h 20",
      distance: "235km",
      driverName: "Vitaliy",
      driverPhoto: "V",
      driverRating: 5.0,
      driverReviews: 7,
      price: "550'00 ₽",
      seats: 1,
      amenities: ["electric", "music", "pet", "luggage"],
    },
    {
      id: "4",
      departureTime: "21:20",
      departure: "Novosibirsk",
      arrivalTime: "00:30",
      destination: "Barnaul",
      duration: "3h 10",
      distance: "235km",
      driverName: "Anton",
      driverPhoto: "A",
      driverRating: 5.0,
      driverReviews: 6,
      price: "500'00 ₽",
      seats: 1,
      amenities: ["ac", "music", "pet", "luggage"],
    },
  ];

  const navigateToTripDetails = (trip: TripData) => {
    router.push({
      pathname: "/(tabs)/trips/details",
      params: { tripId: trip.id },
    });
  };

  const TripCard = ({ trip }: { trip: TripData }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigateToTripDetails(trip)}
    >
      <View style={styles.tripCardHeader}>
        <View style={styles.tripVehicleIcons}>
          {trip.amenities.map((amenity, index) => (
            <View key={index} style={styles.vehicleIcon}>
              <Ionicons
                name={
                  amenity === "ac"
                    ? "snow-outline"
                    : amenity === "music"
                      ? "musical-notes-outline"
                      : amenity === "pet"
                        ? "paw-outline"
                        : amenity === "luggage"
                          ? "briefcase-outline"
                          : amenity === "electric"
                            ? "flash-outline"
                            : "car-sport"
                }
                size={16}
                color="#111827"
              />
            </View>
          ))}
        </View>
        <View style={styles.tripAmenityIcons}>
          {[1, 2, 3].map((_, index) => (
            <Ionicons
              key={index}
              name="chevron-forward"
              size={18}
              color="#E5E7EB"
            />
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#F9FAFB",
              borderRadius: 30,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#111827" }}
              >
                Novosibirsk
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#111827" />
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#111827" }}
              >
                Barnaul
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                Sep. 7
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: "#9CA3AF",
                  borderRadius: 2,
                }}
              />
              <Text style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                1 passenger
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F9FAFB",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/common/search-filter")}
          >
            <Ionicons name="options-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        {/* Date Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            marginTop: 16,
          }}
        >
          {dates.map((date) => (
            <TouchableOpacity
              key={date.value}
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  padding: 4,
                  borderRadius: 20,
                  backgroundColor: "#F9FAFB",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                },
                selectedDate === date.value && {
                  backgroundColor: "#EFF6FF",
                  borderColor: "#3B82F6",
                },
              ]}
              onPress={() => setSelectedDate(date.value)}
            >
              <View
                style={[
                  {
                    width: 32,
                    height: 32,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={selectedDate === date.value ? "#3B82F6" : "#6B7280"}
                />
              </View>

              <Text
                style={[
                  {
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#9CA3AF",
                    marginRight: 10,
                  },
                  selectedDate === date.value && { color: "#3B82F6" },
                ]}
              >
                {date.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F5F6F8", paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {/* Subscribe to Route */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 6,
            backgroundColor: "#FFFFFF",
            marginTop: 16,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827" }}>
            Subscribe to route
          </Text>
          <Switch
            value={subscribeToRoute}
            onValueChange={setSubscribeToRoute}
            trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
            thumbColor={subscribeToRoute ? "#3B82F6" : "#F3F4F6"}
          />
        </View>

        {/* Trip Cards */}
        <View style={styles.tripsContainer}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SearchScreen;

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
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  dateScrollView: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
  },
  dateScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateButtonActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#3B82F6",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  dateTextActive: {
    color: "#3B82F6",
  },

  subscribeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  tripsContainer: {
    paddingTop: 16,
    gap: 12,
  },

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
    backgroundColor: "#D4F564",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tripAmenityIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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
    gap: 8,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  driverInitial: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#6B7280",
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
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
