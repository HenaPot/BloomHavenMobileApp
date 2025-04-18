import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BloomTextInput from "@/components/BloomTextInput";
import BloomDatePicker from "@/components/BloomDatePicker";
import { colors } from "@/constants/colors";
import BloomButton from "./BloomButton";
import ProfilePictureButton from "./ProfilePictureButton";
import BloomBottomSheet from "./BloomBottomSheet";

interface EditProfileBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSaveChanges: (updatedProfile: {
    profilePicture: string | null;
    username: string;
    dateOfBirth: string;
    name: string;
    email: string;
    address: string;
  }) => void;
  existingData: {
    profilePicture: string | null;
    username: string;
    dateOfBirth: string;
    name: string;
    email: string;
    address: string;
  };
}

const EditProfileBottomSheet: React.FC<EditProfileBottomSheetProps> = ({
  visible,
  onClose,
  onSaveChanges,
  existingData,
}) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    existingData.profilePicture
  );
  const [username, setUsername] = useState(existingData.username);
  const [dateOfBirth, setDateOfBirth] = useState(existingData.dateOfBirth);
  const [name, setName] = useState(existingData.name);
  const [email, setEmail] = useState(existingData.email);
  const [address, setAddress] = useState(existingData.address);

  const handleSaveChanges = () => {
    onSaveChanges({
      profilePicture,
      username,
      dateOfBirth,
      name,
      email,
      address,
    });
    onClose();
  };

  return (
    <BloomBottomSheet visible={visible} onClose={onClose}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <View style={styles.profilePictureWrapper}>
          <ProfilePictureButton
            profilePicture={profilePicture}
            onPress={() => alert("Change Profile Picture")}
          />
        </View>

        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Username</Text>
          <BloomTextInput
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Date of Birth</Text>
          <BloomDatePicker
            placeholder="Select your date of birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
        </View>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Full Name</Text>
          <BloomTextInput
            placeholder="Enter full name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Email Address</Text>
          <BloomTextInput
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.sectionTitle}>Address</Text>
          <BloomTextInput
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <BloomButton
          text="Close"
          onPress={onClose}
          type="secondary"
          style={{ marginRight: 10 }}
        />
        <BloomButton
          text="Save Changes"
          onPress={handleSaveChanges}
        />
      </View>
    </BloomBottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevent overlap with buttons
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  profilePictureWrapper: {
    alignItems: "center", // Center the profile picture section
    marginBottom: 20,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  choosePictureText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.primary,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  inputGroup: {
    marginBottom: 18, // Adjust as needed for your desired spacing
  },
});

export default EditProfileBottomSheet;