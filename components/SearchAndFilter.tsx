import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "@/constants/colors";
import BloomTextInput from "@/components/BloomTextInput";

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

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ visible, onClose, onApplyFilters }) => {
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
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
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

            {/* Categories */}
            <Text style={styles.sectionTitle}>Select Categories</Text>
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
                  onPress={() => toggleCategory(item)}
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
              contentContainerStyle={styles.chipContainer}
            />

            {/* Price Range */}
            <Text style={styles.sectionTitle}>Price Range</Text>
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.dropdownItem,
                  selectedPriceRange === range && styles.dropdownItemSelected,
                ]}
                onPress={() => setSelectedPriceRange(range)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    selectedPriceRange === range && styles.dropdownTextSelected,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Sort By */}
            <Text style={styles.sectionTitle}>Sort By</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownItem,
                  selectedSortOption === option && styles.dropdownItemSelected,
                ]}
                onPress={() => setSelectedSortOption(option)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    selectedSortOption === option && styles.dropdownTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={clearFilters}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={applyFilters}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to avoid overlap with buttons
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default SearchAndFilter;