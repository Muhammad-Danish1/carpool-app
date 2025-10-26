import CustomInput from "@/src/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const locations = [
  {
    id: "1",
    name: "Barnaul",
    description: "Altai Krai, Russia",
    distance: "243km",
  },
  {
    id: "2",
    name: "Novosibirsk",
    description: "Novosibirsk Oblast, Russia",
    distance: "230km",
  },
  {
    id: "3",
    name: "Biysk",
    description: "Altai Krai, Russia",
    distance: "87km",
  },
  {
    id: "4",
    name: "Kemerovo",
    description: "Kemerovo Oblast, Russia",
    distance: "350km",
  },
  {
    id: "5",
    name: "Tomsk",
    description: "Tomsk Oblast, Russia",
    distance: "400km",
  },
  {
    id: "6",
    name: "Krasnoyarsk",
    description: "Krasnoyarsk Krai, Russia",
    distance: "500km",
  },
  {
    id: "7",
    name: "Omsk",
    description: "Omsk Oblast, Russia",
    distance: "280km",
  },
  {
    id: "8",
    name: "Novokuznetsk",
    description: "Kemerovo Oblast, Russia",
    distance: "380km",
  },
];

interface SelectLocationProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  onSelectLocation: (location: { name: string; description: string }) => void;
  isFromLocation?: boolean;
}

export const SelectLocation: React.FC<SelectLocationProps> = ({
  bottomSheetModalRef,
  onSelectLocation,
  isFromLocation = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: {
    name: string;
    description: string;
  }) => {
    setSelectedLocation(location.name);
    onSelectLocation(location);
    bottomSheetModalRef.current?.close();
  };

  const renderLocationItem = ({ item }: { item: (typeof locations)[0] }) => (
    <Pressable
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        },
        selectedLocation === item.name && styles.selectedLocationItem,
      ]}
      onPress={() => handleLocationSelect(item)}
    >
      <FontAwesome name="circle-o-notch" size={22} color="#666" />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
          <Text style={styles.locationDescription}>{item.description}</Text>
        </View>
        <Text style={styles.locationDescription}>{item.distance}</Text>
      </View>
    </Pressable>
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={["90%"]}
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
          paddingTop: 6,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {isFromLocation ? "From" : "To"}
        </Text>
        <CustomInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ backgroundColor: "#F3F4F6" }}
          leftComponent={
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <Ionicons name="search" size={20} color="#666" />
            </View>
          }
          rightComponent={
            <View
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <Ionicons name="close" size={20} color="#666" />
            </View>
          }
        />
        <FlatList
          data={filteredLocations}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id}
          style={styles.locationList}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  locationList: {
    paddingHorizontal: 6,
  },
  locationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  selectedLocationItem: {
    backgroundColor: "#F3F4F6",
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
};

export default SelectLocation;
