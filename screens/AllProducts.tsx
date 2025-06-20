import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { colors } from "@/constants/colors";
import SearchAndFilter from "@/components/SearchAndFilter";
import { API_URL } from "@/constants/api";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "@/navigation/RootStackNavigator";

type ProductImage = {
  id: number;
  product_id: number;
  image: string;
};

type Product = {
  id: number;
  name: string;
  category_name: string;
  quantity: number;
  price_each: number;
  description: string;
  images: ProductImage[];
};

const fallbackImage = "https://via.placeholder.com/200x200?text=No+Image";

const AllProducts = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const token = useSelector((state: RootState) => state.user.token);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Helper to map filter UI to backend query params
  const buildQueryParams = (filters: any) => {
    const params: any = {};
    if (filters.searchQuery) params.search = filters.searchQuery;
    // if (filters.categories && filters.categories.length > 0)
    //   params.category_name = filters.categories.join(",");
    if (filters.priceRange) {
      // Example: "$0 - $50", "$50 - $100", "$100 - $250", "$250 - $500", "$500+"
      const match = filters.priceRange.match(/\$(\d+)\s*-\s*\$(\d+)/);
      if (match) {
        params.min_price = match[1];
        params.max_price = match[2];
      } else if (filters.priceRange === "$500+") {
        params.min_price = 500;
      }
    }
    if (filters.sortOption) {
      if (filters.sortOption === "Price: Low to High") params.sort = "price_asc";
      if (filters.sortOption === "Price: High to Low") params.sort = "price_desc";
    }
    return params;
  };

  const fetchProducts = useCallback(
    async (filters = {}) => {
      setLoading(true);
      setError(null);
      try {
        const params = buildQueryParams(filters);
        const queryString = new URLSearchParams(params).toString();
        const url = queryString
          ? `${API_URL}/products?${queryString}`
          : `${API_URL}/products`;
        const response = await axios.get(url, {
          headers: {
            Authentication: token, // or Authorization: `Bearer ${token}` if your backend expects that
          },
        });
        setProducts(response.data);
      } catch (err: any) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchProducts(activeFilters);
  }, [fetchProducts, activeFilters]);

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
  };

  const renderProduct = ({ item }: { item: Product }) => {
    let imageUrl =
      item.images && item.images.length > 0
        ? item.images[0].image
        : undefined;
    if (imageUrl && imageUrl.startsWith("https//")) {
      imageUrl = imageUrl.replace("https//", "https://");
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Product", { id: item.id })}
      >
        <Image source={{ uri: imageUrl || fallbackImage }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.category_name}</Text>
        <Text style={styles.price}>${item.price_each}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Products</Text>
        <TouchableOpacity onPress={() => setFiltersVisible(true)}>
          <Text style={styles.filterText}>Search and Filter</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.empty}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

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
    paddingTop: 24,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
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
  quantity: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 5,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 40,
    textAlign: "center",
  },
  empty: {
    color: colors.text,
    marginTop: 40,
    textAlign: "center",
  },
});

export default AllProducts;
