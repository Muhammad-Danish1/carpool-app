import { CustomBottomSheetModal } from "@/src/components/ui/BottomSheetModal";
import CustomInput from "@/src/components/ui/Input";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const countryCodes = [
  { id: "1", code: "+7", country: "Russia", name: "Novo" },
  { id: "2", code: "+1", country: "United States", name: "United States" },
  // Add more country codes as needed
];

interface CountryCodeProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCountryCode: (code: string) => void;
}

export const CountryCode: React.FC<CountryCodeProps> = ({
  isVisible,
  onClose,
  onSelectCountryCode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const filteredCountryCodes = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  const handleCountryCodeSelect = (code: string) => {
    setSelectedCountryCode(code);
  };

  const handleApply = () => {
    if (selectedCountryCode) {
      onSelectCountryCode(selectedCountryCode);
      onClose();
    }
  };

  const renderCountryCodeItem = ({
    item,
  }: {
    item: (typeof countryCodes)[0];
  }) => (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        },
        selectedCountryCode === item.code && { backgroundColor: "#F3F4F6" },
      ]}
      onPress={() => handleCountryCodeSelect(item.code)}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.country}</Text>
      <Text style={{ fontSize: 14, color: "#6B7280" }}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <CustomBottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      onApply={handleApply}
      title="Select Country Code"
    >
      <View style={styles.container}>
        <CustomInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredCountryCodes}
          renderItem={renderCountryCodeItem}
          keyExtractor={(item) => item.id}
          style={styles.countryCodeList}
        />
      </View>
    </CustomBottomSheetModal>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  countryCodeList: {
    marginTop: 16,
  },
  countryCodeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  selectedCountryCodeItem: {
    backgroundColor: "#F3F4F6",
  },
  countryName: {
    fontSize: 16,
    fontWeight: "600",
  },
  countryCode: {
    fontSize: 14,
    color: "#6B7280",
  },
};

export default CountryCode;
