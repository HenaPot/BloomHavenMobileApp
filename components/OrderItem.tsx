import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { OrderType } from "@/types/types";

const getStatusColor = (status: string) => {
  if (status === "Delivered") return colors.secondary;
  if (status === "Pending") return "#FFA500";
  return colors.text;
};

const OrderItem: React.FC<{ order: OrderType }> = ({ order }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.orderId}>Order #{order.order_id}</Text>
      <Text style={[styles.status, { color: getStatusColor(order.status_name) }]}>
        {order.status_name}
      </Text>
    </View>
    <Text style={styles.date}>{order.order_date}</Text>
    <Text style={styles.label}>Products:</Text>
    <Text style={styles.value}>
      {order.product_names.split(",").map((name, idx) => (
        <Text key={idx}>
          {name} (x{order.quantities.split(",")[idx]})
          {idx < order.product_names.split(",").length - 1 ? ", " : ""}
        </Text>
      ))}
    </Text>
    <Text style={styles.label}>Total Price:</Text>
    <Text style={styles.totalPrice}>${parseFloat(order.total_price as any).toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    fontSize: 13,
    color: "#888",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.text,
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 2,
  },
});

export default OrderItem;