// import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const PassengerDetailScreen = () => {
//   return (
//     <SafeAreaWrapper
//       backgroundColor="#FFFFFF"
//       statusBarStyle="dark-content"
//       keyboardAvoidingView={false}
//       edges={["top"]}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity
//             style={styles.headerButton}
//             onPress={() => router.back()}
//             accessibilityLabel="Go back"
//           >
//             <Ionicons name="chevron-back" size={24} color="#374151" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Passengers Details</Text>
//           <View style={styles.placeholderView} />
//         </View>
//       </View>

//       {/* Content */}
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//       >
//         {/* Passenger Profile Card */}
//         <View style={styles.profileCard}>
//           <View style={styles.avatarWrapper}>
//             <Image
//               source={{
//                 uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
//               }}
//               style={styles.avatar}
//             />
//           </View>
//           <Text style={styles.passengerName}>Natalia</Text>

//           {/* Stats Row */}
//           <View style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <Ionicons name="star" size={14} color="#F59E0B" />
//               <Text style={styles.statText}>5.0</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statText}>3 years on service</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.statItem}>
//               <Text style={styles.statText}>26 y.o.</Text>
//             </View>
//           </View>
//         </View>

//         {/* Profile Verification */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Profile Verification</Text>
//           <View style={styles.verificationList}>
//             <View style={styles.verificationItem}>
//               <Ionicons name="mail-outline" size={20} color="#374151" />
//               <Text style={styles.verificationText}>Email confirmed</Text>
//             </View>
//             <View style={styles.verificationItem}>
//               <Ionicons name="call-outline" size={20} color="#374151" />
//               <Text style={styles.verificationText}>
//                 Phone number confirmed
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* About Me */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>About Me</Text>
//           <View style={styles.aboutCard}>
//             <Text style={styles.aboutText}>
//               Hi! I love to travel and meet new people. I have interesting
//               conversations and enjoy sharing experiences on the road.
//             </Text>
//           </View>
//         </View>

//         {/* Travel Preferences */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Travel Preferences</Text>
//           <View style={styles.preferencesGrid}>
//             <View style={styles.preferenceItem}>
//               <View style={styles.preferenceIcon}>
//                 <Ionicons
//                   name="chatbubbles-outline"
//                   size={20}
//                   color="#374151"
//                 />
//               </View>
//               <Text style={styles.preferenceText}>Not averse to chatting</Text>
//             </View>
//             <View style={styles.preferenceItem}>
//               <View style={styles.preferenceIcon}>
//                 <Ionicons
//                   name="musical-notes-outline"
//                   size={20}
//                   color="#374151"
//                 />
//               </View>
//               <Text style={styles.preferenceText}>Turn the music up!</Text>
//             </View>
//           </View>
//         </View>

//         {/* Reviews */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Reviews</Text>
//           <View style={styles.reviewsList}>
//             <View style={styles.reviewItem}>
//               <View style={styles.reviewHeader}>
//                 <View style={styles.reviewerInfo}>
//                   <View style={styles.reviewerAvatar}>
//                     <Text style={styles.reviewerInitial}>D</Text>
//                   </View>
//                   <Text style={styles.reviewerName}>Daniel</Text>
//                 </View>
//                 <View style={styles.ratingBadge}>
//                   <Ionicons name="star" size={12} color="#FFFFFF" />
//                   <Text style={styles.ratingText}>3.5</Text>
//                 </View>
//               </View>
//               <Text style={styles.reviewText} numberOfLines={2}>
//                 It&apos;s a nice and understanding. I didn&apos;t arrive at the
//                 meeting point on time, but she was understanding.
//               </Text>
//             </View>

//             <View style={styles.reviewItem}>
//               <View style={styles.reviewHeader}>
//                 <View style={styles.reviewerInfo}>
//                   <View
//                     style={[
//                       styles.reviewerAvatar,
//                       { backgroundColor: "#F59E0B" },
//                     ]}
//                   >
//                     <Text style={styles.reviewerInitial}>A</Text>
//                   </View>
//                   <Text style={styles.reviewerName}>Alex</Text>
//                 </View>
//                 <View style={styles.ratingBadge}>
//                   <Ionicons name="star" size={12} color="#FFFFFF" />
//                   <Text style={styles.ratingText}>5.0</Text>
//                 </View>
//               </View>
//               <Text style={styles.reviewText} numberOfLines={2}>
//                 Great passenger! Very friendly and punctual. Highly recommend!
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Additionally */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Additionally</Text>
//           <View style={styles.additionallyGrid}>
//             <View style={styles.additionallyItem}>
//               <Ionicons name="car-outline" size={24} color="#9CA3AF" />
//               <Text style={styles.additionallyLabel}>Was a driver</Text>
//               <Text style={styles.additionallyValue}>0</Text>
//             </View>
//             <View style={styles.additionallyItem}>
//               <Ionicons name="calendar-outline" size={24} color="#9CA3AF" />
//               <Text style={styles.additionallyLabel}>Registration date</Text>
//               <Text style={styles.additionallyValue}>21 Sep 2021</Text>
//             </View>
//             <View style={styles.additionallyItem}>
//               <Ionicons name="people-outline" size={24} color="#9CA3AF" />
//               <Text style={styles.additionallyLabel}>Was a passenger</Text>
//               <Text style={styles.additionallyValue}>11</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaWrapper>
//   );
// };

// export default PassengerDetailScreen;

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//     backgroundColor: "#FFFFFF",
//   },
//   headerContent: {
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   headerButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F9FAFB",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   placeholderView: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#F5F6F8",
//   },

//   profileCard: {
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 24,
//     paddingHorizontal: 20,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//   },
//   avatarWrapper: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#F3F4F6",
//     overflow: "hidden",
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   passengerName: {
//     marginTop: 12,
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   statsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//     gap: 8,
//   },
//   statItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   statText: {
//     fontSize: 13,
//     color: "#6B7280",
//   },
//   statDivider: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: "#D1D5DB",
//   },

//   section: {
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 12,
//   },

//   verificationList: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     gap: 12,
//   },
//   verificationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 8,
//   },
//   verificationText: {
//     fontSize: 14,
//     color: "#111827",
//     fontWeight: "500",
//   },

//   aboutCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//   },
//   aboutText: {
//     fontSize: 13,
//     color: "#6B7280",
//     lineHeight: 20,
//   },

//   preferencesGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   preferenceItem: {
//     width: "48%",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 12,
//     alignItems: "center",
//     gap: 8,
//   },
//   preferenceIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F5F6F8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   preferenceText: {
//     fontSize: 11,
//     color: "#374151",
//     textAlign: "center",
//     fontWeight: "500",
//   },

//   reviewsList: {
//     gap: 8,
//   },
//   reviewItem: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//   },
//   reviewHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   reviewerInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   reviewerAvatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#3B82F6",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   reviewerInitial: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
//   reviewerName: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111827",
//   },
//   ratingBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     backgroundColor: "#10B981",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   ratingText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#FFFFFF",
//   },
//   reviewText: {
//     fontSize: 13,
//     color: "#6B7280",
//     lineHeight: 18,
//   },

//   additionallyGrid: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   additionallyItem: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     padding: 12,
//     alignItems: "center",
//     gap: 6,
//   },
//   additionallyLabel: {
//     fontSize: 10,
//     color: "#9CA3AF",
//     textAlign: "center",
//   },
//   additionallyValue: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#111827",
//   },
// });
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PassengerDetailScreen = () => {
  return (
    <SafeAreaWrapper
      backgroundColor="#FFFFFF"
      statusBarStyle="dark-content"
      keyboardAvoidingView={false}
      edges={["top"]}
    >
      {/* Header */}

      <View
        style={{
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#F3F4F6",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F9FAFB",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#111827" }}>
            Passengers Details
          </Text>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "#F5F6F8",
          paddingHorizontal: 20,
          paddingTop: 16,
        }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Driver Profile Card */}

        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 16,
            paddingVertical: 20,
            borderRadius: 16,
            gap: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
                }}
                style={{ width: 84, height: 84, borderRadius: 42 }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#3B82F6",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                }}
              >
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              </View>
            </View>

            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                fontWeight: "500",
                color: "#111827",
              }}
            >
              Anton
            </Text>

            {/* Specs Pills */}
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                gap: 6,
                backgroundColor: "#F3F4F6",
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  { borderRightWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  5.0(5)
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  5 years on service
                </Text>
              </View>
              <View
                style={[
                  {
                    // flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  { borderLeftWidth: 1, borderColor: "#D1D5DB" },
                ]}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#374151" }}
                >
                  32 y.o.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Verification */}

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Profile Verification
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 16,
              gap: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="mail-outline" size={20} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Email confirmed
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                paddingVertical: 6,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                    backgroundColor: "#F0F0F0",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 4,
                  }}
                >
                  <Ionicons name="call-outline" size={20} color="#374151" />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "#111827" }}
                >
                  Phone number confirmed
                </Text>
              </View>
            </View>
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
            About Me
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
                color: "#6B7280",
                fontWeight: "400",
                lineHeight: 20,
                textAlign: "justify",
              }}
            >
              Hello! My name is Anton, and I&apos;m an experienced driver who
              loves helping people travel comfortably and safe. I am ready to
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
            Travel Preferences
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#F5F6F8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="chatbubbles-outline"
                    size={20}
                    color="#374151"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#111827",
                    flex: 1,
                  }}
                >
                  Not averse to chatting
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 6,
                paddingRight: 16,
                backgroundColor: "#fff",
                borderRadius: 50,
                width: "48%",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#F5F6F8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="musical-notes-outline"
                    size={20}
                    color="#374151"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#111827",
                    flex: 1,
                  }}
                >
                  Turn the music up!
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reviews */}

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Reviews
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  width: 300,
                }}
                onPress={() => router.push("/common/reviews")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
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
                        A
                      </Text>
                    </View>
                    <View style={{ marginLeft: 6, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#111827",
                        }}
                      >
                        Anton
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#BBBBBB",
                          fontWeight: "400",
                        }}
                      >
                        19 july 2024
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "#D4F564",
                      padding: 6,
                      paddingRight: 12,
                      borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        width: 25,
                        height: 25,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="star" size={16} color="#111827" />
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      5.0
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    fontWeight: "400",
                    textAlign: "justify",
                    marginTop: 12,
                  }}
                >
                  Hello! My name is Anton, and I&apos;m an experienced driver
                  who loves helping people travel comfortably and safe.
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Additionally */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Additionally
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                gap: 2,
                width: 150,
              }}
            >
              <Ionicons name="car-outline" size={24} color="#111827" />
              <Text
                style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center" }}
              >
                Was a driver
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: "#111827" }}
              >
                1
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                gap: 2,
                width: 150,
              }}
            >
              <Ionicons name="calendar-outline" size={24} color="#111827" />

              <Text
                style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center" }}
              >
                Registration date
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: "#111827" }}
              >
                18 June 2020
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
                gap: 2,
                width: 150,
              }}
            >
              <Ionicons name="at-circle-outline" size={24} color="#111827" />

              <Text
                style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center" }}
              >
                Total trips
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: "#111827" }}
              >
                10
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default PassengerDetailScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  headerContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderView: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  driverName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: "#6B7280",
  },
  statDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    width: "100%",
  },
  actionButtonPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
  },
  actionButtonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    width: "100%",
  },
  actionButtonSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },

  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  verificationList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  verificationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  verificationText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  aboutCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  aboutText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
  },

  preferencesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  preferenceItem: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 8,
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
  },
  preferenceText: {
    fontSize: 11,
    color: "#374151",
    textAlign: "center",
    fontWeight: "500",
  },

  reviewsList: {
    gap: 8,
  },
  reviewItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewerInitial: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  reviewText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  additionallyGrid: {
    flexDirection: "row",
    gap: 8,
  },
  additionallyItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  additionallyLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
  },
  additionallyValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
});
