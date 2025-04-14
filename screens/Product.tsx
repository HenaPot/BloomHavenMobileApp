import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BloomTextInput from "@/components/BloomTextInput";
import DefaultButton from "@/components/DefaultButton";
import { colors } from "@/constants/colors";

const Product = () => {
  const { id, title, price, description, images } = {
    id: "1",
    title: "Stylish Running Shoes",
    price: "$79.99",
    description: "These running shoes are stylish and comfortable, perfect for daily use.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/960px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
      "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt4a4af7e6facea579/6668df6ceca9a600983250ac/beautiful-flowers-hero.jpg?q=70&width=3840&auto=webp",
    ],
  };
  const [quantity, setQuantity] = useState("1");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Product Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Product ID */}
        <Text style={styles.id}>Product ID: {id}</Text>

        {/* Product Price */}
        <Text style={styles.price}>Price: {price}</Text>

        {/* Product Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
          {images.map((image: string, index: number) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>

        {/* Product Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Quantity Input */}
        <Text style={styles.sectionTitle}>Quantity</Text>
        <BloomTextInput
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <DefaultButton
            text="Add to Cart"
            onClick={() => alert(`Added ${quantity} item(s) to cart`)}
          />
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => alert("Added to Wishlist")}
          >
            <Text style={styles.secondaryButtonText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
    textAlign: "center",
  },
  id: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    height: 300, // Set a fixed height for the image container
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: "100%", // Make the image fill the container height
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 20,
    textAlign: "justify",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  secondaryButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default Product;