import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
  isDriver?: boolean;
}

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState<"chats" | "notifications">(
    "chats"
  );

  const chatContacts: ChatContact[] = [
    {
      id: "1",
      name: "EasyRoad Support",
      lastMessage: "How can we help you today?",
      timestamp: "2m",
      avatar: "E",
      isOnline: true,
      unreadCount: 1,
      isDriver: false,
    },
    {
      id: "2",
      name: "Anton Petrov",
      lastMessage: "I'm on my way to pick you up",
      timestamp: "5m",
      avatar: "A",
      isOnline: true,
      unreadCount: 2,
      isDriver: true,
    },
    {
      id: "3",
      name: "Vitaliy Smirnov",
      lastMessage: "Thank you for choosing our service!",
      timestamp: "1h",
      avatar: "V",
      isOnline: false,
      isDriver: true,
    },
    {
      id: "4",
      name: "Katerina Ivanova",
      lastMessage: "See you tomorrow at 8 AM",
      timestamp: "2h",
      avatar: "K",
      isOnline: true,
      isDriver: true,
    },
    {
      id: "5",
      name: "Nikita Kozlov",
      lastMessage: "Trip completed successfully",
      timestamp: "1d",
      avatar: "N",
      isOnline: false,
      isDriver: true,
    },
    {
      id: "6",
      name: "Roman Popov",
      lastMessage: "Thanks for the 5-star rating!",
      timestamp: "2d",
      avatar: "R",
      isOnline: false,
      isDriver: true,
    },
    {
      id: "7",
      name: "Elena Sokolova",
      lastMessage: "Your trip is confirmed",
      timestamp: "3h",
      avatar: "E",
      isOnline: true,
      unreadCount: 1,
      isDriver: false,
    },
    {
      id: "8",
      name: "Dmitry Kuznetsov",
      lastMessage: "I'll be there in 10 minutes",
      timestamp: "30m",
      avatar: "D",
      isOnline: true,
      unreadCount: 3,
      isDriver: true,
    },
    {
      id: "9",
      name: "Olga Volkova",
      lastMessage: "Need to reschedule my trip",
      timestamp: "4h",
      avatar: "O",
      isOnline: false,
      isDriver: false,
    },
    {
      id: "10",
      name: "Sergey Mikhailov",
      lastMessage: "Arrived at pickup location",
      timestamp: "15m",
      avatar: "S",
      isOnline: true,
      isDriver: true,
    },
    {
      id: "11",
      name: "Maria Petrova",
      lastMessage: "Can you confirm my booking?",
      timestamp: "6h",
      avatar: "M",
      isOnline: false,
      unreadCount: 1,
      isDriver: false,
    },
    {
      id: "12",
      name: "Ivan Fedorov",
      lastMessage: "Trip route confirmed",
      timestamp: "45m",
      avatar: "I",
      isOnline: true,
      isDriver: true,
    },
    {
      id: "13",
      name: "Anna Sidorova",
      lastMessage: "Payment received",
      timestamp: "1d",
      avatar: "A",
      isOnline: false,
      isDriver: false,
    },
    {
      id: "14",
      name: "Alexey Romanov",
      lastMessage: "Waiting at the pickup point",
      timestamp: "20m",
      avatar: "A",
      isOnline: true,
      unreadCount: 2,
      isDriver: true,
    },
    {
      id: "15",
      name: "Natalia Kozlova",
      lastMessage: "Trip details updated",
      timestamp: "2d",
      avatar: "N",
      isOnline: false,
      isDriver: false,
    },
    {
      id: "16",
      name: "Pavel Lebedev",
      lastMessage: "Estimated arrival time",
      timestamp: "1h",
      avatar: "P",
      isOnline: true,
      isDriver: true,
    },
    {
      id: "17",
      name: "Irina Volkova",
      lastMessage: "Booking confirmation pending",
      timestamp: "3d",
      avatar: "I",
      isOnline: false,
      unreadCount: 1,
      isDriver: false,
    },
    {
      id: "18",
      name: "Andrey Morozov",
      lastMessage: "Route optimization complete",
      timestamp: "50m",
      avatar: "A",
      isOnline: true,
      isDriver: true,
    },
    {
      id: "19",
      name: "Yulia Sokolova",
      lastMessage: "Need assistance with booking",
      timestamp: "4d",
      avatar: "Y",
      isOnline: false,
      isDriver: false,
    },
    {
      id: "20",
      name: "Mikhail Popov",
      lastMessage: "Driver rating received",
      timestamp: "2h",
      avatar: "M",
      isOnline: true,
      unreadCount: 1,
      isDriver: true,
    },
  ];

  const notifications = [
    {
      id: "1",
      type: "trip",
      title: "Trip Confirmed",
      message:
        "Your trip to Barnaul has been confirmed. Driver will contact you 30 minutes before pickup.",
      timestamp: "12:00",
      isRead: false,
      icon: "checkmark-circle",
      iconColor: "#10B981",
    },
    {
      id: "2",
      type: "message",
      title: "New Message from Anton",
      message: "I'm on my way to pick you up",
      timestamp: "12:15",
      isRead: false,
      icon: "chat-bubble",
      iconColor: "#3B82F6",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Successful",
      message:
        "Payment of 500.00 ₽ has been processed successfully for your trip booking.",
      timestamp: "12:30",
      isRead: true,
      icon: "card",
      iconColor: "#10B981",
    },
    {
      id: "4",
      type: "trip",
      title: "Trip Reminder",
      message: "Your trip to Novosibirsk is scheduled for tomorrow at 8:00 AM.",
      timestamp: "14:45",
      isRead: false,
      icon: "calendar",
      iconColor: "#3B82F6",
    },
    {
      id: "5",
      type: "driver",
      title: "Driver Assigned",
      message:
        "Dmitry Kuznetsov has been assigned as your driver for the upcoming trip.",
      timestamp: "15:20",
      isRead: false,
      icon: "person",
      iconColor: "#10B981",
    },
    {
      id: "6",
      type: "route",
      title: "Route Updated",
      message:
        "Your trip route has been slightly modified for optimal travel time.",
      timestamp: "16:10",
      isRead: true,
      icon: "map",
      iconColor: "#3B82F6",
    },
    {
      id: "7",
      type: "support",
      title: "Support Response",
      message: "Our support team has responded to your recent inquiry.",
      timestamp: "17:00",
      isRead: false,
      icon: "help-circle",
      iconColor: "#10B981",
    },
    {
      id: "8",
      type: "rating",
      title: "Rate Your Trip",
      message:
        "How was your recent trip with Sergey? Please share your experience.",
      timestamp: "18:30",
      isRead: false,
      icon: "star",
      iconColor: "#3B82F6",
    },
    {
      id: "9",
      type: "promotion",
      title: "Special Offer",
      message:
        "Get 20% off your next trip when you book within the next 48 hours!",
      timestamp: "19:15",
      isRead: true,
      icon: "gift",
      iconColor: "#10B981",
    },
    {
      id: "10",
      type: "cancellation",
      title: "Trip Modification",
      message: "Your trip with Olga has been rescheduled to a different time.",
      timestamp: "20:00",
      isRead: false,
      icon: "refresh",
      iconColor: "#3B82F6",
    },
    {
      id: "11",
      type: "verification",
      title: "Profile Verification",
      message:
        "Please complete your profile verification to unlock more features.",
      timestamp: "21:45",
      isRead: false,
      icon: "shield",
      iconColor: "#10B981",
    },
    {
      id: "12",
      type: "safety",
      title: "Safety Tip",
      message:
        "Always confirm your driver's details before starting your trip.",
      timestamp: "22:30",
      isRead: true,
      icon: "alert-circle",
      iconColor: "#3B82F6",
    },
    {
      id: "13",
      type: "referral",
      title: "Referral Bonus",
      message: "You've earned 100 ₽ credit for referring a friend!",
      timestamp: "23:15",
      isRead: false,
      icon: "people",
      iconColor: "#10B981",
    },
    {
      id: "14",
      type: "maintenance",
      title: "App Update",
      message:
        "A new version of EasyRoad is available. Update now for improved features.",
      timestamp: "00:05",
      isRead: true,
      icon: "refresh-circle",
      iconColor: "#3B82F6",
    },
    {
      id: "15",
      type: "weather",
      title: "Weather Alert",
      message: "Expect mild snow during your upcoming trip. Drive safely!",
      timestamp: "01:20",
      isRead: false,
      icon: "snow",
      iconColor: "#10B981",
    },
    {
      id: "16",
      type: "feedback",
      title: "We Value Your Opinion",
      message: "Help us improve by sharing your thoughts about our service.",
      timestamp: "02:40",
      isRead: true,
      icon: "chatbox",
      iconColor: "#3B82F6",
    },
    {
      id: "17",
      type: "insurance",
      title: "Trip Insurance",
      message: "Your trip is covered by our comprehensive travel insurance.",
      timestamp: "03:55",
      isRead: false,
      icon: "medical",
      iconColor: "#10B981",
    },
    {
      id: "18",
      type: "location",
      title: "Pickup Location",
      message:
        "Confirm your exact pickup location for a smooth trip experience.",
      timestamp: "04:30",
      isRead: false,
      icon: "location",
      iconColor: "#3B82F6",
    },
    {
      id: "19",
      type: "reward",
      title: "Loyalty Points",
      message: "You've earned 50 loyalty points on your recent trip!",
      timestamp: "05:45",
      isRead: true,
      icon: "trophy",
      iconColor: "#10B981",
    },
    {
      id: "20",
      type: "emergency",
      title: "Emergency Contact",
      message: "Update your emergency contact information for added safety.",
      timestamp: "06:15",
      isRead: false,
      icon: "warning",
      iconColor: "#3B82F6",
    },
  ];

  const filteredContacts = chatContacts;

  const handleChatPress = (contact: ChatContact) => {
    router.push({
      pathname: "../common/conversation",
      params: {
        contactId: contact.id,
        contactName: contact.name,
        avatar: contact.avatar,
      },
    });
  };

  const NotificationItem = ({ notification }: { notification: any }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationLeft}>
        <View
          style={[
            styles.notificationIcon,
            { backgroundColor: `${notification.iconColor}15` },
          ]}
        >
          <Ionicons
            name={notification.icon as any}
            size={20}
            color={notification.iconColor}
          />
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text
              style={[
                styles.notificationTitle,
                !notification.isRead && styles.unreadTitle,
              ]}
            >
              {notification.title}
            </Text>
            <Text style={styles.notificationTime}>
              {notification.timestamp}
            </Text>
          </View>
          <View style={styles.messageRow}>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {notification.message}
            </Text>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ChatContactItem = ({ contact }: { contact: ChatContact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleChatPress(contact)}
    >
      <View style={styles.contactLeft}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.contactAvatar,
              {
                backgroundColor: contact.isDriver ? "#3B82F6" : "#10B981",
              },
            ]}
          >
            <Text style={styles.contactInitial}>{contact.avatar}</Text>
          </View>
          {contact.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactHeader}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.timestamp}>{contact.timestamp}</Text>
          </View>
          <View style={styles.messageRow}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {contact.lastMessage}
            </Text>
            {contact.unreadCount && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{contact.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.placeholderView} />
          <Text style={styles.headerTitle}>Inbox</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "chats" && styles.activeTab]}
            onPress={() => setActiveTab("chats")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "chats" && styles.activeTabText,
              ]}
            >
              Chats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "notifications" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("notifications")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "notifications" && styles.activeTabText,
              ]}
            >
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {activeTab === "chats" ? (
          // Chat List
          <View style={styles.listContainer}>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <ChatContactItem key={contact.id} contact={contact} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={64}
                  color="#D1D5DB"
                />
                <Text style={styles.emptyStateText}>No chats found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Start a conversation with a driver
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Notifications List
          <View style={styles.listContainer}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons
                  name="notifications-none"
                  size={64}
                  color="#D1D5DB"
                />
                <Text style={styles.emptyStateText}>No notifications</Text>
                <Text style={styles.emptyStateSubtext}>
                  You&apos;re all caught up! Notifications will appear here.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F6F8",
    borderRadius: 20,
    padding: 4,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#111827",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
    backgroundColor: "#F5F6F8",
  },
  listContainer: {
    flex: 1,
    gap: 4,
  },
  contactItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  contactAvatar: {
    width: 52,
    height: 52,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: "#B5B5B5",
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    flex: 1,
  },
  unreadTitle: {
    fontWeight: "600",
  },
  notificationTime: {
    fontSize: 12,
    color: "#B5B5B5",
  },
  notificationMessage: {
    fontSize: 13,
    color: "#B5B5B5",
    lineHeight: 20,
    flex: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
    marginLeft: 8,
  },
});

export default ChatScreen;
