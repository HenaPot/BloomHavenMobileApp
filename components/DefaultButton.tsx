import { colors } from "@/constants/colors";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface DefaultButtonProps {
  text: string;
  onClick: () => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ text, onClick }) => {
  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.text, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: colors.primary, // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DefaultButton;