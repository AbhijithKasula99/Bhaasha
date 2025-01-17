import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  // Animated values for background color and logo position
  const colorValue = useRef(new Animated.Value(0)).current;
  const logoPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the background color
    Animated.loop(
      Animated.timing(colorValue, {
        toValue: 1,
        duration: 4000, // Duration for one full color cycle
        easing: Easing.linear,
        useNativeDriver: false, // Required for color animations
      })
    ).start();

    // Animate the logo from bottom to center
    Animated.timing(logoPosition, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login'); // Navigate to Login after animation
    });
  }, [colorValue, logoPosition, navigation]);

 const backgroundColor = colorValue.interpolate({
  inputRange: Array.from({ length: 21 }, (_, i) => i / 20), // Generates 21 values (0 to 1, inclusive)
  outputRange: [
    '#ffea00', // Bright Yellow
    '#00f59b', // Greenish Cyan
    '#ff5400', // Bright Orange
    '#00ff00', // Neon Green
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#0000ff', // Bright Blue
    '#ff0000', // Bright Red
    '#00ffff', // Cyan
    '#ff9900', // Orange
    '#cc00ff', // Purple
    '#33ff00', // Light Green
    '#00ccff', // Sky Blue
    '#ff0066', // Pink
    '#66ff33', // Light Lime Green
    '#ffcc00', // Gold
    '#3399ff', // Soft Blue
    '#ff3333', // Coral Red
    '#33ffff', // Bright Cyan
    '#ccff00', // Lime
    '#ffea00', // Bright Yellow (Cycle repeats)
  ],
});


  // Interpolating logo position
  const translateY = logoPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Animate from bottom to middle
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Animated Logo */}
      <Animated.Image
        source={require('../../../assets/images/Bhaasha_Logo_White.PNG')} // Replace with your actual logo
        style={[styles.logo, { transform: [{ translateY }] }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
});
