import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface TrashButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const TrashButton: React.FC<TrashButtonProps> = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.trash, style]}>
    <Ionicons name="trash-outline" size={24} color={colors.danger || "#dc3545"} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  trash: {
    marginLeft: 10,
    padding: 5,
  },
});

export default TrashButton;