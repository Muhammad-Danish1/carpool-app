import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: "default" | "light-content" | "dark-content";
  statusBarBackgroundColor?: string;
  statusBarTranslucent?: boolean;
  statusBarHidden?: boolean;
  style?: ViewStyle;
  edges?: ("top" | "bottom" | "left" | "right")[];
  useSafeArea?: boolean;
  keyboardAvoidingView?: boolean;
  keyboardVerticalOffset?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  showStatusBar?: boolean;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  backgroundColor = "#FFFFFF",
  statusBarStyle = "dark-content",
  statusBarBackgroundColor,
  statusBarTranslucent = false,
  statusBarHidden = false,
  style,
  edges = ["top", "bottom", "left", "right"],
  useSafeArea = true,
  keyboardAvoidingView = false,
  keyboardVerticalOffset = 0,
  paddingHorizontal = 0,
  paddingVertical = 0,
  showStatusBar = true,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    ...style,
  };

  const statusBarBgColor = statusBarBackgroundColor || backgroundColor;

  const renderStatusBar = () => {
    if (!showStatusBar) return null;

    return (
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBgColor}
        translucent={statusBarTranslucent}
        hidden={statusBarHidden}
      />
    );
  };

  const renderContent = () => {
    if (keyboardAvoidingView) {
      return (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {children}
        </KeyboardAvoidingView>
      );
    }
    return children;
  };

  if (!useSafeArea) {
    return (
      <View style={containerStyle}>
        {renderStatusBar()}
        {renderContent()}
      </View>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={edges}>
      {renderStatusBar()}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
