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

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

const ReviewsScreen = () => {
  const reviews: Review[] = [
    {
      id: "1",
      name: "Daniel",
      date: "22 June 2024",
      rating: 3.0,
      text: "No problems on the road. But, unfortunately, I didn't arrive at the meeting on time, but the driver was very understanding.",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: "2",
      name: "Anna",
      date: "14 April 2024",
      rating: 5.0,
      text: "A wonderful trip. We discussed many interesting topics. It was not boring at all. I recommend this driver!",
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    {
      id: "3",
      name: "Maxim",
      date: "08 December 2023",
      rating: 5.0,
      text: "The trip was comfortable. Thank you for the company!",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "4",
      name: "Irina",
      date: "15 June 2023",
      rating: 5.0,
      text: "Punctual and polite. The trip was easy and comfortable. Excellent travel companion. I recommend!",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: "5",
      name: "Svetlana",
      date: "14 May 2023",
      rating: 4.0,
      text: "Good driver, pleasant conversation during the trip.",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 6 },
    { stars: 4, count: 1 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  const totalReviews = ratingDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const averageRating = 5.0;

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
            Reviews
          </Text>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
        </View>
      </View>

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
        {/* Rating Overview */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E5E7EB",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 2,
              }}
            >
              {averageRating.toFixed(1)}
            </Text>
            <View style={{ flexDirection: "row", gap: 2, marginBottom: 2 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#F59E0B" />
              ))}
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#111827",
              }}
            >
              9 reviews
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              gap: 6,

              justifyContent: "center",
            }}
          >
            {ratingDistribution.map((item) => (
              <View
                key={item.stars}
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons name="star" size={16} color="#111827" />
                <Text style={{ fontSize: 12, color: "#6B7280", width: 12 }}>
                  {item.stars}
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 9,
                    backgroundColor: "#E5E7EB",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={[
                      {
                        height: "100%",
                        backgroundColor: "#D4F564",
                        borderRadius: 4,
                      },
                      {
                        width: `${totalReviews > 0 ? (item.count / totalReviews) * 100 : 0}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barCount}>{item.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews List */}
        <View
          style={{
            paddingTop: 16,
            gap: 8,
          }}
        >
          {reviews.map((review) => (
            <View
              key={review.id}
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
                    <Image
                      source={{ uri: review.avatar }}
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                  </View>
                  <View style={{ marginLeft: 6, gap: 2 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {review.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#BBBBBB",
                        fontWeight: "400",
                      }}
                    >
                      {review.date}
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
                    {review.rating.toFixed(1)}
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
                {review.text}
              </Text>
            </View>
            // <View key={review.id} style={styles.reviewItem}>
            //   <View style={styles.reviewHeader}>
            //     <View style={styles.reviewerInfo}>
            //       <Image
            //         source={{ uri: review.avatar }}
            //         style={styles.reviewerAvatar}
            //       />
            //       <View>
            //         <Text style={styles.reviewerName}>{review.name}</Text>
            //         <Text style={styles.reviewDate}>{review.date}</Text>
            //       </View>
            //     </View>
            //     <View style={styles.ratingBadge}>
            //       <Ionicons name="star" size={12} color="#111827" />
            //       <Text style={styles.ratingText}>
            //         {review.rating.toFixed(1)}
            //       </Text>
            //     </View>
            //   </View>
            //   <Text style={styles.reviewText}>{review.text}</Text>
            //   <TouchableOpacity>
            //     <Text style={styles.readMore}>Read More</Text>
            //   </TouchableOpacity>
            // </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ReviewsScreen;

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

  ratingOverview: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 20,
  },
  ratingLeft: {},
  ratingNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  ratingBars: {
    flex: 1,
    gap: 6,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  barLabel: {
    fontSize: 12,
    color: "#6B7280",
    width: 12,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#D4F564",
    borderRadius: 4,
  },
  barCount: {
    fontSize: 12,
    color: "#6B7280",
    width: 12,
    textAlign: "right",
  },

  reviewsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  reviewDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#D4F564",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111827",
  },
  reviewText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },
  readMore: {
    fontSize: 12,
    color: "#3B82F6",
    marginTop: 6,
    fontWeight: "500",
  },
});
