import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Smile } from 'lucide-react-native';

const REASONS = [
  { id: '1', text: 'The way your eyes light up when you laugh.' },
  { id: '2', text: 'How you always know exactly what to say.' },
  { id: '3', text: 'Your incredible kindness towards everyone.' },
  { id: '4', text: 'The way you challenge me to be a better person.' },
  { id: '5', text: 'Your passion for the things you love.' },
  { id: '6', text: 'The peace I feel whenever you are near.' },
  { id: '7', text: 'How you remember the smallest details about us.' },
  { id: '8', text: 'Your strength and resilience.' },
  { id: '9', text: 'The way you make even mundane days special.' },
  { id: '10', text: 'Your beautiful, creative soul.' },
  { id: '11', text: 'How you support my dreams unconditionally.' },
  { id: '12', text: 'The safety I find in your hug.' },
  { id: '13', text: 'Your infectious sense of humor.' },
  { id: '14', text: 'The way you look at the world with wonder.' },
  { id: '15', text: 'Simply because you are exactly who you are.' },
];

export default function ReasonsScreen() {
  const renderItem = ({ item, index }: { item: typeof REASONS[0], index: number }) => (
    <View style={{ 
      backgroundColor: 'white', 
      borderRadius: 20, 
      padding: 20, 
      marginBottom: 16, 
      flexDirection: 'row', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FFD1D1',
    }}>
      <View style={{ 
        width: 36, height: 36, backgroundColor: '#FFF5F5', 
        borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 16
      }}>
        <Text style={{ color: '#FF8A8A', fontWeight: 'bold' }}>{index + 1}</Text>
      </View>
      <Text style={{ flex: 1, color: '#4B5563', fontSize: 16, lineHeight: 22 }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      <FlatList
        data={REASONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <View style={{ alignItems: 'center', marginBottom: 32, marginTop: 20 }}>
            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 50, marginBottom: 16, borderWidth: 1, borderColor: '#FFD1D1' }}>
              <Smile size={40} color="#FF8A8A" />
            </View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1F2937' }}>15 Reasons Why</Text>
            <Text style={{ color: '#FF8A8A', fontSize: 14, fontWeight: '600', marginTop: 4, letterSpacing: 1 }}>I LOVE YOU</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}