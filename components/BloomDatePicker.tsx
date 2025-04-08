import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/constants/colors';

const BloomDatePicker = ({ placeholder = "Select a date", ...restOfProps }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

const onChange = (event: any, selectedDate?: Date): void => {
    setShowPicker(false);
    if (selectedDate) {
        setDate(selectedDate);
    }
};

  return (
    <View style={styles.input}>
      <TextInput
        value={date ? date.toLocaleDateString() : ""}
        placeholder={placeholder}
        editable={false} // Prevent manual input
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
          negativeButton={{ label: 'Cancel', textColor: colors.secondary }}
          positiveButton={{ label: 'OK', textColor: colors.primary }}
          textColor={colors.primary}
          value={date || new Date()} // Default to today's date
          mode="date"
          display="spinner"
          onChange={onChange}
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