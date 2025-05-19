import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";
import { AppDispatch } from "@/redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Mock API call
  const apiLogin = async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));
    return {
      id: "5",
      name: "Hena Potogija",
      email: "hena.potogija@stu.ibu.edu.ba",
      date_of_birth: "2025-04-08",
      username: "hena",
      image: null,
      role_id: "1",
      address: "Francuske revolucije bb",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiNSIsIm5hbWUiOiJIZW5hIFBvdG9naWphIiwiZW1haWwiOiJoZW5hLnBvdG9naWphQHN0dS5pYnUuZWR1LmJhIiwiZGF0ZV9vZl9iaXJ0aCI6IjIwMjUtMDQtMDgiLCJ1c2VybmFtZSI6ImhlbmEiLCJpbWFnZSI6bnVsbCwicm9sZV9pZCI6IjEiLCJhZGRyZXNzIjoiRnJhbmN1c2tlIHJldm9sdWNpamUgYmIifSwiaWF0IjoxNzQ3Njc4MDk3LCJleHAiOjE3NDc2ODE2OTd9.Swl9XBowBh7tYodacTz0zK9ewJcL8KYQISZYjNUqszA",
    };
  };

  const handleLogin = async () => {
    const response = await apiLogin(email, password);
    if (response && response.token) {
      // Separate user and token
      const { token, ...user } = response;
      dispatch(login({ user, token }));
      alert("Logged in as: " + user.email);
      // navigate to browse all products, etc.
    } else {
      alert("Invalid credentials");
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
      <Text style={styles.smallText} onPress={() => alert("Navigate to Sign Up")}>
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