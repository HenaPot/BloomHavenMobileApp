import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "@/constants/colors";

// Example orders data (as returned from backend)
const orders = [
  {
    order_id: "4",
    order_date: "2025-04-28 18:10:14",
    product_names: "Edited Black Rose,Tulip Bouquet",
    quantities: "3,5",
    total_price: "399.9699935913086",
    status_name: "Delivered",
  },
  {
    order_id: "5",
    order_date: "2025-04-28 18:22:55",
    product_names: "Edited Black Rose,Tulip Bouquet",
    quantities: "4,2",
    total_price: "439.9599914550781",
    status_name: "Pending",
  },
  {
    order_id: "6",
    order_date: "2025-04-28 18:23:00",
    product_names: "Edited Black Rose",
    quantities: "3",
    total_price: "299.9699935913086",
    status_name: "Pending",
  },
];

const getStatusColor = (status: string) => {
  if (status === "Delivered") return colors.secondary;
  if (status === "Pending") return "#FFA500"; // orange
  return colors.text;
};

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.orderId}>Order #{item.order_id}</Text>
              <Text style={[styles.status, { color: getStatusColor(item.status_name) }]}>
                {item.status_name}
              </Text>
            </View>
            <Text style={styles.date}>{item.order_date}</Text>
            <Text style={styles.label}>Products:</Text>
            <Text style={styles.value}>
              {item.product_names.split(",").map((name, idx) => (
                <Text key={idx}>
                  {name} (x{item.quantities.split(",")[idx]})
                  {idx < item.product_names.split(",").length - 1 ? ", " : ""}
                </Text>
              ))}
            </Text>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.totalPrice}>${parseFloat(item.total_price).toFixed(2)}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
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

export default Dashboard;