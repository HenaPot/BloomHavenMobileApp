import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";

import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
    
        <InputLabel label="Email Address" />
        
      <BloomTextInput
        placeholder="Enter a valid email address"
        autoCapitalize="none"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"/>

        <InputLabel label="Password" />

        <BloomTextInput
        placeholder="Enter password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        inputMode="text"
        textContentType="password"/>
      </View>

      <Text style={styles.smallText} onPress={() => alert("Navigate to Sign Up")}>
        Don't have an account? 
        <Text style={styles.underlinedText}> Sign Up</Text>
      </Text>

      
      <View style={styles.buttonContainer}>
      <BloomButton
        text="Log In"
        onPress={() => alert("Log In")}/>
      </View>
    </View>
  );    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },

    inputContainer: {
        flex: 1,
        maxHeight: 200,
        justifyContent: "space-between",
        marginTop: 50,
        marginBottom: 20,
        width: "90%",
    },

    smallText: {
        fontSize: 14,
        color: colors.secondary,
    },

    underlinedText: {
        textDecorationLine: "underline", 
    },

    buttonContainer: {
        marginTop: 40,
        width: "90%",  
        height: 48,
    }
});

export default Login;