import SafeAreaWrapper from "@/src/components/ui/SafeAreaWrapper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface OnboardingData {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: "Welcome to EasyRoad!",
    description:
      "EasyRoad is a carpooling app that allows you to find a ride to your destination.",
    icon: "car",
  },
  {
    id: 2,
    title: "Pick Your Ride",
    description:
      "Select the ride that best suits your needs and book it in just a few clicks.",
    icon: "hearto",
  },
  {
    id: 3,
    title: "Book Your Ride",
    description:
      "Confirm your booking and enjoy a smooth, affordable ride to your destination.",
    icon: "creditcard",
  },
  {
    id: 4,
    title: "Track Your Ride",
    description:
      "Track your ride in real-time and enjoy a smooth, affordable ride to your destination.",
    icon: "clockcircleo",
  },
  {
    id: 5,
    title: "Enjoy Your Ride",
    description:
      "Enjoy your ride and arrive at your destination safely and on time.",
    icon: "smileo",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      router.push("/(auth)");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    router.push("/(auth)");
  };

  return (
    <SafeAreaWrapper
      backgroundColor="white"
      statusBarStyle="dark-content"
      keyboardAvoidingView={true}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <AntDesign
              name={onboardingData[currentIndex].icon as any}
              size={200}
              color="white"
            />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {onboardingData[currentIndex].title}
          </Text>
          <Text style={styles.descriptionText}>
            {onboardingData[currentIndex].description}
          </Text>
        </View>

        <View style={styles.navigationContainer}>
          <View style={styles.navigationTopBackground}>
            <View style={styles.navigationTopForeground} />
          </View>

          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <AntDesign name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.navigationBottomBackground}>
            <View style={styles.navigationBottomForeground} />
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    position: "relative",
  },
  skipButton: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  skipText: {
    color: "#6B7280",
    fontSize: 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imagePlaceholder: {
    backgroundColor: "#000000",
    height: 200,
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 120,
  },
  titleText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "black",
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  navigationContainer: {
    position: "absolute",
    bottom: 60,
    right: 0,
  },
  navigationTopBackground: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationTopForeground: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonContainer: {
    backgroundColor: "#000000",
    width: 96,
    padding: 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  nextButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBottomBackground: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBottomForeground: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;
