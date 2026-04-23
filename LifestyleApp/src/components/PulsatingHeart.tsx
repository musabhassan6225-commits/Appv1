import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

export function PulsatingHeart() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={animatedStyle}>
        <Heart 
          size={80} 
          color="#FF8A8A" 
          fill="#FF8A8A" 
          strokeWidth={1.5}
        />
      </Animated.View>
      {/* Soft background glow */}
      <View 
        style={{ 
          position: 'absolute', 
          width: 96, 
          height: 96, 
          backgroundColor: '#FFD1D1', 
          borderRadius: 999, 
          opacity: 0.2,
          transform: [{ scale: 1.4 }] 
        }} 
      />
    </View>
  );
}