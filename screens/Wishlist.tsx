import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import WishlistProductCard from "@/components/WishlistProductCard";
import BloomButton from "@/components/BloomButton";


// Example wishlist data
const initialWishlist = [
  {
    id: "1",
    title: "Elegant Bouquet",
    image: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt4a4af7e6facea579/6668df6ceca9a600983250ac/beautiful-flowers-hero.jpg?q=70&width=3840&auto=webp",
    price: 49.99,
    quantity: 1,
  },
  {
    id: "2",
    title: "Spring Basket",
    image: "https://www.gardenia.net/wp-content/uploads/2023/05/types-of-flowers.webp",
    price: 29.99,
    quantity: 2,
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleAddToCart = (id: string) => {
    // Implement add to cart logic here
    alert(`Added product ${id} to cart!`);
  };

  const totalItems = wishlist.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = wishlist
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleAddAllToCart = () => {
    // Implement add all to cart logic here
    alert("All wishlist products added to cart!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.summary}>
        Items: <Text style={styles.bold}>{totalItems}</Text> | Total:{" "}
        <Text style={styles.bold}>${totalPrice}</Text>
      </Text>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WishlistProductCard
            product={item}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add All to Cart Button */}
      <View style={styles.buttonContainer}>
        <BloomButton
          text="Add All to Cart"
          onPress={handleAddAllToCart}
          style={{ marginBottom: 10 }}  
        />
      </View>
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
  addAllButton: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 16,
    alignItems: "center",
  },
  addAllButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Wishlist;