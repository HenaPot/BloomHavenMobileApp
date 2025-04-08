import React, { useState } from 'react';
import { TextInput,StyleSheet, View } from 'react-native';
import { TextInputProps } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

type BloomTextInputProps = TextInputProps;

const BloomTextInput = ({secureTextEntry, ...restOfProps}: BloomTextInputProps) => {
  const [secureTextEntryState, setSecureTextEntryState] = useState(secureTextEntry);
  return (
    <View style={styles.input}>
        <TextInput {...restOfProps} secureTextEntry={secureTextEntryState}/>
        {secureTextEntry ? <Ionicons name={secureTextEntryState ? 'eye-off-outline' : 'eye-outline'} onPress={() => setSecureTextEntryState(!secureTextEntryState)} size={20} style={{ padding: 10 }}></Ionicons> : null}
    </View>
  );
}

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
  });

export default BloomTextInput;