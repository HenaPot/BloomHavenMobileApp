import React, { ReactNode } from "react";
import { Modal, KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface BloomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BloomBottomSheet: React.FC<BloomBottomSheetProps> = ({ visible, onClose, children }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <KeyboardAvoidingView
      style={styles.modalContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.sheet}>{children}</View>
    </KeyboardAvoidingView>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
});

export default BloomBottomSheet;