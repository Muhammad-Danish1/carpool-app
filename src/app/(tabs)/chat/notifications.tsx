import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Notification {
  id: string;
  type: "trip" | "message" | "system" | "payment" | "driver";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  iconLibrary: "Ionicons" | "MaterialIcons";
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "trip",
      title: "Trip Confirmed",
      message:
        "Your trip to Barnaul has been confirmed. Driver will contact you 30 minutes before pickup.",
      timestamp: "2 minutes ago",
      isRead: false,
      icon: "checkmark-circle",
      iconColor: "#10B981",
      iconLibrary: "Ionicons",
    },
    {
      id: "2",
      type: "message",
      title: "New Message from Anton",
      message: "I'm on my way to pick you up",
      timestamp: "5 minutes ago",
      isRead: false,
      icon: "chat-bubble",
      iconColor: "#3B82F6",
      iconLibrary: "MaterialIcons",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Successful",
      message:
        "Payment of 500.00 ₽ has been processed successfully for your trip booking.",
      timestamp: "10 minutes ago",
      isRead: true,
      icon: "card",
      iconColor: "#10B981",
      iconLibrary: "Ionicons",
    },
    {
      id: "4",
      type: "driver",
      title: "Driver Assigned",
      message: "Vitaliy has been assigned as your driver. Rating: 5.0 ⭐",
      timestamp: "1 hour ago",
      isRead: true,
      icon: "person",
      iconColor: "#F59E0B",
      iconLibrary: "Ionicons",
    },
    {
      id: "5",
      type: "system",
      title: "Trip Reminder",
      message: "Don't forget your trip to Novosibirsk tomorrow at 8:00 AM",
      timestamp: "2 hours ago",
      isRead: true,
      icon: "notifications",
      iconColor: "#8B5CF6",
      iconLibrary: "Ionicons",
    },
    {
      id: "6",
      type: "trip",
      title: "Trip Completed",
      message:
        "Your trip has been completed. Please rate your experience with driver Roman.",
      timestamp: "1 day ago",
      isRead: true,
      icon: "flag",
      iconColor: "#EF4444",
      iconLibrary: "Ionicons",
    },
    {
      id: "7",
      type: "system",
      title: "App Update Available",
      message:
        "A new version of EasyRoad is available with improved features and bug fixes.",
      timestamp: "2 days ago",
      isRead: true,
      icon: "system-update",
      iconColor: "#6B7280",
      iconLibrary: "MaterialIcons",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);

    // Navigate based on notification type
    switch (notification.type) {
      case "message":
        router.push({
          pathname: "/(tabs)/chat/conversation",
          params: { contactId: "2", contactName: "Anton", avatar: "A" },
        });
        break;
      case "trip":
        router.push("/(tabs)/trips");
        break;
      case "payment":
        router.push("/(tabs)/trips");
        break;
      default:
        break;
    }
  };

  const renderIcon = (notification: Notification) => {
    const iconProps = {
      name: notification.icon as any,
      size: 20,
      color: notification.iconColor,
    };

    if (notification.iconLibrary === "MaterialIcons") {
      return <MaterialIcons {...iconProps} />;
    } else {
      return <Ionicons {...iconProps} />;
    }
  };

  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationLeft}>
        <View
          style={[
            styles.notificationIcon,
            { backgroundColor: `${notification.iconColor}15` },
          ]}
        >
          {renderIcon(notification)}
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
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
        </View>
      </View>

      {!notification.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      >
        {unreadCount > 0 && (
          <View style={styles.unreadHeader}>
            <Text style={styles.unreadHeaderText}>
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </Text>
          </View>
        )}

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
              You're all caught up! Notifications will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginHorizontal: 16,
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
  },
  notificationsList: {
    flex: 1,
  },
  unreadHeader: {
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F2FE",
  },
  unreadHeaderText: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "500",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  unreadNotification: {
    backgroundColor: "#FEFEFE",
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: "600",
  },
  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
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
});

export default NotificationsScreen;
