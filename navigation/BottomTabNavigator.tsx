import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllProducts from "@/screens/AllProducts";
import Dashboard from "@/screens/Dashboard";
import Profile from "@/screens/Profile";
import ShoppingCart from "@/screens/ShoppingCart";
import Wishlist from "@/screens/Wishlist";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.secondary,
      tabBarInactiveTintColor: colors.text,
      tabBarStyle: { backgroundColor: colors.primary },
      tabBarIcon: ({ color, size }) => {
        let iconName = "home";
        if (route.name === "AllProducts") iconName = "pricetags-outline";
        else if (route.name === "Dashboard") iconName = "home-outline";
        else if (route.name === "Profile") iconName = "person-outline";
        else if (route.name === "ShoppingCart") iconName = "cart-outline";
        else if (route.name === "Wishlist") iconName = "heart-outline";
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="AllProducts" component={AllProducts} options={{ title: "Products" }} />
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="ShoppingCart" component={ShoppingCart} options={{ title: "Cart" }} />
    <Tab.Screen name="Wishlist" component={Wishlist} />
  </Tab.Navigator>
);

export default BottomTabNavigator;