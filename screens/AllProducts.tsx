import React, { useEffect, useState } from "react";
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

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/products`, {
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
    };
    fetchProducts();
  }, [token]);

  const renderProduct = ({ item }: { item: Product }) => {
    // Handle image URL (fix missing colon, fallback image)
    let imageUrl =
      item.images && item.images.length > 0
        ? item.images[0].image
        : undefined;
    if (imageUrl && imageUrl.startsWith("https//")) {
      imageUrl = imageUrl.replace("https//", "https://");
    }
    const fallbackImage = "https://via.placeholder.com/200x200?text=No+Image";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Product", { id: item.id })}
      >
        <Image
          source={{ uri: imageUrl || fallbackImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productInfo}>
            <Text style={styles.bold}>Category:</Text> {item.category_name}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.bold}>Price:</Text> ${item.price_each}
          </Text>
          <Text style={styles.productInfo}>
            <Text style={styles.bold}>Quantity:</Text> {item.quantity}
          </Text>
          {item.description ? (
            <Text style={styles.productInfo}>{item.description}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.empty}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
          numColumns={1}
        />
      )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
  },
  cardBody: {
    padding: 14,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 6,
  },
  productInfo: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  bold: {
    fontWeight: "bold",
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
