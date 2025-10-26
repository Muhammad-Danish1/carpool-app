import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomButton } from "./Button";

interface FilterBottomSheetProps {
  onClose?: () => void;
  onApplyFilters?: (filters: FilterData) => void;
}

interface FilterData {
  priceRange: [number, number];
  departureTime: string[];
  busType: string[];
  amenities: string[];
  rating: number;
}

const FilterBottomSheet = forwardRef<BottomSheet, FilterBottomSheetProps>(
  ({ onClose, onApplyFilters }, ref) => {
    const snapPoints = useMemo(() => ["75%", "90%"], []);

    const [filters, setFilters] = useState<FilterData>({
      priceRange: [500, 5000],
      departureTime: [],
      busType: [],
      amenities: [],
      rating: 0,
    });

    const departureTimeOptions = [
      {
        id: "early",
        label: "Early Morning",
        time: "6:00 - 9:00 AM",
        icon: "sunny",
      },
      {
        id: "morning",
        label: "Morning",
        time: "9:00 - 12:00 PM",
        icon: "partly-sunny",
      },
      {
        id: "afternoon",
        label: "Afternoon",
        time: "12:00 - 6:00 PM",
        icon: "cloudy",
      },
      {
        id: "evening",
        label: "Evening",
        time: "6:00 - 11:00 PM",
        icon: "moon",
      },
    ];

    const busTypeOptions = [
      { id: "economy", label: "Economy", icon: "bus" },
      { id: "business", label: "Business", icon: "business" },
      { id: "luxury", label: "Luxury", icon: "diamond" },
    ];

    const amenityOptions = [
      { id: "wifi", label: "WiFi", icon: "wifi" },
      { id: "ac", label: "Air Conditioning", icon: "snow" },
      { id: "charging", label: "Charging Port", icon: "battery-charging" },
      { id: "entertainment", label: "Entertainment", icon: "tv" },
      { id: "meals", label: "Meals", icon: "restaurant" },
      { id: "blanket", label: "Blanket", icon: "bed" },
    ];

    const toggleFilter = (category: keyof FilterData, value: string) => {
      setFilters((prev) => {
        const currentValues = prev[category] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];

        return {
          ...prev,
          [category]: newValues,
        };
      });
    };

    const handleApplyFilters = () => {
      if (onApplyFilters) {
        onApplyFilters(filters);
      }
      if (onClose) {
        onClose();
      }
    };

    const clearAllFilters = () => {
      setFilters({
        priceRange: [500, 5000],
        departureTime: [],
        busType: [],
        amenities: [],
        rating: 0,
      });
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity
              onPress={clearAllFilters}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Show First */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Show First</Text>
              <View style={styles.optionsList}>
                <TouchableOpacity style={styles.optionRow}>
                  <View style={styles.radioButton}>
                    <View style={styles.radioButtonInner} />
                  </View>
                  <Text style={styles.optionText}>Cheapest trips</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionRow}>
                  <View style={styles.radioButton} />
                  <Text style={styles.optionText}>Earliest rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionRow}>
                  <View style={styles.radioButton} />
                  <Text style={styles.optionText}>Shortest travel times</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Departure Time */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Departure Time</Text>
              <View style={styles.timeGrid}>
                <TouchableOpacity
                  style={[styles.timeChip, styles.timeChipActive]}
                >
                  <Ionicons name="sunny" size={20} color="#FFFFFF" />
                  <Text style={styles.timeChipTextActive}>Morning</Text>
                  <Text style={styles.timeSubTextActive}>06:00 - 12:00</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeChip}>
                  <Ionicons name="partly-sunny" size={20} color="#666666" />
                  <Text style={styles.timeChipText}>Day</Text>
                  <Text style={styles.timeSubText}>12:00 - 18:00</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeChip}>
                  <Ionicons name="moon" size={20} color="#666666" />
                  <Text style={styles.timeChipText}>Evening</Text>
                  <Text style={styles.timeSubText}>18:00 - 00:00</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeChip}>
                  <Ionicons name="moon" size={20} color="#666666" />
                  <Text style={styles.timeChipText}>Night</Text>
                  <Text style={styles.timeSubText}>00:00 - 06:00</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Safety */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Safety</Text>
              <View style={styles.safetyOptions}>
                <View style={styles.safetyRow}>
                  <View style={styles.safetyIcon}>
                    <MaterialIcons
                      name="verified-user"
                      size={20}
                      color="#4CAF50"
                    />
                  </View>
                  <Text style={styles.safetyText}>Verified Profile</Text>
                  <TouchableOpacity
                    style={[styles.toggle, styles.toggleActive]}
                  >
                    <View
                      style={[styles.toggleThumb, styles.toggleThumbActive]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.safetyRow}>
                  <View style={styles.safetyIcon}>
                    <MaterialIcons name="wc" size={20} color="#FF9800" />
                  </View>
                  <Text style={styles.safetyText}>Only for Women</Text>
                  <TouchableOpacity style={styles.toggle}>
                    <View style={styles.toggleThumb} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bus Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bus Type</Text>
              <View style={styles.optionsRow}>
                {busTypeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.busTypeOption,
                      filters.busType.includes(option.id) &&
                        styles.selectedOption,
                    ]}
                    onPress={() => toggleFilter("busType", option.id)}
                  >
                    <MaterialIcons
                      name={option.icon as any}
                      size={24}
                      color={
                        filters.busType.includes(option.id)
                          ? "#FFFFFF"
                          : "#6B7280"
                      }
                    />
                    <Text
                      style={[
                        styles.optionLabel,
                        filters.busType.includes(option.id) &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Amenities */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesGrid}>
                <TouchableOpacity
                  style={[styles.amenityChip, styles.amenityChipActive]}
                >
                  <Ionicons name="car" size={16} color="#FFFFFF" />
                  <Text style={styles.amenityTextActive}>
                    Only two in the back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <MaterialIcons name="pets" size={16} color="#666666" />
                  <Text style={styles.amenityText}>Pet-friendly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <MaterialIcons name="book" size={16} color="#666666" />
                  <Text style={styles.amenityText}>Instant booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <MaterialIcons
                    name="smoking-rooms"
                    size={16}
                    color="#666666"
                  />
                  <Text style={styles.amenityText}>Smoking Allowed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <Ionicons name="close-circle" size={16} color="#666666" />
                  <Text style={styles.amenityText}>No Pets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={16} color="#666666" />
                  <Text style={styles.amenityText}>Child seat available</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <MaterialIcons name="luggage" size={16} color="#666666" />
                  <Text style={styles.amenityText}>Space for Luggage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amenityChip}>
                  <MaterialIcons
                    name="smoking-disabled"
                    size={16}
                    color="#666666"
                  />
                  <Text style={styles.amenityText}>No Smoking</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={styles.ratingOption}
                    onPress={() => setFilters((prev) => ({ ...prev, rating }))}
                  >
                    <Ionicons
                      name={filters.rating >= rating ? "star" : "star-outline"}
                      size={24}
                      color={filters.rating >= rating ? "#FBBF24" : "#D1D5DB"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Apply Filters"
              onPress={handleApplyFilters}
              variant="filled"
              size="w-full"
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

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
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "500",
  },
  closeButton: {
    padding: 8,
  },
  optionsList: {
    gap: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeChip: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeChipActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
  },
  timeChipTextActive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 8,
  },
  timeSubText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  timeSubTextActive: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 4,
  },
  safetyOptions: {
    gap: 16,
  },
  safetyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  safetyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  safetyText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    padding: 2,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#3B82F6",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },
  amenityChipActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  amenityText: {
    fontSize: 12,
    color: "#374151",
    marginLeft: 6,
    fontWeight: "500",
  },
  amenityTextActive: {
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "500",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  priceRangeContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
  },
  priceRangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  priceSliderPlaceholder: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    position: "relative",
  },
  priceSlider: {
    height: 4,
    backgroundColor: "#000000",
    borderRadius: 2,
    width: "60%",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeOption: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  busTypeOption: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amenityOption: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  amenityLabel: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    fontWeight: "500",
  },
  selectedOption: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 8,
    textAlign: "center",
  },
  optionSubLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
  },
  ratingOption: {
    padding: 8,
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
});

FilterBottomSheet.displayName = "FilterBottomSheet";

export default FilterBottomSheet;
