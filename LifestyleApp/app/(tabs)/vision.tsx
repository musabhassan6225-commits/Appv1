import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Target, CheckCircle2, Circle, Plus, X, Bell, MessageCircleHeart, Quote, ImageIcon, History, Sparkles, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Goal {
  id: string;
  title: string;
  description: string;
  timeframe: 'Daily' | 'Weekly' | 'Monthly';
  completed: boolean;
  imageUri?: string | null;
}

const SUCCESS_QUOTES = [
  "Rahma, your dedication is as beautiful as your soul.",
  "Every step you take makes the world a little brighter.",
  "I am so incredibly proud of the woman you are becoming.",
  "There is nothing you can't achieve with that heart of yours.",
  "Watching you grow is my favorite part of every day."
];

const LOVE_NUDGES = [
  "Just a reminder: You are doing so well today. ❤️",
  "I'm thinking of you and that beautiful smile right now.",
  "Don't stress the small things, Rahma. You've got this!",
  "You're the hardest worker I know. Take a deep breath.",
  "I am so lucky to be the one cheering you on."
];

export default function VisionScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeTab, setActiveTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [showArchive, setShowArchive] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [randomLoveNote, setRandomLoveNote] = useState("");

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);

  useEffect(() => { loadGoals(); }, []);

  const loadGoals = async () => {
    const saved = await AsyncStorage.getItem('user_vision_goals');
    if (saved) setGoals(JSON.parse(saved));
  };

  const saveGoals = async (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    await AsyncStorage.setItem('user_vision_goals', JSON.stringify(updatedGoals));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });
    if (!result.canceled) setNewImage(result.assets[0].uri);
  };

  const addGoal = () => {
    if (newTitle.trim() === '') return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      timeframe: activeTab,
      completed: false,
      imageUri: newImage,
    };
    saveGoals([...goals, newGoal]);
    setNewTitle(''); setNewDesc(''); setNewImage(null); setModalVisible(false);
  };

  const toggleGoal = (id: string) => {
    const goalToToggle = goals.find(g => g.id === id);
    if (goalToToggle && !goalToToggle.completed) {
      setCurrentQuote(SUCCESS_QUOTES[Math.floor(Math.random() * SUCCESS_QUOTES.length)]);
      setQuoteVisible(true);
    }
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    saveGoals(updated);
  };

  // NEW: Delete Functionality
  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Intent",
      "Are you sure you want to remove this from your vision?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            const updated = goals.filter(g => g.id !== id);
            saveGoals(updated);
          } 
        }
      ]
    );
  };

  const getSurpriseNote = () => {
    setRandomLoveNote(LOVE_NUDGES[Math.floor(Math.random() * LOVE_NUDGES.length)]);
    setSurpriseVisible(true);
  };

  const filteredGoals = goals.filter(g => g.timeframe === activeTab && g.completed === showArchive);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#1F2937' }}>
              {showArchive ? 'The Archive' : 'Vision Hub'}
            </Text>
            <Text style={{ color: '#FF8A8A', fontWeight: '600' }}>
              {showArchive ? 'MEMORIES OF GROWTH' : 'FOR MY ONE & ONLY RAHMA'}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={getSurpriseNote} style={{ backgroundColor: 'white', padding: 12, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#FFD1D1' }}>
              <Bell color="#FF8A8A" size={24} />
              <View style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, backgroundColor: '#FF3B30', borderRadius: 4, borderWidth: 1, borderColor: 'white' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowArchive(!showArchive)} style={{ backgroundColor: 'white', padding: 12, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#FFD1D1' }}>
              {showArchive ? <Target color="#FF8A8A" size={24} /> : <History color="#FF8A8A" size={24} />}
            </TouchableOpacity>
            {!showArchive && (
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#FF8A8A', padding: 12, borderRadius: 20 }}>
                <Plus color="white" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {!showArchive && (
          <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, padding: 5, marginVertical: 20, borderWidth: 1, borderColor: '#FFD1D1' }}>
            {['Daily', 'Weekly', 'Monthly'].map(t => (
              <TouchableOpacity key={t} onPress={() => setActiveTab(t as any)} style={{ flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: activeTab === t ? '#FF8A8A' : 'transparent', borderRadius: 15 }}>
                <Text style={{ fontWeight: 'bold', color: activeTab === t ? 'white' : '#9CA3AF' }}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: showArchive ? 20 : 0 }}>
        {filteredGoals.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Sparkles size={48} color="#FFD1D1" />
            <Text style={{ color: '#9CA3AF', marginTop: 10 }}>No {activeTab.toLowerCase()} {showArchive ? 'completed' : 'goals'} yet.</Text>
          </View>
        ) : null}

        {filteredGoals.map((goal) => (
          <TouchableOpacity 
            key={goal.id} 
            onPress={() => !showArchive && toggleGoal(goal.id)} 
            onLongPress={() => confirmDelete(goal.id)} // Long press to trigger delete
            activeOpacity={showArchive ? 1 : 0.7}
            style={{ backgroundColor: 'white', borderRadius: 25, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: goal.completed ? '#FF8A8A' : '#F3F4F6', elevation: 2 }}
          >
            {goal.imageUri && (
              <Image source={{ uri: goal.imageUri }} style={{ width: '100%', height: 140, opacity: goal.completed ? 0.6 : 1 }} />
            )}
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937', textDecorationLine: goal.completed ? 'line-through' : 'none' }}>{goal.title}</Text>
                {goal.description ? <Text style={{ color: '#9CA3AF', fontSize: 13, marginTop: 4 }}>{goal.description}</Text> : null}
              </View>
              
              {/* If in Archive, show a direct delete button; otherwise show the check circle */}
              {showArchive ? (
                <TouchableOpacity onPress={() => confirmDelete(goal.id)}>
                   <Trash2 size={20} color="#FFD1D1" />
                </TouchableOpacity>
              ) : (
                goal.completed ? <CheckCircle2 size={28} color="#FF8A8A" /> : <Circle size={28} color="#D1D5DB" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Success, Surprise, and Add Goal Modals remain identical to previous version */}
      <Modal visible={quoteVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 138, 138, 0.95)', justifyContent: 'center', padding: 40 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 35, padding: 40, alignItems: 'center' }}>
            <Quote size={40} color="#FF8A8A" style={{ marginBottom: 20 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', lineHeight: 30 }}>{currentQuote}</Text>
            <TouchableOpacity onPress={() => setQuoteVisible(false)} style={{ marginTop: 30, backgroundColor: '#FF8A8A', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 20 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>You're Welcome ❤️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={surpriseVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 245, 245, 0.95)', justifyContent: 'center', padding: 30 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 40, alignItems: 'center', borderWidth: 2, borderColor: '#FFD1D1' }}>
            <MessageCircleHeart size={40} color="#FF8A8A" style={{ marginBottom: 20 }} />
            <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center', color: '#1F2937', fontStyle: 'italic', lineHeight: 32 }}>"{randomLoveNote}"</Text>
            <TouchableOpacity onPress={() => setSurpriseVisible(false)} style={{ marginTop: 40, backgroundColor: '#1F2937', paddingHorizontal: 40, paddingVertical: 18, borderRadius: 25 }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close with a smile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>New {activeTab} Vision</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}><X color="#9CA3AF" /></TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={pickImage} style={{ width: '100%', height: 120, backgroundColor: '#F9FAFB', borderRadius: 15, borderStyle: 'dashed', borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center', marginBottom: 15, overflow: 'hidden' }}>
              {newImage ? <Image source={{ uri: newImage }} style={{ width: '100%', height: '100%' }} /> : <View style={{ alignItems: 'center' }}><ImageIcon size={24} color="#9CA3AF" /><Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 5 }}>Add Inspiration Photo</Text></View>}
            </TouchableOpacity>

            <TextInput placeholder="What are we manifesting?" style={{ backgroundColor: '#F9FAFB', padding: 18, borderRadius: 15, marginBottom: 15 }} value={newTitle} onChangeText={setNewTitle} />
            <TextInput placeholder="Add some details..." style={{ backgroundColor: '#F9FAFB', padding: 18, borderRadius: 15, marginBottom: 25, height: 80 }} value={newDesc} onChangeText={setNewDesc} multiline />
            
            <TouchableOpacity onPress={addGoal} style={{ backgroundColor: '#FF8A8A', padding: 20, borderRadius: 25, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Release to the Universe</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}