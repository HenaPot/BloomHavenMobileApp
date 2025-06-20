import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/userSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import BloomDatePicker from "@/components/BloomDatePicker";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import { API_URL } from "@/constants/api";

const Signup = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const apiRegister = async () => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      name,
      email,
      password,
      repeat_password_signup: repeatPassword,
      address,
      date_of_birth,
    });
    return response.data;
  };

  const handleSignup = async () => {
    if (!username || !date_of_birth || !name || !email || !address || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await apiRegister();
      if (response && response.token) {
        const { token } = response;
        dispatch(setToken(token));
        const userRes = await axios.get(`${API_URL}/users/current`, {
          headers: {
            Authentication: token,
          },
        });
        dispatch(setUser(userRes.data));
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        alert("Registration failed.");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <InputLabel label="Username" />
            <BloomTextInput
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Date of Birth" />
            <BloomDatePicker
              value={date_of_birth}
              onChangeText={setDateOfBirth}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Full Name" />
            <BloomTextInput
              placeholder="Enter your name and surname"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Email Address" />
            <BloomTextInput
              placeholder="Enter a valid email address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Address" />
            <BloomTextInput
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Password" />
            <BloomTextInput
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputLabel label="Repeat Password" />
            <BloomTextInput
              placeholder="Enter the same password"
              secureTextEntry={true}
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
          </View>
        </View>
        <Text style={styles.smallText} onPress={() => navigation.navigate("Login")}>
          Have an account?
          <Text style={styles.underlinedText}> Log In</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <BloomButton text="Sign Up" onPress={handleSignup} />
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