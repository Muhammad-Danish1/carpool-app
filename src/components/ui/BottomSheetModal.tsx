import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./Button";

interface BottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply?: () => void;
  children: React.ReactNode;
  title?: string;
}

export const CustomBottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isVisible,
  onClose,
  onApply,
  children,
  title,
}) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleDismissModalPress = () => {
    bottomSheetModalRef.current?.dismiss();
    onClose();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.container}
        backdropComponent={() => <View style={styles.backdrop} />}
        onDismiss={onClose}
      >
        <BottomSheetView style={styles.contentContainer}>
          {title && <Text style={styles.titleText}>{title}</Text>}
          {children}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Reset"
              variant="outline"
              size="md"
              onPress={handleDismissModalPress}
              style={styles.resetButton}
            />
            <CustomButton
              title="Apply"
              variant="filled"
              size="md"
              onPress={onApply || handleDismissModalPress}
              style={styles.applyButton}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  resetButton: {
    marginRight: 8,
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
});
