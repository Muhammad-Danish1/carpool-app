import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTripById } from "../../../data/tripData";

const { width, height } = Dimensions.get("window");

const RouteMapScreen = () => {
  const params = useLocalSearchParams();
  const tripId = params.tripId as string;
  const trip = getTripById(tripId);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");

  if (!trip) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trip not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleMapType = () => {
    setMapType(mapType === "standard" ? "satellite" : "standard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header Overlay */}
      <View style={styles.headerOverlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Route Map</Text>
          <Text style={styles.headerSubtitle}>
            {trip.departure} → {trip.destination}
          </Text>
        </View>
        <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
          <MaterialIcons
            name={mapType === "standard" ? "satellite" : "map"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        {/* Map Placeholder with Route */}
        <View
          style={[
            styles.mapPlaceholder,
            { backgroundColor: mapType === "standard" ? "#E8F5E8" : "#2D3748" },
          ]}
        >
          {/* Route Visualization */}
          <View style={styles.routeVisualization}>
            {/* Starting Point */}
            <View style={styles.startLocation}>
              <View style={styles.startPin}>
                <Ionicons name="radio-button-on" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.locationLabel}>{trip.departure}</Text>
            </View>

            {/* Route Path */}
            <View style={styles.routePath}>
              <View style={styles.pathLine} />
              <View style={styles.pathDots}>
                <View style={styles.pathDot} />
                <View style={styles.pathDot} />
                <View style={styles.pathDot} />
              </View>
            </View>

            {/* Destination Point */}
            <View style={styles.endLocation}>
              <View style={styles.endPin}>
                <Ionicons name="location" size={20} color="#FF6B6B" />
              </View>
              <Text style={styles.locationLabel}>{trip.destination}</Text>
            </View>
          </View>

          {/* Distance Info */}
          <View style={styles.distanceInfo}>
            <Text style={styles.distanceText}>{trip.distance}</Text>
            <Text style={styles.durationText}>{trip.duration}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Info Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.tripInfo}>
          <View style={styles.tripTimeRow}>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>{trip.departureTime}</Text>
            </View>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>{trip.arrivalTime}</Text>
            </View>
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Duration</Text>
              <Text style={styles.timeValue}>{trip.duration}</Text>
            </View>
          </View>

          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>{trip.driverPhoto}</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{trip.driverName}</Text>
              <Text style={styles.vehicleText}>{trip.vehicle}</Text>
            </View>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="call" size={20} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="add" size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="remove" size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="my-location" size={24} color="#374151" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E5E7EB",
    marginTop: 2,
  },
  mapTypeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  routeVisualization: {
    alignItems: "center",
    height: 300,
    justifyContent: "space-between",
  },
  startLocation: {
    alignItems: "center",
  },
  endLocation: {
    alignItems: "center",
  },
  startPin: {
    marginBottom: 8,
  },
  endPin: {
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  routePath: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  pathLine: {
    width: 4,
    height: 120,
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
  pathDots: {
    position: "absolute",
    alignItems: "center",
    gap: 20,
  },
  pathDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  distanceInfo: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  durationText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  bottomPanel: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tripInfo: {
    gap: 20,
  },
  tripTimeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 16,
  },
  timeInfo: {
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontWeight: "500",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  vehicleText: {
    fontSize: 14,
    color: "#6B7280",
  },
  contactButtons: {
    flexDirection: "row",
    gap: 12,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  mapControls: {
    position: "absolute",
    right: 20,
    bottom: 200,
    gap: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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

export default RouteMapScreen;
