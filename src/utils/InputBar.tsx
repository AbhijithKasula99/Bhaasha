import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  isError?: boolean;
  errorStyle?: object;
  errorMessage?: string; // Inline error message
  validationMessages?: string[];
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  isError = false,
  errorStyle = {},
  errorMessage = '',
  validationMessages = [],
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={isError ? 'red' : '#aaa'}
        style={[styles.input, isError ? [styles.inputError, errorStyle] : null]}
      />
      <View style={styles.promptContainer}>
        {/* Render validation messages */}
        {validationMessages.map((message, index) => (
          <Text key={index} style={styles.validationText}>
            {message}
          </Text>
        ))}
        {/* Render inline error message */}
        {isError && errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    padding: 15,
    paddingLeft: 20,
    fontSize: 16,
    fontFamily: 'Almarai',
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  promptContainer: {
    marginTop: 5,
  },
  validationText: {
    fontSize: 12,
    fontFamily: 'Almarai',
    color: 'red',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Almarai',
  },
});

export default CustomInput;
