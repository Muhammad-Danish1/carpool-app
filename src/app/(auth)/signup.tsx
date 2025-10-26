import CustomInput from "@/src/components/ui/Input";
import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import SwipeCustomButton from "@/src/components/ui/SwipButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { authAPI } from "@/src/services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.signup({ name, email, password, confirmPassword });
      
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.replace("/(tabs)/home") }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    router.back();
  };

  return (
    <SafeAreaWrapper
      backgroundColor="white"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Sign Up</Text>
          <Text style={styles.subtitleText}>
            Create your EasyRoad account to start carpooling
          </Text>

          <CustomInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            containerStyle={styles.inputContainer}
          />

          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            containerStyle={styles.inputContainer}
          />

          <CustomInput
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={styles.inputContainer}
          />

          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            containerStyle={styles.inputContainer}
          />

          <SwipeCustomButton
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleSignUp}
            disabled={!name || !email || !password || !confirmPassword || loading}
          />

          {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

          <TouchableOpacity onPress={handleSignIn} style={styles.signinButton}>
            <Text style={styles.signinText}>
              Already have an account? <Text style={styles.signinLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By signing up, you accept the terms of
            <Text style={styles.linkText}> privacy policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
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
  signinButton: {
    marginTop: 24,
    alignItems: "center",
  },
  signinText: {
    fontSize: 14,
    color: "#6B7280",
  },
  signinLink: {
    color: "#000",
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
    maxWidth: "90%",
    alignSelf: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
