import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/constants/colors";
import SearchAndFilter from "@/components/SearchAndFilter";

const mockProducts = [
  {
    id: "1",
    title: "Stylish Running Shoes",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/960px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
    category: "Shoes",
    price: "$79.99",
  },
  {
    id: "2",
    title: "Elegant Wrist Watch",
    image: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt4a4af7e6facea579/6668df6ceca9a600983250ac/beautiful-flowers-hero.jpg?q=70&width=3840&auto=webp",
    category: "Watches",
    price: "$199.99",
  },
  {
    id: "3",
    title: "Trendy Handbag",
    image: "https://www.gardenia.net/wp-content/uploads/2023/05/types-of-flowers.webp",
    category: "Bags",
    price: "$49.99",
  },
];

const AllProducts = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // Apply filtering logic here
  };

  const renderProduct = ({ item }: { item: typeof mockProducts[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Products</Text>
        <TouchableOpacity onPress={() => setFiltersVisible(true)}>
          <Text style={styles.filterText}>Search and Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <SearchAndFilter
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  filterText: {
    fontSize: 16,
    color: colors.secondary,
    textDecorationLine: "underline",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default AllProducts;
