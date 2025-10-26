import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TripData } from "../../data/tripData";

interface RatingModalProps {
  trip?: TripData;
  onSubmitRating: (rating: number, feedback: string) => void;
  onClose: () => void;
}

const RatingModal = forwardRef<BottomSheet, RatingModalProps>(
  ({ trip, onSubmitRating, onClose }, ref) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const snapPoints = useMemo(() => ["70%"], []);

    const handleSubmit = () => {
      if (rating > 0) {
        onSubmitRating(rating, feedback);
        setRating(0);
        setFeedback("");
        onClose();
      }
    };

    const StarRating = () => {
      return (
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={32}
                color={star <= rating ? "#FBBF24" : "#D1D5DB"}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    if (!trip) return null;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        onClose={onClose}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        enablePanDownToClose
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Trip Rating</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Trip Info */}
          <View style={styles.tripInfo}>
            <Text style={styles.tripRoute}>
              {trip.departure} → {trip.destination}
            </Text>
            <Text style={styles.tripDate}>{trip.date}</Text>
          </View>

          {/* Driver Info */}
          <View style={styles.driverSection}>
            <Text style={styles.sectionTitle}>How do you rate your trip?</Text>
            <View style={styles.driverCard}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitial}>{trip.driverPhoto}</Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{trip.driverName}</Text>
                <Text style={styles.driverVehicle}>{trip.vehicle}</Text>
              </View>
            </View>
          </View>

          {/* Rating Stars */}
          <View style={styles.ratingSection}>
            <StarRating />
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </Text>
            )}
          </View>

          {/* Feedback Input */}
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackLabel}>
              What did you like most about your trip?
            </Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Share your experience (optional)"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              rating === 0 && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={rating === 0}
          >
            <Text
              style={[
                styles.submitButtonText,
                rating === 0 && styles.submitButtonTextDisabled,
              ]}
            >
              Send Feedback
            </Text>
          </TouchableOpacity>
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
  },
  handleIndicator: {
    backgroundColor: "#D1D5DB",
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
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  closeButton: {
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
  tripInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  tripRoute: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  driverSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  driverVehicle: {
    fontSize: 14,
    color: "#6B7280",
  },
  ratingSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FBBF24",
  },
  feedbackSection: {
    marginBottom: 24,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 12,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  submitButtonTextDisabled: {
    color: "#9CA3AF",
  },
});

RatingModal.displayName = "RatingModal";

export default RatingModal;
