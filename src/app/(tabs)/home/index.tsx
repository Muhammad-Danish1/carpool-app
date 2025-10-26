import { SwipeCustomButton } from "@/src/components/ui";
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectDateBottomSheet } from "../../bottom-sheets/select-date";
import { SelectLocation } from "../../bottom-sheets/select-location";
import { SelectPassengerBottomSheet } from "../../bottom-sheets/select-pessenger";

const HomeScreen = () => {
  const bottomSheetPassengerRef = useRef<BottomSheetModal>(null);
  const bottomSheetDateRef = useRef<BottomSheetModal>(null);
  const bottomSheetFromLocationRef = useRef<BottomSheetModal>(null);
  const bottomSheetToLocationRef = useRef<BottomSheetModal>(null);

  // State for storing selected values
  const [fromLocation, setFromLocation] = useState({
    name: "Barnaul",
    description: "Altai Krai, Russia",
  });
  const [toLocation, setToLocation] = useState({
    name: "Novosibirsk",
    description: "Novosibirsk Oblast, Russia",
  });
  const [selectedDate, setSelectedDate] = useState("September 7");
  const [passengerCount, setPassengerCount] = useState(1);

  const handleSearch = () => {
    // router.push({
    //   pathname: "/(tabs)/trips/search",
    //   params: {
    //     from: fromLocation.name,
    //     to: toLocation.name,
    //     date: selectedDate,
    //     passengers: passengerCount.toString(),
    //   },
    // });
  };

  const handleSwapLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };

  return (
    <SafeAreaWrapper
      backgroundColor="#9DAFF9"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitlePart1}>Travel </Text>
            <View style={styles.headerEasyBadge}>
              <Text style={styles.headerEasyText}>easy</Text>
            </View>
          </View>

          <Text style={styles.headerTitlePart2}>
            travel <Text style={styles.headerHighlightText}>together</Text>!
          </Text>

          {/* From & To Section */}
          <View style={styles.locationContainer}>
            <Pressable
              style={styles.locationBox}
              onPress={() => bottomSheetFromLocationRef.current?.present()}
            >
              <Text style={styles.locationLabel}>From</Text>
              <Text style={styles.locationValue}>{fromLocation.name}</Text>
            </Pressable>

            <Pressable style={styles.swapButton} onPress={handleSwapLocations}>
              <Ionicons name="swap-horizontal" size={18} color="#333" />
            </Pressable>

            <Pressable
              style={styles.locationBox}
              onPress={() => bottomSheetToLocationRef.current?.present()}
            >
              <Text style={styles.locationLabel}>To</Text>
              <Text style={styles.locationValue}>{toLocation.name}</Text>
            </Pressable>
          </View>

          {/* Date */}
          <Pressable
            style={styles.dateButton}
            onPress={() => bottomSheetDateRef.current?.present()}
          >
            <View style={styles.dateIconContainer}>
              <MaterialIcons name="calendar-today" size={18} color="#333" />
            </View>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </Pressable>

          {/* Passenger */}
          <Pressable
            style={styles.passengerButton}
            onPress={() => bottomSheetPassengerRef.current?.present()}
          >
            <View style={styles.passengerIconContainer}>
              <MaterialIcons name="person-outline" size={22} color="#333" />
            </View>
            <Text style={styles.passengerText}>
              {passengerCount} passenger{passengerCount !== 1 ? "s" : ""}
            </Text>
          </Pressable>

          {/* search button */}
          <SwipeCustomButton title="Search Trip" onPress={() => {}} />
        </View>

        {/* Recent Search */}
        <View style={styles.recentSearchContainer}>
          <Text style={styles.sectionTitle}>Recent Search</Text>
          <View style={styles.recentSearchList}>
            {[1, 2].map((_, index) => (
              <TouchableOpacity key={index} style={styles.recentSearchItem}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <View style={styles.recentSearchIconContainer}>
                    <MaterialIcons
                      name="flight-takeoff"
                      size={22}
                      color="#333"
                    />
                  </View>
                  <View style={styles.recentSearchDetails}>
                    <View style={styles.recentSearchRoute}>
                      <Text style={styles.recentSearchRouteText}>Barnaul</Text>
                      <Ionicons name="arrow-forward" size={16} color="#333" />
                      <Text style={styles.recentSearchRouteText}>
                        Novosibirsk
                      </Text>
                    </View>
                    <View style={styles.recentSearchMeta}>
                      <Text style={styles.recentSearchMetaText}>Jan 2</Text>
                      <View style={styles.recentSearchMetaDot} />
                      <Text style={styles.recentSearchMetaText}>
                        2 passengers
                      </Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Service Info Section */}
        <View style={styles.serviceInfoContainer}>
          <Text style={styles.sectionTitle}>About the Service</Text>
          <View style={[styles.serviceInfoRow, { marginTop: 12 }]}>
            {[
              {
                icon: (
                  <MaterialIcons name="security" size={24} color="#10B981" />
                ),
                title: "Safe & Secure",
                description:
                  "Your safety is our priority with verified drivers",
              },
              {
                icon: <Ionicons name="time" size={24} color="#3B82F6" />,
                title: "On Time",
                description: "Punctual service with real-time tracking",
              },
            ].map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceInfoCard}
                onPress={() => router.push("/home/search")}
              >
                <View style={styles.serviceInfoIconContainer}>
                  {service.icon}
                </View>
                <Text style={styles.serviceInfoTitle}>{service.title}</Text>
                <Text style={styles.serviceInfoDescription}>
                  {service.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.serviceInfoRow}>
            {[
              {
                icon: (
                  <MaterialIcons
                    name="emoji-emotions"
                    size={24}
                    color="#10B981"
                  />
                ),
                title: "Great Service",
                description: "Great service with real-time tracking",
              },
              {
                icon: <Ionicons name="person" size={24} color="#3B82F6" />,
                title: "Professional Drivers",
                description: "Professional drivers with real-time tracking",
              },
            ].map((service, index) => (
              <View key={index} style={styles.serviceInfoCard}>
                <View style={styles.serviceInfoIconContainer}>
                  {service.icon}
                </View>
                <Text style={styles.serviceInfoTitle}>{service.title}</Text>
                <Text style={styles.serviceInfoDescription}>
                  {service.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sheets */}
      <SelectLocation
        bottomSheetModalRef={bottomSheetFromLocationRef}
        onSelectLocation={(location) => setFromLocation(location)}
        isFromLocation={true}
      />

      <SelectLocation
        bottomSheetModalRef={bottomSheetToLocationRef}
        onSelectLocation={(location) => setToLocation(location)}
        isFromLocation={false}
      />

      <SelectPassengerBottomSheet
        bottomSheetModalRef={bottomSheetPassengerRef}
        onSelectPassengers={(passengers) => setPassengerCount(passengers)}
      />

      <SelectDateBottomSheet
        bottomSheetModalRef={bottomSheetDateRef}
        onSelectDate={(date) => setSelectedDate(date)}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  headerContainer: {
    gap: 6,
    backgroundColor: "#9DAFF9",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitlePart1: {
    fontSize: 40,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    lineHeight: 48,
  },
  headerEasyBadge: {
    backgroundColor: "#EFFF59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerEasyText: {
    fontSize: 36,
    lineHeight: 28,
    fontWeight: "500",
    color: "#000",
  },
  headerTitlePart2: {
    fontSize: 40,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    lineHeight: 48,
  },
  headerHighlightText: {
    color: "#DBFF43",
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    marginTop: 8,
  },
  locationBox: {
    paddingVertical: 22,
    paddingHorizontal: 4,
    flex: 1,
    borderRadius: 24,
    backgroundColor: "#D3DBFC",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  locationLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  swapButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#9DAFF9",
  },
  dateButton: {
    backgroundColor: "#D3DBFC",
    padding: 6,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  dateIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  passengerButton: {
    backgroundColor: "#D3DBFC",
    padding: 6,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  passengerIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  passengerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  recentSearchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  recentSearchList: {
    gap: 6,
    marginTop: 12,
  },
  recentSearchItem: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12,
  },
  recentSearchIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  recentSearchDetails: {
    gap: 4,
  },
  recentSearchRoute: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recentSearchRouteText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  recentSearchMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  recentSearchMetaText: {
    fontSize: 12,
    color: "#C3C3C3",
    fontWeight: "500",
  },
  recentSearchMetaDot: {
    width: 4,
    height: 4,
    backgroundColor: "#C3C3C3",
    borderRadius: 2,
  },
  serviceInfoContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  serviceInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 6,
  },
  serviceInfoCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
  },
  serviceInfoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  serviceInfoDescription: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
    textAlign: "center",
  },
});

export default HomeScreen;
