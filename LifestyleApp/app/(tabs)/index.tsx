import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { PulsatingHeart } from '../../src/components/PulsatingHeart';

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('');
  const name = "Sweetheart"; 

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}>
          
          <PulsatingHeart />

          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: '#FF8A8A', fontSize: 18, fontWeight: '500', letterSpacing: 4, textTransform: 'uppercase' }}>
              {greeting}
            </Text>
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#1F2937', marginTop: 12, textAlign: 'center' }}>
              {name}
            </Text>
            <View style={{ height: 2, width: 64, backgroundColor: '#FFD1D1', marginTop: 24, borderRadius: 999 }} />
          </View>

          <View style={{ 
            marginTop: 48, 
            padding: 32, 
            backgroundColor: 'white', 
            borderRadius: 40, 
            borderWidth: 1, 
            borderColor: '#FFD1D1', 
            width: '100%',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16, textAlign: 'center', fontWeight: 'bold' }}>
              Today's Thought
            </Text>
            <Text style={{ color: '#4B5563', textAlign: 'center', fontStyle: 'italic', fontSize: 18, lineHeight: 28 }}>
              "Every day with you is a new favorite chapter in our story. I'm so glad you're here."
            </Text>
          </View>

          <Text style={{ marginTop: 40, color: '#FF8A8A', opacity: 0.4, fontSize: 12, fontWeight: '600' }}>
            STAY BEAUTIFUL • STAY YOU
          </Text>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}