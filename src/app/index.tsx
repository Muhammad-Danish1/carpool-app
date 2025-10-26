import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        {/* Logo Circle */}
        <View style={styles.logoCircle}>
          <Ionicons name="logo-alipay" size={90} color="white" />
        </View>

        {/* App Name */}
        <Text style={styles.appName}>EasyROAD</Text>
      </View>

      {/* Bottom Text */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>carpooling mobile app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#DBFF43",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 128,
    height: 128,
    backgroundColor: "black",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    color: "black",
    fontWeight: "normal",
    fontSize: 48,
    letterSpacing: 1,
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 64,
  },
  bottomText: {
    color: "primary",
    fontSize: 16,
    opacity: 0.7,
  },
});

export default SplashScreen;
