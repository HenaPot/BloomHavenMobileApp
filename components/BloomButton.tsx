import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

interface BloomButtonProps {
  text: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

const BloomButton: React.FC<BloomButtonProps> = ({ text, onPress, type = "primary", style }) => {
  let backgroundColor = colors.secondary;
  let textColor = colors.primary;
  let borderColor = colors.secondary;

  if (type === "secondary") {
    backgroundColor = colors.primary;
    textColor = colors.secondary;
    borderColor = colors.secondary;
  } else if (type === "danger") {
    backgroundColor = colors.primary;
    textColor = colors.danger;
    borderColor = colors.danger;
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor },
        type !== "primary" && styles.outlined,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
  },
  outlined: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BloomButton;