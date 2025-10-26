import { CustomButton } from "@/src/components/ui";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface PassengerSelectionProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  onSelectPassengers: (passengers: number) => void;
}

export const SelectPassengerBottomSheet: React.FC<PassengerSelectionProps> = ({
  bottomSheetModalRef,
  onSelectPassengers,
}) => {
  const [passengerCount, setPassengerCount] = useState(1);
  const snapPoints = useMemo(() => ["35%"], []);
  const incrementPassengers = () => {
    setPassengerCount((prev) => prev + 1);
  };

  const decrementPassengers = () => {
    if (passengerCount > 1) {
      setPassengerCount((prev) => prev - 1);
    }
  };

  const handleApply = () => {
    onSelectPassengers(passengerCount);
    bottomSheetModalRef.current?.close();
  };

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
          paddingHorizontal: 16,
          paddingTop: 12,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Number of Passengers
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            paddingVertical: 16,
            alignSelf: "center",
          }}
        >
          <Pressable
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#F3F4F6",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={decrementPassengers}
          >
            <MaterialIcons name="remove" size={24} color="#666" />
          </Pressable>
          <Text style={{ fontSize: 52, fontWeight: "600" }}>
            {passengerCount}
          </Text>
          <Pressable
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#F3F4F6",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={incrementPassengers}
          >
            <FontAwesome6 name="add" size={20} color="#666" />
          </Pressable>
        </View>
        <View style={{ marginRight: 8, flex: 1 }}>
          <CustomButton
            title="Apply"
            variant="filled"
            size="w-full"
            onPress={handleApply}
            style={{ width: "100%", paddingVertical: 18 }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  passengerCounter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  passengerCountText: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default SelectPassengerBottomSheet;
