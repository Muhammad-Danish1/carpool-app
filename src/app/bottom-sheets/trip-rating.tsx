import { CustomButton } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Companion {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar?: string;
}

interface TripRatingBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  companions?: Companion[];
  isDriver?: boolean;
}

export const TripRatingBottomSheet: React.FC<TripRatingBottomSheetProps> = ({
  bottomSheetModalRef,
  companions = [
    { id: "1", name: "Nikita", location: "Novosibirsk-Irkutsk", rating: 5.0 },
    { id: "2", name: "Tatyana", location: "", rating: 5.0 },
    { id: "3", name: "Maxim", location: "", rating: 5.0 },
  ],
  isDriver = false,
}) => {
  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedCompanions, setSelectedCompanions] = useState<string[]>([]);

  const toggleCompanion = (id: string) => {
    setSelectedCompanions((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    bottomSheetModalRef.current?.dismiss();
    router.push({
      pathname: "/common/trip-rating",
      params: { fromDriver: isDriver ? "true" : "false" },
    });
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Rate your trip companions</Text>
        <Text style={styles.subtitle}>
          Select which trip companions you would like to rate
        </Text>

        <View style={styles.companionsList}>
          {companions.map((companion) => {
            const isSelected = selectedCompanions.includes(companion.id);
            return (
              <TouchableOpacity
                key={companion.id}
                style={styles.companionItem}
                onPress={() => toggleCompanion(companion.id)}
              >
                <View style={styles.companionInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {companion.name.charAt(0)}
                    </Text>
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                  </View>
                  <View style={styles.companionDetails}>
                    <Text style={styles.companionName}>{companion.name}</Text>
                    {companion.location && (
                      <Text style={styles.companionLocation}>
                        {companion.location}
                      </Text>
                    )}
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FBBF24" />
                      <Text style={styles.ratingText}>
                        {companion.rating.toFixed(1)} (reviews)
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="#3B82F6" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomButton
          title="Next"
          onPress={handleNext}
          variant="filled"
          size="w-full"
          style={styles.nextButton}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#1F2937",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: "#4B5563",
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
  },
  companionsList: {
    flex: 1,
    gap: 12,
  },
  companionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 12,
  },
  companionInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    position: "relative",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#374151",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  companionDetails: {
    flex: 1,
  },
  companionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  companionLocation: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6B7280",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    marginTop: 16,
  },
});
