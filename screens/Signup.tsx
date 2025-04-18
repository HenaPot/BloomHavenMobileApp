import BloomDatePicker from "@/components/BloomDatePicker";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const Signup = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Username" />
            </View>
            <BloomTextInput
              placeholder="Enter username"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Date of Birth" />
            </View>
            <BloomDatePicker />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Full Name" />
            </View>
            <BloomTextInput
              placeholder="Enter your name and surname"
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Email Address" />
            </View>
            <BloomTextInput
              placeholder="Enter a valid email address"
              autoCorrect={false}
              inputMode="email"
              keyboardType="email-address"
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
              <InputLabel label="Password" />
            </View>
            <BloomTextInput
              placeholder="Enter password"
              secureTextEntry={true}
              autoCorrect={false}
              inputMode="text"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Repeat Password" />
            </View>
            <BloomTextInput
              placeholder="Enter the same password"
              secureTextEntry={true}
              autoCorrect={false}
              inputMode="text"
            />
          </View>
        </View>

        <Text style={styles.smallText} onPress={() => alert("Navigate to Log In")}>
          Have an account? 
          <Text style={styles.underlinedText}> Log In</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <BloomButton text="Sign Up" onPress={() => alert("Sign Up")} />
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
    height: 48,
  },
});

export default Signup;