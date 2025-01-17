import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const logoPosition = useRef(new Animated.Value(-300)).current; // Start off-screen to the left
  const buttonPosition = useRef(new Animated.Value(-700)).current; // Start buttons off-screen to the left
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0); // Track the current translation

  const translations = [
    'New User?', // English
    '¿Nuevo Usuario?', // Spanish
    'Neuer Benutzer?', // German
    'Nouvel Utilisateur ?', // French
    'ಹೊಸ ಬಳಕೆದಾರರು?', // Kannada
    'కొత్త వినియోగదారు?', // Telugu
    'புதிய பயனர்?', // Tamil
    'नया उपयोगकर्ता?', // Hindi
  ];

  useEffect(() => {
    // Logo animation: Move left to right
    Animated.timing(logoPosition, {
      toValue: 0, // Move logo to the center
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Trigger button animation after logo animation completes
      Animated.timing(buttonPosition, {
        toValue: 0, // Move buttons to the center
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });

    // Start cycling translations
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % translations.length);
    }, 2000); // Change every 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [logoPosition, buttonPosition, translations.length]);

  const handleLogin = () => {
    // Add authentication logic here
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.Image
        source={require('../../../assets/images/Bhaasha_Logo_Black.PNG')} // Replace with your logo path
        style={[
          styles.logo,
          {
            transform: [
              { translateX: logoPosition }, // Straight left-to-right animation
            ],
          },
        ]}
        resizeMode="contain"
      />

      {/* Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ translateX: buttonPosition }] }, // Slide-in animation
        ]}
      >
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Separator with cycling text */}
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>{translations[currentLanguageIndex]}</Text>
          <View style={styles.line} />
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Signup</Text>
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
    marginBottom: 50, // Space between logo and buttons
  },
  buttonContainer: {
    marginTop: 20, // Space above buttons for aesthetic layout
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%', // Adjust width as needed
    paddingVertical: 15, // Adjust height of the button
    backgroundColor: '#007bff', // Blue background for the button
    borderRadius: 30, // Rounded corners
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, // Space around the separator
    width: '80%', // Match button width for perfect alignment
  },
  line: {
    flex: 1, // Take up remaining space
    height: 1,
    backgroundColor: '#007bff', // Match button color for a cohesive look
    marginHorizontal: 10, // Space between the line and text
  },
  separatorText: {
    fontSize: 14,
    color: '#666', // Gray text for subtle contrast
    fontWeight: 'bold',
  },
});
