import CustomInput from "@/src/components/ui/Input";
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import SwipeCustomButton from "@/src/components/ui/SwipButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { authAPI } from "@/src/services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });
      
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  return (
    <SafeAreaWrapper
      backgroundColor="white"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Sign In</Text>
        <Text style={styles.subtitleText}>
          Enter your email and password to access your EasyRoad account
        </Text>

        <CustomInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.inputContainer}
        />

        <SwipeCustomButton
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleSignIn}
          disabled={!email || !password || loading}
        />

        {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing in, you accept the terms of
          <Text style={styles.linkText}> privacy policy</Text>
        </Text>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  titleText: {
    fontSize: 48,
    fontWeight: "500",
    color: "black",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 16,
  },
  signupButton: {
    marginTop: 24,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#6B7280",
  },
  signupLink: {
    color: "#000",
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 32,
    maxWidth: "90%",
    alignSelf: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
