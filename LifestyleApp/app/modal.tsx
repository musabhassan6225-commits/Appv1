import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Save, X } from 'lucide-react-native';

export default function SettingsModal() {
  const router = useRouter();
  const [tempName, setTempName] = useState('Sweetheart');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>Personalize</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text style={{ color: '#4B5563', marginBottom: 8, fontWeight: '600' }}>Her Name</Text>
        <TextInput
          value={tempName}
          onChangeText={setTempName}
          placeholder="Enter name..."
          style={{ 
            backgroundColor: '#F9FAFB', 
            padding: 16, 
            borderRadius: 15, 
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#FFD1D1',
            marginBottom: 24
          }}
        />

        <TouchableOpacity 
          style={{ 
            backgroundColor: '#FF8A8A', 
            padding: 18, 
            borderRadius: 20, 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
          onPress={() => {
            alert("Name updated! (In next step, this will save forever)");
            router.back();
          }}
        >
          <Save size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}