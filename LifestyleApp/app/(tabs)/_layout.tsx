import React from 'react';
import { Tabs } from 'expo-router';
import { Home, List, Sparkles, Target, BookHeart } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF8A8A',
        tabBarInactiveTintColor: '#D1D1D1',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vision"
        options={{
          title: 'Vision',
          tabBarIcon: ({ color }) => <Target size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <BookHeart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Reasons',
          tabBarIcon: ({ color }) => <List size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="surprise"
        options={{
          title: 'Surprise',
          tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}