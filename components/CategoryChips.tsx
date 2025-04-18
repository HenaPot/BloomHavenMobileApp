import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

interface CategoryChipsProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  style?: ViewStyle;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
  style,
}) => (
  <FlatList
    data={categories}
    horizontal
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.chip,
          selectedCategories.includes(item) && styles.chipSelected,
        ]}
        onPress={() => onToggleCategory(item)}
      >
        <Text
          style={[
            styles.chipText,
            selectedCategories.includes(item) && styles.chipTextSelected,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )}
    contentContainerStyle={[styles.chipContainer, style]}
    showsHorizontalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: colors.secondary,
  },
  chipText: {
    color: colors.secondary,
  },
  chipTextSelected: {
    color: colors.primary,
  },
});

export default CategoryChips;