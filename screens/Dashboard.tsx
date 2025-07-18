import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { colors } from "@/constants/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { API_URL } from "@/constants/api";
import { OrderType } from "@/types/types";
import OrderItem from "@/components/OrderItem";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/order/all`, {
          headers: { Authentication: token },
        });
        setOrders(response.data);
      } catch (err) {
        Alert.alert("Error", "Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.order_id.toString()}
          renderItem={({ item }) => <OrderItem order={item} />}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
});

export default Dashboard;