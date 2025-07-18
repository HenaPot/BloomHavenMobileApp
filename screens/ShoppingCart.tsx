import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import CartProductCard from "../components/CartProductCard";
import { colors } from "@/constants/colors";
import PurchaseBottomSheet from "@/components/PurchaseBottomSheet";
import BloomButton from "@/components/BloomButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { API_URL } from "@/constants/api";
import { CartItem } from "@/types/types";


const ShoppingCart = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseVisible, setPurchaseVisible] = useState(false);

  // Load cart from backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authentication: token },
      });
      setCart(response.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load cart.");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Update quantity
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      await axios.put(`${API_URL}/cart/update`, {
        product_id: Number(id),
        quantity: newQuantity,
      }, {
        headers: { Authentication: token },
      });
      fetchCart();
    } catch (err) {
      Alert.alert("Error", "Failed to update cart quantity.");
    }
  };

  // Remove item
  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${id}`, {
        headers: { Authentication: token },
      });
      fetchCart();
    } catch (err) {
      Alert.alert("Error", "Failed to remove item.");
    }
  };

  // Clear cart
  const handleClearCart = async () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/cart/clear`, {
                headers: { Authentication: token },
              });
              fetchCart();
            } catch (err) {
              Alert.alert("Error", "Failed to clear cart.");
            }
          },
        },
      ]
    );
  };

  // Checkout
  const handleCheckout = async (orderDetails: any) => {
    try {
      // Convert to backend format
      const payload = {
        ...orderDetails,
        postal_code: orderDetails.postalCode,
        products: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.cart_quantity,
        })),
      };
      delete payload.postalCode; // remove camelCase

      await axios.post(`${API_URL}/order/add`, payload, {
        headers: { Authentication: token },
      });

      await axios.delete(`${API_URL}/cart/clear`, {
        headers: { Authentication: token },
      });

      Alert.alert("Success", "Order placed! You will pay once the flowers arrive.");
      setPurchaseVisible(false); // Close the modal
      fetchCart(); // Refresh cart after purchase
    } catch (err) {
      Alert.alert("Error", "Failed to create order.");
      console.error("Checkout error:", err);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.cart_quantity, 0);
  const totalPrice = cart
    .reduce(
      (sum, item) => sum + (item.price * item.cart_quantity),
      0
    )
    .toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <Text style={styles.summary}>
        Items: <Text style={styles.bold}>{totalItems}</Text> | Total:{" "}
        <Text style={styles.bold}>${totalPrice}</Text>
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : cart.length === 0 ? (
        <Text style={{ textAlign: "center", color: colors.text, marginTop: 40 }}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={({ item }) => (
            <CartProductCard
              product={{
                id: item.product_id.toString(),
                title: item.name,
                image: (item.images && item.images.length > 0)
                  ? (item.images[0].image.startsWith("https//")
                      ? item.images[0].image.replace("https//", "https://")
                      : item.images[0].image)
                  : "https://via.placeholder.com/90x90?text=No+Image",
                category: `Category ${item.category_id}`,
                price: item.price,
                quantity: item.cart_quantity,
              }}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Purchase Now Button */}
      <View style={styles.buttonContainer}>
        <BloomButton
          text="Purchase Now"
          onPress={() => setPurchaseVisible(true)}
          style={{ marginBottom: 10 }}
        />
        <BloomButton
          text="Clear Cart"
          onPress={handleClearCart}
          type="danger"
        />
      </View>

      {/* Purchase Bottom Sheet */}
      <PurchaseBottomSheet
        visible={purchaseVisible}
        onClose={() => setPurchaseVisible(false)}
        onCheckout={handleCheckout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    paddingBottom: 80, // Make space for the button
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
    color: colors.secondary,
  },
  listContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  purchaseButton: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
  },
  purchaseButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ShoppingCart;