import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
