import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { WishlistItem } from "@/types/types";
import WishlistItemCard from "@/components/WishlistItemCard";
import BloomButton from "@/components/BloomButton";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "@/constants/colors";

const Wishlist = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total_value: 0, total_count: 0 });

  // Fetch wishlist
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/wishlist`, {
        headers: { Authentication: token },
      });
      setWishlist(response.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load wishlist.");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishlist/summary`, {
        headers: { Authentication: token },
      });
      setSummary(response.data);
    } catch {
      setSummary({ total_value: 0, total_count: 0 });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlist();
      fetchSummary();
    }, [token])
  );

  // Add to wishlist from product page
  // Usage: await axios.post(`${API_URL}/wishlist/add`, { product_id, quantity }, { headers: { Authentication: token } });

  // Update quantity
  const handleQuantityChange = async (id: number, qty: number) => {
    try {
      await axios.put(`${API_URL}/wishlist/update`, {
        product_id: id,
        quantity: qty,
      }, {
        headers: { Authentication: token },
      });
      fetchWishlist();
      fetchSummary();
    } catch {
      Alert.alert("Error", "Failed to update quantity.");
    }
  };

  // Remove item
  const handleRemove = async (id: number) => {
    Alert.alert("Remove", "Remove this item from your wishlist?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/wishlist/remove/${id}`, {
              headers: { Authentication: token },
            });
            fetchWishlist();
            fetchSummary();
          } catch {
            Alert.alert("Error", "Failed to remove item.");
          }
        },
      },
    ]);
  };

  // Add to cart & remove from wishlist
  const handleAddToCart = async (id: number, qty: number) => {
    try {
      await axios.post(`${API_URL}/cart/add`, {
        product_id: id,
        quantity: qty,
      }, {
        headers: { Authentication: token },
      });
      await axios.delete(`${API_URL}/wishlist/remove/${id}`, {
        headers: { Authentication: token },
      });
      fetchWishlist();
      fetchSummary();
      Alert.alert("Success", "Added to cart and removed from wishlist!");
    } catch {
      Alert.alert("Error", "Failed to add to cart.");
    }
  };

  // Clear wishlist
  const handleClearWishlist = async () => {
    Alert.alert("Clear Wishlist", "Are you sure you want to clear your wishlist?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/wishlist/clear`, {
              headers: { Authentication: token },
            });
            fetchWishlist();
            fetchSummary();
          } catch {
            Alert.alert("Error", "Failed to clear wishlist.");
          }
        },
      },
    ]);
  };

  // Add all to cart
  const handleAddAllToCart = async () => {
    try {
      for (const item of wishlist) {
        await axios.post(`${API_URL}/cart/add`, {
          product_id: item.product_id,
          quantity: item.cart_quantity || 1,
        }, {
          headers: { Authentication: token },
        });
      }
      await axios.delete(`${API_URL}/wishlist/clear`, {
        headers: { Authentication: token },
      });
      fetchWishlist();
      fetchSummary();
      Alert.alert("Success", "All wishlist items added to cart!");
    } catch {
      Alert.alert("Error", "Failed to add all items to cart.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.summary}>
        Items: <Text style={styles.bold}>{summary.total_count}</Text> | Total: <Text style={styles.bold}>${summary.total_value}</Text>
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : wishlist.length === 0 ? (
        <Text style={{ textAlign: "center", color: colors.text, marginTop: 40 }}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.product_id.toString()}
          renderItem={({ item }) => (
            <WishlistItemCard
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <View style={styles.buttonContainer}>
        <BloomButton
          text="Add All to Cart"
          onPress={handleAddAllToCart}
          style={{ marginBottom: 10 }}
        />
        <BloomButton
          text="Clear Wishlist"
          onPress={handleClearWishlist}
          type="danger"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, padding: 20, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: "bold", color: colors.text, marginBottom: 10 },
  summary: { fontSize: 16, color: colors.text, marginBottom: 20 },
  bold: { fontWeight: "bold", color: colors.secondary },
  listContainer: { paddingBottom: 20 },
  buttonContainer: { position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: colors.primary, padding: 15, borderTopWidth: 1, borderTopColor: colors.secondary },
});

export default Wishlist;