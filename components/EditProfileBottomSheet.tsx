import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import BloomTextInput from "@/components/BloomTextInput";
import BloomDatePicker from "@/components/BloomDatePicker";
import { colors } from "@/constants/colors";

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
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Edit Profile</Text>

            {/* Choose Profile Picture */}
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <View style={styles.profilePictureWrapper}>
              <TouchableOpacity
                style={styles.profilePictureContainer}
                onPress={() => alert("Choose Profile Picture")}
              >
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles.profilePicture}
                  />
                ) : (
                  <Text style={styles.choosePictureText}>Choose Picture</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Username */}
            <Text style={styles.sectionTitle}>Username</Text>
            <BloomTextInput
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />

            {/* Date of Birth */}
            <Text style={styles.sectionTitle}>Date of Birth</Text>
            <BloomDatePicker
              placeholder="Select your date of birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />

            {/* Full Name */}
            <Text style={styles.sectionTitle}>Full Name</Text>
            <BloomTextInput
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
            />

            {/* Email Address */}
            <Text style={styles.sectionTitle}>Email Address</Text>
            <BloomTextInput
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Address */}
            <Text style={styles.sectionTitle}>Address</Text>
            <BloomTextInput
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default EditProfileBottomSheet;