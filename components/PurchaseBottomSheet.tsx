import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import BloomTextInput from "@/components/BloomTextInput";
import { colors } from "@/constants/colors";
import BloomButton from "./BloomButton";
import BloomBottomSheet from "./BloomBottomSheet";

interface PurchaseBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onCheckout: (orderDetails: {
    name: string;
    surname: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phone_number: string; // <-- Add phone number here
  }) => void;
}

const PurchaseBottomSheet: React.FC<PurchaseBottomSheetProps> = ({
  visible,
  onClose,
  onCheckout,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Helper to clear all fields
  const clearFields = () => {
    setName("");
    setSurname("");
    setAddress("");
    setPostalCode("");
    setCity("");
    setCountry("");
    setPhoneNumber(""); // <-- Clear phone number
  };

  // Clear fields when modal is closed
  useEffect(() => {
    if (!visible) {
      clearFields();
    }
  }, [visible]);

  const handleCheckout = () => {
    onCheckout({
      name,
      surname,
      address,
      postalCode,
      city,
      country,
      phone_number: phoneNumber, // <-- Pass phone number
    });
    clearFields();
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  return (
    <BloomBottomSheet visible={visible} onClose={handleClose}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Order Details</Text>

        <Text style={styles.label}>Name</Text>
        <BloomTextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Surname</Text>
        <BloomTextInput
          placeholder="Enter your surname"
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={styles.label}>Address</Text>
        <BloomTextInput
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Postal Code</Text>
        <BloomTextInput
          placeholder="Enter your postal code"
          value={postalCode}
          onChangeText={setPostalCode}
        />

        <Text style={styles.label}>City</Text>
        <BloomTextInput
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Country</Text>
        <BloomTextInput
          placeholder="Enter your country"
          value={country}
          onChangeText={setCountry}
        />

        <Text style={styles.label}>Phone Number</Text>
        <BloomTextInput
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.infoText}>
          You will pay once the flowers arrive (in person).
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <BloomButton
          text="Close"
          onPress={handleClose}
          style={{ marginRight: 10 }}
          type="secondary"
        />
        <BloomButton
          text="Checkout"
          onPress={handleCheckout}
        />
      </View>
    </BloomBottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
});

export default PurchaseBottomSheet;