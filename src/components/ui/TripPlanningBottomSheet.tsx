import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "./Button";

interface TripPlanningBottomSheetProps {
  onClose?: () => void;
  onSearch?: (data: TripData) => void;
}

interface TripData {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
}

const TripPlanningBottomSheet = forwardRef<
  BottomSheet,
  TripPlanningBottomSheetProps
>(({ onClose, onSearch }, ref) => {
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const [tripData, setTripData] = useState<TripData>({
    departure: "",
    destination: "",
    date: "",
    passengers: 1,
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(tripData);
    }
    if (onClose) {
      onClose();
    }
  };

  const incrementPassengers = () => {
    setTripData((prev) => ({
      ...prev,
      passengers: Math.min(prev.passengers + 1, 8),
    }));
  };

  const decrementPassengers = () => {
    setTripData((prev) => ({
      ...prev,
      passengers: Math.max(prev.passengers - 1, 1),
    }));
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Plan Your Trip</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Location Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Where to?</Text>

            <View style={styles.locationContainer}>
              <View style={styles.locationInputWrapper}>
                <View style={styles.locationIcon}>
                  <View style={styles.departureIcon} />
                </View>
                <TextInput
                  style={styles.locationInput}
                  placeholder="From"
                  value={tripData.departure}
                  onChangeText={(text) =>
                    setTripData((prev) => ({ ...prev, departure: text }))
                  }
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <TouchableOpacity style={styles.swapButton}>
                <MaterialIcons name="swap-vert" size={20} color="#666" />
              </TouchableOpacity>

              <View style={styles.locationInputWrapper}>
                <View style={styles.locationIcon}>
                  <Ionicons name="location" size={16} color="#FF6B6B" />
                </View>
                <TextInput
                  style={styles.locationInput}
                  placeholder="To"
                  value={tripData.destination}
                  onChangeText={(text) =>
                    setTripData((prev) => ({ ...prev, destination: text }))
                  }
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Date Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>When?</Text>
            <TouchableOpacity style={styles.dateSelector}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.dateText}>
                {tripData.date || "Select Date"}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Passenger Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Passengers</Text>
            <View style={styles.passengerSelector}>
              <View style={styles.passengerInfo}>
                <FontAwesome5 name="user" size={16} color="#666" />
                <Text style={styles.passengerText}>
                  {tripData.passengers} passenger
                  {tripData.passengers > 1 ? "s" : ""}
                </Text>
              </View>
              <View style={styles.passengerControls}>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={decrementPassengers}
                >
                  <Ionicons name="remove" size={20} color="#666" />
                </TouchableOpacity>
                <Text style={styles.passengerCount}>{tripData.passengers}</Text>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={incrementPassengers}
                >
                  <Ionicons name="add" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Search Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Search Trips"
              onPress={handleSearch}
              variant="filled"
              size="w-full"
            />
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  handleIndicator: {
    backgroundColor: "#E5E7EB",
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  closeButton: {
    padding: 4,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  locationContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  locationInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  departureIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 0,
  },
  swapButton: {
    alignSelf: "center",
    padding: 8,
    marginVertical: 4,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  passengerSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  passengerText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  passengerControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  passengerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 32,
    paddingBottom: 20,
  },
});

TripPlanningBottomSheet.displayName = "TripPlanningBottomSheet";

export default TripPlanningBottomSheet;
