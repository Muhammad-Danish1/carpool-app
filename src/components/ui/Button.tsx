import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "outline" | "filled";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  size?: "w-full" | "md" | "sm" | "lg";
  isLoading?: boolean;
  loaderColor?: string;
  loaderSize?: "small" | "large";
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "outline",
  disabled = false,
  style,
  textStyle,
  icon,
  size = "md",
  loaderColor = "white",
  loaderSize = "small",
  isLoading = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: 22,
      paddingHorizontal: 24,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "#000000",
        };
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: "#000000",
        };

      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: 16,
      fontWeight: "600",
    };

    switch (variant) {
      case "outline":
        return {
          ...baseStyle,
          color: "#000000",
        };
      case "filled":
        return {
          ...baseStyle,
          color: "#FFFFFF",
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "w-full":
        return { width: "100%" };
      case "lg":
        return { width: "70%" };
      case "md":
        return { width: "60%" };
      case "sm":
        return { width: "40%" };

      default:
        return {
          width: "100%",
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), getSizeStyle(), style]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={loaderSize} color={loaderColor} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
