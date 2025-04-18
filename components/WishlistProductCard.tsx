import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import BloomButton from "./BloomButton";

interface WishlistProductCardProps {
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  };
  onQuantityChange: (id: string, newQuantity: number) => void;
  onAddToCart: (id: string) => void;
}

const WishlistProductCard: React.FC<WishlistProductCardProps> = ({
  product,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.quantityInput}
            value={String(product.quantity)}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              onQuantityChange(product.id, isNaN(num) ? 1 : num);
            }}
            placeholder="Qty"
          />
          <BloomButton
            text="Remove"
            onPress={() => {}}
            type="secondary"
            style={{ marginRight: 10}}  
            />
          <BloomButton
            text="Add to Cart"
            onPress={() => onAddToCart(product.id)}
            type="primary"  
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginRight: 5,
  },
  addToCartButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default WishlistProductCard;