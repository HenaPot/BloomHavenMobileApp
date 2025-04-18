import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colors } from "@/constants/colors";

interface ProfilePictureButtonProps {
  profilePicture: string | null;
  onPress: () => void;
  style?: ViewStyle;
}

const ProfilePictureButton: React.FC<ProfilePictureButtonProps> = ({
  profilePicture,
  onPress,
  style,
}) => (
  <TouchableOpacity
    style={[styles.profilePictureContainer, style]}
    onPress={onPress}
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
);

const styles = StyleSheet.create({
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
});

export default ProfilePictureButton;