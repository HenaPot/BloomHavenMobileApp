import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import CartProductCard from "../components/CartProductCard";
import { colors } from "@/constants/colors";
import PurchaseBottomSheet from "@/components/PurchaseBottomSheet";
import BloomButton from "@/components/BloomButton";

// Example cart data
const initialCart = [
  {
    id: "1",
    title: "Stylish Running Shoes",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/960px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
    category: "Shoes",
    price: 79.99,
    quantity: 1,
  },
  {
    id: "2",
    title: "Elegant Wrist Watch",
    image: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt4a4af7e6facea579/6668df6ceca9a600983250ac/beautiful-flowers-hero.jpg?q=70&width=3840&auto=webp",
    category: "Watches",
    price: 199.99,
    quantity: 2,
  },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [purchaseVisible, setPurchaseVisible] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <Text style={styles.summary}>
        Items: <Text style={styles.bold}>{totalItems}</Text> | Total:{" "}
        <Text style={styles.bold}>${totalPrice}</Text>
      </Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartProductCard
            product={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Purchase Now Button */}
      <View style={styles.buttonContainer}>
        <BloomButton    
          text="Purchase Now"
          onPress={() => setPurchaseVisible(true)}
          style={{ marginBottom: 10 }}  
        />
      </View>

      {/* Purchase Bottom Sheet */}
      <PurchaseBottomSheet
        visible={purchaseVisible}
        onClose={() => setPurchaseVisible(false)}
        onCheckout={(orderDetails) => {
          setPurchaseVisible(false);
          alert("Order placed! You will pay once the flowers arrive.");
        }}
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