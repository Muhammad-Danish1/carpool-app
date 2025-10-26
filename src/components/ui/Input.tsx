import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export default function CustomInput({
  label,
  leftComponent,
  rightComponent,
  error,
  containerStyle,
  inputStyle,
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          containerStyle,
          isFocused && styles.focusedContainer,
          error && styles.errorContainer,
        ]}
      >
        {leftComponent && (
          <View style={styles.leftComponentContainer}>{leftComponent}</View>
        )}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor="#6B7280"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightComponent && (
          <View style={styles.rightComponentContainer}>{rightComponent}</View>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 50,
    backgroundColor: "white",
    paddingVertical: 8,
    height: 60,
    overflow: "hidden",
  },
  focusedContainer: {
    borderColor: "black",
    borderWidth: 1.5,
  },
  errorContainer: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    paddingHorizontal: 12,
  },
  leftComponentContainer: {
    paddingLeft: 8,
    paddingRight: 4,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    height: "100%",
    justifyContent: "center",
  },
  rightComponentContainer: {
    paddingRight: 12,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});
