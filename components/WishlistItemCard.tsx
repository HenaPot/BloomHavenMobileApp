import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import TrashButton from "./TrashButton";

import { WishlistItem } from "@/types/types";

type Props = {
  item: WishlistItem;
  onQuantityChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onAddToCart: (id: number, qty: number) => void;
};

const WishlistItemCard: React.FC<Props> = ({ item, onQuantityChange, onRemove, onAddToCart }) => {
  const imgUrl =
    item.images && item.images.length > 0
      ? item.images[0].image.startsWith("https//")
        ? item.images[0].image.replace("https//", "https://")
        : item.images[0].image
      : "https://via.placeholder.com/90x90?text=No+Image";

  return (
    <View style={styles.card}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TextInput
            style={styles.quantityInput}
            value={item.cart_quantity.toString()}
            keyboardType="numeric"
            onChangeText={val => {
              const qty = Math.max(1, parseInt(val) || 1);
              onQuantityChange(item.product_id, qty);
            }}
            placeholder="Qty"
            maxLength={3}
          />
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onAddToCart(item.product_id, item.cart_quantity)}>
          <Text style={styles.actionText}>Add to Cart</Text>
        </TouchableOpacity>
        <TrashButton onPress={() => onRemove(item.product_id)} />
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
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
    marginRight: 15,
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
    textAlign: "center",
  },
  actions: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    height: 60,
  },
  actionBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  actionText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default WishlistItemCard;