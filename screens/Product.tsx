import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import { colors } from "@/constants/colors";
import { API_URL } from "@/constants/api";
import { Product as ProductType } from "../types/types";

const fallbackImage = "https://via.placeholder.com/300x300?text=No+Image";

const Product = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const token = useSelector((state: RootState) => state.user.token);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set header tint color to black
  useEffect(() => {
    navigation.setOptions?.({ headerTintColor: "#000" });
  }, [navigation]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/products/${id}`, {
          headers: {
            Authentication: token, // or Authorization: `Bearer ${token}` if your backend expects that
          },
        });
        setProduct(response.data);
        // Set main image
        let mainImg = response.data.images?.[0]?.image || null;
        if (mainImg && mainImg.startsWith("https//")) {
          mainImg = mainImg.replace("https//", "https://");
        }
        setMainImage(mainImg || fallbackImage);
      } catch (err: any) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleAddToCart = async () => {
    if (!product) return;
    const qty = parseInt(quantity) || 1;
    try {
      await axios.post(
        `${API_URL}/cart/add`,
        {
          product_id: product.id,
          quantity: qty,
        },
        {
          headers: { Authentication: token },
        }
      );
      Alert.alert("Success", `Added ${qty} item(s) to cart!`);
    } catch (err) {
      Alert.alert("Error", "Failed to add to cart.");
      console.error("Add to cart error:", err);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    const qty = parseInt(quantity) || 1;
    try {
      await axios.post(
        `${API_URL}/wishlist/add`,
        {
          product_id: product.id,
          quantity: qty,
        },
        {
          headers: { Authentication: token },
        }
      );
      Alert.alert("Success", "Added to wishlist!");
    } catch {
      Alert.alert("Error", "Failed to add to wishlist.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || "Product not found."}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Product Title */}
        <Text style={styles.title}>{product.name}</Text>

        {/* Product ID */}
        <Text style={styles.id}>Product ID: {product.id}</Text>

        {/* Product Price */}
        <Text style={styles.price}>Price: ${product.price_each}</Text>

        {/* Product Images */}
        <Image
          source={{ uri: mainImage || fallbackImage }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {product.images.map((img, idx) => {
            let imgUrl = img.image;
            if (imgUrl && imgUrl.startsWith("https//")) {
              imgUrl = imgUrl.replace("https//", "https://");
            }
            return (
              <TouchableOpacity
                key={img.id}
                onPress={() => setMainImage(imgUrl || fallbackImage)}
              >
                <Image
                  source={{ uri: imgUrl || fallbackImage }}
                  style={styles.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Quantity Input */}
        <Text style={styles.sectionTitle}>Quantity</Text>
        <BloomTextInput
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <BloomButton
            text="Add to Cart"
            onPress={handleAddToCart}
            style={{ marginBottom: 10 }}
          />
          <BloomButton
            text="Add to Wishlist"
            onPress={handleAddToWishlist}
            type="secondary"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
    textAlign: "center",
  },
  id: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  mainImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  imageContainer: {
    height: 70,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 20,
    textAlign: "justify",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Product;