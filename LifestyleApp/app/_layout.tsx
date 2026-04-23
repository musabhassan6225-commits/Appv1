import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';
import { Slot } from 'expo-router';
import { PulsatingHeart } from '../src/components/PulsatingHeart';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    // Show splash for 3 seconds to let her read the text
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setIsReady(true));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF5F5', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          
          {/* Dedication Text */}
          <Text style={{ 
            color: '#FF8A8A', 
            fontSize: 16, 
            fontWeight: '600', 
            letterSpacing: 2, 
            marginBottom: 30, 
            textTransform: 'uppercase' 
          }}>
            To My one and only Rahma
          </Text>

          <PulsatingHeart />
          
        </Animated.View>
      </View>
    );
  }

  return <Slot />;
}