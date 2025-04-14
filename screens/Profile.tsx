import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DefaultButton from "@/components/DefaultButton";
import EditProfileBottomSheet from "@/components/EditProfileBottomSheet";
import { colors } from "@/constants/colors";

const Profile = () => {
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const user = {
    profilePicture:
      "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/4f492b22-2d29-4360-80a6-79879487c7b7-e07922e.jpg?quality=90&fit=700,466",
    name: "John Doe",
    role: "Customer",
    username: "johndoe123",
    email: "johndoe@example.com",
    dateOfBirth: "1990-01-01",
    address: "123 Main Street, Springfield, USA",
  };

  const handleSaveChanges = (updatedProfile: {
    profilePicture: string | null;
    username: string;
    dateOfBirth: string;
    name: string;
    email: string;
    address: string;
  }) => {
    const mappedProfile = {
      ...updatedProfile,
      role: user.role, // Assuming role remains unchanged
    };
    console.log("Updated Profile:", mappedProfile);
    // Update the user data here (e.g., send to API or update state)
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.title}>My Profile</Text>

          {/* Profile Picture */}
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profilePicture}
          />

          {/* User's Name and Role */}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>

          {/* User Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Username:</Text>
            <Text style={styles.detailValue}>{user.username}</Text>

            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{user.email}</Text>

            <Text style={styles.detailLabel}>Date of Birth:</Text>
            <Text style={styles.detailValue}>{user.dateOfBirth}</Text>

            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{user.address}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <DefaultButton
              text="Edit My Profile"
              onClick={() => setEditProfileVisible(true)}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Delete Profile",
                  "Are you sure you want to delete your profile?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Yes", onPress: () => console.log("Profile deleted") },
                  ]
                );
              }}
            >
              <Text style={styles.deleteButtonText}>Delete My Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Bottom Sheet */}
      <EditProfileBottomSheet
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
        onSaveChanges={handleSaveChanges}
        existingData={{ ...user}}
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
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.danger, // Bootstrap red color
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: colors.danger,
    fontWeight: "bold",
  },
});

export default Profile;