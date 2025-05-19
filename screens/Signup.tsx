import BloomDatePicker from "@/components/BloomDatePicker";
import BloomTextInput from "@/components/BloomTextInput";
import BloomButton from "@/components/BloomButton";
import InputLabel from "@/components/InputLabel";
import { colors } from "@/constants/colors";
import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";
import { AppDispatch } from "@/redux/store";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Mock API call for registration
  const apiRegister = async () => {
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

  const handleSignup = async () => {
    if (!username || !date_of_birth || !name || !email || !address || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
    const response = await apiRegister();
    if (response && response.token) {
      const { token, ...user } = response;
      dispatch(login({ user, token }));
      alert("Registration successful! Logged in as: " + user.email);
      // Optionally navigate to another screen
    } else {
      alert("Registration failed.");
    }
  };

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
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Date of Birth" />
            </View>
            <BloomDatePicker
              value={date_of_birth}
              onChangeText={setDateOfBirth}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelWrapper}>
              <InputLabel label="Full Name" />
            </View>
            <BloomTextInput
              placeholder="Enter your name and surname"
              autoCorrect={false}
              inputMode="text"
              value={name}
              onChangeText={setName}
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
              value={email}
              onChangeText={setEmail}
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
              value={address}
              onChangeText={setAddress}
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
              value={password}
              onChangeText={setPassword}
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
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
          </View>
        </View>

        <Text style={styles.smallText} onPress={() => alert("Navigate to Log In")}>
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