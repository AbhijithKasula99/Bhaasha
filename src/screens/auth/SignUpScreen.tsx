import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { validatePassword } from '../../utils/passwordValidation'; // Import password validation logic

export default function SignUpScreen({ navigation }: any) {
  const inputPosition = useRef(new Animated.Value(-700)).current; // Start inputs off-screen to the left
  const buttonPosition = useRef(new Animated.Value(-700)).current; // Start button off-screen to the left
  const [isFontLoaded, setIsFontLoaded] = useState(false); // State to track font loading
  const [countryCode, setCountryCode] = useState('IN'); // Default country code (India)
  const [phone, setPhone] = useState(''); // Phone number state
  const [phoneError, setPhoneError] = useState(false); // Phone number error state
  const [email, setEmail] = useState(''); // Email state
  const [emailError, setEmailError] = useState(false); // Email error state
  const [password, setPassword] = useState(''); // Password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
  const [passwordValidation, setPasswordValidation] = useState<{ isValid: boolean; messages: string[] }>({
    isValid: false,
    messages: [],
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false); // Error state for password mismatch

  const isFormValid =
    email.includes('@') &&
    email.includes('.') &&
    !emailError &&
    passwordValidation.isValid &&
    !passwordMatchError &&
    phone.length === 10 &&
    !phoneError;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Almarai: require('../../../assets/fonts/Almarai-Regular.ttf'),
      });
      setIsFontLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    // Animate inputs and button to slide in
    Animated.stagger(700, [
      Animated.timing(inputPosition, {
        toValue: 0, // Move inputs to the center
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonPosition, {
        toValue: 0, // Move button to the center
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [inputPosition, buttonPosition]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    setEmailError(!emailRegex.test(text));
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    const phoneRegex = /^\d{10}$/; // Validate 10-digit phone numbers
    setPhoneError(!phoneRegex.test(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordValidation(validatePassword(text));
    setPasswordMatchError(text !== confirmPassword);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordMatchError(text !== password);
  };

  if (!isFontLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Logo (remains in place) */}
      <Animated.Image
        source={require('../../../assets/images/Bhaasha_Logo_Black.PNG')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Input Fields */}
      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: inputPosition }] }]}>
        {/* Email Field */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={emailError && email.length > 0 ? 'red' : '#aaa'}
            style={[styles.input, emailError && email.length > 0 ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={!passwordValidation.isValid && password.length > 0 ? 'red' : '#aaa'}
            style={[
              styles.input,
              !passwordValidation.isValid && password.length > 0 ? styles.inputError : null,
            ]}
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          {/* Password Validation Pop-Up */}
          {!passwordValidation.isValid && password.length > 0 && (
            <View style={styles.popupContainer}>
              {passwordValidation.messages.map((message, index) => (
                <Text
                  key={index}
                  style={[
                    styles.validationText,
                    passwordValidation.isValid ? styles.validText : styles.errorText,
                  ]}
                >
                  {message}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={passwordMatchError && confirmPassword.length > 0 ? 'red' : '#aaa'}
            style={[
              styles.input,
              passwordMatchError && confirmPassword.length > 0 ? styles.inputError : null,
            ]}
            secureTextEntry
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />
        </View>
        {/* Confirm Password Error */}
        {passwordMatchError && confirmPassword.length > 0 && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        {/* Phone Number Field */}
        <View style={[styles.inputWrapper, styles.phoneContainer]}>
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withEmoji
            onSelect={(country) => setCountryCode(country.cca2)}
            containerButtonStyle={styles.countryPicker}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={phoneError && phone.length > 0 ? 'red' : '#aaa'}
            style={[styles.phoneInput, phoneError && phone.length > 0 ? styles.inputError : null]}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handlePhoneChange}
          />
        </View>
      </Animated.View>

      {/* Sign Up Button */}
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateX: buttonPosition }] }]}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && { backgroundColor: '#ccc' }]} // Disable button if invalid
          onPress={() => console.log('Sign-up initiated!')}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    padding: 15,
    paddingLeft: 20,
    fontSize: 16,
    fontFamily: 'Almarai',
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
    color: 'red', // Change text color for invalid input
  },
  popupContainer: {
    position: 'absolute',
    top: -125,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  validationText: {
    fontSize: 12,
    fontFamily: 'Almarai',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Almarai',
    marginBottom: 10,
  },
  validText: {
    color: 'green',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    marginLeft: 10,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Almarai',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Almarai',
    fontWeight: 'bold',
  },
});
