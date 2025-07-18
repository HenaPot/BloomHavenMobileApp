import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors } from "@/constants/colors";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "./BloomButton";
import CategoryChips from "./CategoryChips";
import OptionButtonGroup from "./OptionButtonGroup";
import BloomBottomSheet from "./BloomBottomSheet";

const categories = ["Shoes", "Watches", "Bags", "Clothing", "Accessories"];
const priceRanges = ["$0 - $50", "$50 - $100", "$100 - $250", "$250 - $500", "$500+"];
const sortOptions = ["Price: Low to High", "Price: High to Low"];

interface SearchAndFilterProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    searchQuery: string;
    categories: string[];
    priceRange: string | null;
    sortOption: string | null;
  }) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  visible,
  onClose,
  onApplyFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    onApplyFilters({
      searchQuery,
      categories: selectedCategories,
      priceRange: selectedPriceRange,
      sortOption: selectedSortOption,
    });
    onClose();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedSortOption(null);
    onApplyFilters({
      searchQuery: "",
      categories: [],
      priceRange: null,
      sortOption: null,
    });
    onClose();
  };

  return (
    <BloomBottomSheet visible={visible} onClose={onClose}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Search and Filters</Text>

        {/* Search */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.sectionTitle}>Search</Text>
          <BloomTextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Price Range */}
        <Text style={styles.sectionTitle}>Price Range</Text>
        <OptionButtonGroup
          options={priceRanges}
          selectedOption={selectedPriceRange}
          onSelect={setSelectedPriceRange}
        />

        {/* Sort By */}
        <Text style={styles.sectionTitle}>Sort By</Text>
        <OptionButtonGroup
          options={sortOptions}
          selectedOption={selectedSortOption}
          onSelect={setSelectedSortOption}
        />
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <BloomButton
          text="Clear"
          onPress={clearFilters}
          style={{ marginRight: 10 }}
          type="secondary"
        />
        <BloomButton
          text="Apply"
          onPress={applyFilters}
        />
      </View>
    </BloomBottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
});

export default SearchAndFilter;