import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

interface OptionButtonGroupProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  style?: ViewStyle;
}

const OptionButtonGroup: React.FC<OptionButtonGroupProps> = ({
  options,
  selectedOption,
  onSelect,
  style,
}) => (
  <View style={style}>
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.dropdownItem,
          selectedOption === option && styles.dropdownItemSelected,
        ]}
        onPress={() => onSelect(option)}
      >
        <Text
          style={[
            styles.dropdownText,
            selectedOption === option && styles.dropdownTextSelected,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  dropdownItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownItemSelected: {
    backgroundColor: colors.secondary,
  },
  dropdownText: {
    color: colors.secondary,
  },
  dropdownTextSelected: {
    color: colors.primary,
  },
});

export default OptionButtonGroup;