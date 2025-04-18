import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { colors } from "@/constants/colors";
import TrashButton from "./TrashButton";

interface SmallProductCardProps {
  product: {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
  };
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const SmallProductCard: React.FC<SmallProductCardProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
        </View>
      </View>
      <TrashButton onPress={() => onRemove(product.id)} />
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
  category: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 5,
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
  },
  trash: {
    marginLeft: 10,
    padding: 5,
  },
});

export default SmallProductCard;