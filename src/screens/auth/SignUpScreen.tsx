import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, TextInput, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { validatePassword } from '../../utils/passwordValidation';
import CustomInput from '../../utils/InputBar'; // Reusable input component
import CustomButton from '../../utils/button'; // Reusable button component

export default function SignUpScreen({ navigation }: any) {
  const inputPosition = useRef(new Animated.Value(-700)).current;
  const buttonPosition = useRef(new Animated.Value(-700)).current;
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    messages: [],
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);

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
    Animated.stagger(700, [
      Animated.timing(inputPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [inputPosition, buttonPosition]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(text));
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    const phoneRegex = /^\d{10}$/;
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
      <Animated.Image
        source={require('../../../assets/images/Bhaasha_Logo_Black.PNG')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Animated.View style={[styles.inputContainer, { transform: [{ translateX: inputPosition }] }]}>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          isError={emailError}
          errorMessage={emailError ? 'Invalid email' : ''}
          errorStyle={styles.inputError}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          isError={!passwordValidation.isValid && password.length > 0}
          errorStyle={styles.inputError}
          validationMessages={
            !passwordValidation.isValid && password.length > 0 ? passwordValidation.messages : []
          }
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
          isError={passwordMatchError && confirmPassword.length > 0}
          errorMessage={passwordMatchError ? 'Passwords do not match' : ''}
          errorStyle={styles.inputError}
        />
        {/* Phone Number with Country Picker */}
        <View style={[styles.inputWrapper, styles.phoneContainer]}>
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withEmoji
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
            containerButtonStyle={styles.countryPicker}
          />
          <TextInput
            editable={false}
            value={`+${callingCode}`}
            style={[styles.input, styles.callingCode]}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            placeholderTextColor={phoneError ? 'red' : '#aaa'}
            style={[styles.input, phoneError ? styles.inputError : null, styles.phoneInput]}
          />
        </View>
        {phoneError && <Text style={styles.errorText}>Invalid phone number</Text>}
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, { transform: [{ translateX: buttonPosition }] }]}>
        <CustomButton
          title="Sign Up"
          onPress={() => console.log('Sign-up initiated!')}
          disabled={!isFormValid}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Almarai',
    color: '#333',
  },
  callingCode: {
    maxWidth: 70,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  phoneInput: {
    flex: 1,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputError: {
    borderColor: 'red',
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Almarai',
    marginTop: 5,
  },
});
