import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import SwipeButton from "rn-swipe-button";

interface SwipeButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "w-full" | "md" | "sm" | "lg";
  iconParentStyle?: ViewStyle;
}

const SwipeCustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  size = "w-full",
  iconParentStyle,
}: SwipeButtonProps) => {
  return (
    <SwipeButton
      onSwipeSuccess={onPress}
      containerStyles={styles.containerStyles}
      railStyles={styles.railStyles}
      railBackgroundColor="#000000" // Dark background for the rail, similar to iOS demo
      railFillBackgroundColor="#000000" // Green fill when swiped, common in iOS style
      railBorderColor="#000000" // Matching border for clean look
      thumbIconComponent={() => (
        <View style={styles.thumbContainer}>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
      )}
      thumbIconBackgroundColor="#FFFFFF" // White thumb background
      thumbIconBorderColor="#FFFFFF" // White border for thumb
      thumbIconWidth={50} // Size to match typical iOS thumb icon
      title={title}
      titleColor="#FFFFFF" // White text for contrast
      titleFontSize={16}
      titleStyles={styles.titleStyles}
      swipeSuccessThreshold={70} // 70% swipe for success, as per docs
      resetAfterSuccessAnimDelay={1000} // Default delay from docs
    />
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    borderRadius: 50, // Rounded corners for iOS aesthetic
    backgroundColor: "#000000", // Dark background
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: "100%",
  },
  railStyles: {
    borderRadius: 25, // Match container rounding
    backgroundColor: "#000000", // Dark rail
    borderWidth: 1,
    borderColor: "#000000",
    maxWidth: "99.8%",
  },
  thumbContainer: {
    backgroundColor: "#FFFFFF", // White thumb
    borderRadius: 50, // Circular thumb
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  titleStyles: {
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SwipeCustomButton;
