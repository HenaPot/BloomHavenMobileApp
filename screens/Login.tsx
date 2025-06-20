import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "@/redux/userSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import { API_URL } from "@/constants/api";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const apiLogin = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // { token: ... }
  };

  const apiGetCurrentUser = async (token: string) => {
    const response = await axios.get(`${API_URL}/users/current`, {
      headers: {
        Authentication: token,
      },
    });
    return response.data;
  };

  const handleLogin = async () => {
    try {
      const loginRes = await apiLogin(email, password);
      
      if (loginRes && loginRes.token) {
        dispatch(setToken(loginRes.token));
        const userRes = await apiGetCurrentUser(loginRes.token);
        dispatch(setUser(userRes));
        navigation.navigate("Profile");
      } else {
        alert("Invalid credentials");
      }
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

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
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <InputLabel label="Password" />
        <BloomTextInput
          placeholder="Enter password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          inputMode="text"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.smallText} onPress={() => navigation.navigate("Signup")}>
        Don't have an account?
        <Text style={styles.underlinedText}> Sign Up</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <BloomButton text="Log In" onPress={handleLogin} />
      </View>
    </View>
  );
};

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
  },
});

export default Login;