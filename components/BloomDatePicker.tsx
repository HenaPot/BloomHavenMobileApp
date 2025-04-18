import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/constants/colors';

interface BloomDatePickerProps {
  value?: string; // ISO date string, e.g. "1990-01-01"
  onChangeText?: (dateString: string) => void;
  placeholder?: string;
}

const BloomDatePicker: React.FC<BloomDatePickerProps> = ({
  value,
  onChangeText,
  placeholder = "Select a date",
  ...restOfProps
}) => {
  // For uncontrolled usage (like Signup)
  const [internalDate, setInternalDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // Use value prop if provided, otherwise use internal state
  const dateValue = value ? new Date(value) : internalDate;

  // Keep internal state in sync if value prop changes (for controlled usage)
  useEffect(() => {
    if (value) {
      setInternalDate(new Date(value));
    }
  }, [value]);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      if (onChangeText) {
        // Controlled: call parent
        const isoString = selectedDate.toISOString().split("T")[0];
        onChangeText(isoString);
      } else {
        // Uncontrolled: update internal state
        setInternalDate(selectedDate);
      }
    }
  };

  return (
    <View style={styles.input}>
      <TextInput
        value={dateValue ? dateValue.toLocaleDateString() : ""}
        placeholder={placeholder}
        editable={false}
        style={styles.textInput}
        {...restOfProps}
      />
      <Pressable onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar-outline" size={20} style={styles.icon} />
      </Pressable>
      {showPicker && (
        <DateTimePicker
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          value={dateValue || new Date()}
          mode="date"
          display="spinner"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 56,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 7,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  icon: {
    padding: 10,
    color: "#000",
  },
});

export default BloomDatePicker;