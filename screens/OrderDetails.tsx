import BloomDatePicker from "@/components/BloomDatePicker";
import BloomTextInput from "@/components/BloomTextInput";
import DefaultButton from "@/components/DefaultButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Signup = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    
      <View style={styles.container}>
        <Text style={styles.title}>Order Details</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Name" />
            </View>
            <BloomTextInput
              placeholder="Enter your name"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Surname" />
            </View>
            <BloomTextInput
              placeholder="Enter your surname"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Address" />
            </View>
            <BloomTextInput
              placeholder="Enter your address"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Postal Code" />
            </View>
            <BloomTextInput
              placeholder="Enter your postal code"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="City" />
            </View>
            <BloomTextInput
              placeholder="Enter your city"
              autoCorrect={false}
              inputMode="text"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Country" />
            </View>
            <BloomTextInput
              placeholder="Enter your country"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Phone Number" />
            </View>
            <BloomTextInput
              placeholder="Enter your phone number"
              autoCorrect={false}
              inputMode="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <DefaultButton text="Checkout Now" onClick={() => alert("Checkout")} />
        </View>
      </View>
    </ScrollView> 
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    width: "100%",
    },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 60,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginVertical: 10, 
  },
  labelWrapper: {
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginVertical: 40,
    width: "100%",
    height: 56,
  },
});

export default Signup;