import { CustomButton, SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTripById } from "../../../data/tripData";
import SeatBookingBottomSheet from "../../bottom-sheets/seat-booking";
import { TripRatingBottomSheet } from "../../bottom-sheets/trip-rating";

const TripDetailsScreen = () => {
  const params = useLocalSearchParams();
  const tripId = params.tripId as string;
  const trip = getTripById(tripId);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const tripRateBottomSheetModalRef = useRef<BottomSheetModal>(null);

  if (!trip) {
    return (
      <SafeAreaWrapper
        backgroundColor="#FFFFFF"
        statusBarStyle="dark-content"
        keyboardAvoidingView={true}
        edges={["top"]}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trip not found</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip Details</Text>
          <View style={styles.placeholderView} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, padding: 16, backgroundColor: "#F5F6F8" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            gap: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 200,
              backgroundColor: "#F8F9FA",
              borderRadius: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: 16,
                right: 16,
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="map" size={18} color="#111827" />
            </View>
          </View>
          <View style={styles.tripCard}>
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
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}
                >
                  {trip.departure}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
                >
                  street 123, floor 3
                </Text>
              </View>

              <View style={styles.arrivalInfo}>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}
                >
                  {trip.destination}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
                >
                  street 123, floor 3,
                </Text>
              </View>
            </View>
            <View style={styles.tripTimeAndRoute}>
              <View style={styles.departureInfo}>
                <Text style={styles.timeText}>{trip.departureTime}</Text>
                <Text
                  style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
                >
                  Sep 14, 2025
                </Text>
              </View>

              <View style={styles.tripDurationInfo}>
                <Text style={styles.durationText}>{trip.duration}</Text>
                <View style={styles.durationDot} />
                <Text style={styles.durationText}>{trip.distance}</Text>
              </View>

              <View style={styles.arrivalInfo}>
                <Text style={styles.timeText}>{trip.arrivalTime}</Text>
                <Text
                  style={{ fontSize: 12, color: "#BBBBBB", fontWeight: "400" }}
                >
                  Sep 14, 2025,
                </Text>
              </View>
            </View>

            <View style={styles.tripDriverAndPriceInfo}>
              <View
                style={{
                  backgroundColor: "#DBFF43",
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="time" size={18} color="#111827" />
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}
                >
                  Departure soon
                </Text>
              </View>

              <View style={styles.priceInfo}>
                <Text style={styles.priceText}>{trip.price}</Text>
                <Text style={styles.seatsAvailableText}>
                  {trip.seats} seats available
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => router.push("/common/driver-profile")}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Driver
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#3B82F6",
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {trip.driverName[0]}
                  </Text>
                </View>
                <View style={{ marginLeft: 6, gap: 4 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#111827",
                    }}
                  >
                    {trip.driverName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#BBBBBB",
                      fontWeight: "400",
                    }}
                  >
                    <Ionicons
                      name="star"
                      size={12}
                      color="#FBBF24"
                      style={{ marginRight: 4 }}
                    />
                    {trip.rating} ({trip.driverReviews} reviews)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F9FAFB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="#111827"
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#3B82F6",
                  gap: 8,
                  flex: 1,
                }}
              >
                <Ionicons name="call-outline" size={24} color="#3B82F6" />
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#3B82F6" }}
                >
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#3B82F6",
                  gap: 8,
                  flex: 1,
                }}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#3B82F6" />
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#3B82F6" }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Driver&apos;s comments
          </Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#CACACA",
                fontWeight: "400",
                lineHeight: 20,
                textAlign: "justify",
              }}
            >
              {trip.driverComment}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Transport
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
            }}
            onPress={() => router.push(`/common/transport-detail`)}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#3B82F6",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {trip.vehicle[0]}
                </Text>
              </View>
              <View style={{ marginLeft: 6, gap: 4 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {trip.vehicle}
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#BBBBBB",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#BBBBBB",
                      fontWeight: "400",
                    }}
                  >
                    white
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F9FAFB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="#111827"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Passengers
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingVertical: 28,
                paddingHorizontal: 28,
                gap: 8,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F9FAFB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="add" size={24} color="#111827" />
              </View>
              <Text
                style={{ fontSize: 14, fontWeight: "400", color: "#3B82F6" }}
              >
                Reserve a seat!
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                height: "100%",
              }}
            >
              {trip.passengers.map((passenger) => (
                <TouchableOpacity
                  key={passenger.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    height: "100%",
                    gap: 8,
                  }}
                  onPress={() => router.push(`/common/passenger-detail`)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#3B82F6",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#FFFFFF",
                        }}
                      >
                        {passenger.name[0]}
                      </Text>
                    </View>
                    <View
                      style={{
                        gap: 4,
                        marginLeft: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#111827",
                        }}
                      >
                        {passenger.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Ionicons name="star" size={16} color="#FBBF24" />
                        <Text>3 (3 reviews)</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          backgroundColor: "#F9FAFB",
                        }}
                      >
                        <Ionicons
                          name={passenger.gender === "male" ? "male" : "female"}
                          size={20}
                          color="#7F7E7E"
                        />
                      </View>

                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#7F7E7E",
                          textTransform: "capitalize",
                        }}
                      >
                        {passenger.gender}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          backgroundColor: "#F9FAFB",
                        }}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={18}
                          color="#7F7E7E"
                        />
                      </View>

                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#7F7E7E",
                          textTransform: "capitalize",
                        }}
                      >
                        {passenger.age}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Amenities
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {[
              "Only two in the back",
              "Pet-friendly",
              "Instant booking",
              "Smoking Allowed",
              "No Pets",
              "Child seat available",
            ].map((amenity) => (
              <View
                key={amenity}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={24}
                  color="#BBBBBB"
                />

                <Text
                  style={{ fontSize: 14, color: "#111827", fontWeight: "400" }}
                >
                  {amenity}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          <CustomButton
            title="Complain"
            onPress={() => router.push("../../common/complain")}
            style={{
              marginTop: 20,
              paddingVertical: 18,
              width: "100%",
              borderColor: "#F2C7AB",
            }}
            textStyle={{
              color: "#F7867C",
            }}
          />
          <CustomButton
            title="Book Trip"
            onPress={() => bottomSheetModalRef.current?.present()}
            size="w-full"
            style={{
              marginTop: 20,
              backgroundColor: "#000000",
              paddingVertical: 18,
            }}
            textStyle={{
              color: "#FFFFFF",
            }}
          />
          <CustomButton
            title="Rate Trip"
            onPress={() => tripRateBottomSheetModalRef.current?.present()}
            size="w-full"
            style={{
              marginTop: 20,
              backgroundColor: "#000000",
              paddingVertical: 18,
            }}
            textStyle={{
              color: "#FFFFFF",
            }}
          />
        </View>
      </ScrollView>
      <SeatBookingBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onConfirmBooking={() => {}}
      />
      <TripRatingBottomSheet
        bottomSheetModalRef={tripRateBottomSheetModalRef}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholderView: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    gap: 6,
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
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tripAmenityIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    width: "27%",
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
    marginTop: 6,
  },
  driverDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
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
    fontSize: 12,
    color: "#A6A6A8",
    fontWeight: "500",
  },

  backButton: {
    padding: 4,
  },

  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
    backgroundColor: "#F8F9FA",
    position: "relative",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
  },
  routePath: {
    alignItems: "center",
  },
  startPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  endPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  pointLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  pathLine: {
    width: 2,
    height: 40,
    backgroundColor: "#4CAF50",
  },
  routeInfo: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  routeTime: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  routeDetails: {
    fontSize: 12,
    color: "#666666",
    marginVertical: 2,
  },
  routePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B82F6",
  },
  viewMapButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  viewMapText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  messageButton: {
    padding: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  transportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 12,
  },
  carIcon: {
    marginRight: 12,
  },
  transportText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  passengersList: {
    gap: 12,
  },
  passengerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  passengerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  passengerInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  passengerDetails: {
    fontSize: 12,
    color: "#666666",
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    width: "48%",
  },
  amenityText: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 8,
    fontWeight: "500",
  },
  passengerSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  passengerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passengerCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 24,
  },
  bookingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  tripActionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  actionButtonLarge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F9FF",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  actionButtonLargeText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 8,
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

export default TripDetailsScreen;
