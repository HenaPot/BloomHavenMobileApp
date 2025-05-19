import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import BloomButton from "@/components/BloomButton";
import EditProfileBottomSheet from "@/components/EditProfileBottomSheet";
import { colors } from "@/constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout, updateProfile, User } from "@/redux/userSlice";

const Profile = () => {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleSaveChanges = (updatedProfile: Partial<User>) => {
    dispatch(updateProfile(updatedProfile));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>No user data.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>My Profile</Text>

          {/* Profile Picture */}
          <Image
            source={
              user.image
                ? { uri: user.image }
                : require("../assets/images/default-profile-picture.jpg")
            }
            style={styles.profilePicture}
          />

          {/* User's Name and Role */}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role_id}</Text>

          {/* User Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Username:</Text>
            <Text style={styles.detailValue}>{user.username}</Text>

            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{user.email}</Text>

            <Text style={styles.detailLabel}>Date of Birth:</Text>
            <Text style={styles.detailValue}>{user.date_of_birth}</Text>

            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{user.address}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <BloomButton
              text="Edit My Profile"
              onPress={() => setEditProfileVisible(true)}
              style={{ marginBottom: 10 }}
            />
            <BloomButton
              text="Delete My Profile"
              type="danger"
              onPress={() => {
                Alert.alert(
                  "Delete Profile",
                  "Are you sure you want to delete your profile?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Yes", onPress: handleLogout },
                  ]
                );
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Bottom Sheet */}
      <EditProfileBottomSheet
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
        onSaveChanges={handleSaveChanges}
        existingData={user}
      />
    </>
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
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 15,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  }
});

export default Profile;