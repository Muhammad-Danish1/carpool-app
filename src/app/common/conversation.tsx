import { SafeAreaWrapper } from "@/src/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
  status?: "sent" | "delivered" | "read";
}

const ChatConversationScreen = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const contactName = params.contactName as string;
  const avatar = params.avatar as string;
  const contactId = params.contactId as string;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'll be your driver for today's trip to Barnaul.",
      timestamp: "10:30 AM",
      isFromUser: false,
    },
    {
      id: "2",
      text: "Hi Anton! What time will you arrive?",
      timestamp: "10:32 AM",
      isFromUser: true,
      status: "read",
    },
    {
      id: "3",
      text: "I'm on my way to pick you up. I'll be there in about 10 minutes.",
      timestamp: "10:35 AM",
      isFromUser: false,
    },
    {
      id: "4",
      text: "Perfect! I'll be waiting outside.",
      timestamp: "10:36 AM",
      isFromUser: true,
      status: "read",
    },
    {
      id: "5",
      text: "Great! I'm driving a white Hyundai, license plate A123BC. See you soon!",
      timestamp: "10:37 AM",
      isFromUser: false,
    },
  ]);

  const handleSendMessage = () => {
    if (messageText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isFromUser: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 2000);
  };

  const handleCallPress = () => {
    // Handle call functionality
    console.log("Calling", contactName);
  };

  const handleVideoPress = () => {
    // Handle video call functionality
    console.log("Video calling", contactName);
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View
      style={[
        styles.messageContainer,
        message.isFromUser
          ? styles.userMessageContainer
          : styles.otherMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isFromUser ? styles.userMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.isFromUser
              ? styles.userMessageText
              : styles.otherMessageText,
          ]}
        >
          {message.text}
        </Text>
      </View>

      <View
        style={[
          styles.messageInfo,
          message.isFromUser ? styles.userMessageInfo : styles.otherMessageInfo,
        ]}
      >
        <Text style={styles.messageTime}>{message.timestamp}</Text>
        {message.isFromUser && message.status && (
          <View style={styles.messageStatus}>
            {message.status === "sent" && (
              <Ionicons name="checkmark" size={12} color="#9CA3AF" />
            )}
            {message.status === "delivered" && (
              <View style={styles.doubleCheck}>
                <Ionicons name="checkmark" size={12} color="#9CA3AF" />
                <Ionicons
                  name="checkmark"
                  size={12}
                  color="#9CA3AF"
                  style={styles.secondCheck}
                />
              </View>
            )}
            {message.status === "read" && (
              <View style={styles.doubleCheck}>
                <Ionicons name="checkmark" size={12} color="#3B82F6" />
                <Ionicons
                  name="checkmark"
                  size={12}
                  color="#3B82F6"
                  style={styles.secondCheck}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{avatar}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{contactName}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerActionButton}
            onPress={handleCallPress}
          >
            <Ionicons name="call" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionButton}
            onPress={handleVideoPress}
          >
            <Ionicons name="videocam" size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Messages */}
        <ScrollView
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add" size={24} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={500}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                messageText.trim().length > 0 && styles.sendButtonActive,
              ]}
              onPress={handleSendMessage}
              disabled={messageText.trim().length === 0}
            >
              <Ionicons
                name="send"
                size={20}
                color={messageText.trim().length > 0 ? "#FFFFFF" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerAvatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  headerStatus: {
    fontSize: 12,
    color: "#10B981",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0F2FE",
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: "#3B82F6",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#111827",
  },
  messageInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  userMessageInfo: {
    justifyContent: "flex-end",
  },
  otherMessageInfo: {
    justifyContent: "flex-start",
  },
  messageTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  messageStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  doubleCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondCheck: {
    marginLeft: -8,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: "row",
    // alignItems: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 4,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 16,
    color: "#111827",
    textAlignVertical: "top",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sendButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
});

export default ChatConversationScreen;
