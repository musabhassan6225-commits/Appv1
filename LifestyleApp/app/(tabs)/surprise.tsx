import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Animated, Modal, Dimensions } from 'react-native';
import { Sparkles, Gift, Heart, HeartHandshake, Zap, Trophy, X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const AFFIRMATIONS = [
  "You are capable of becoming more than you can even imagine. ✨",
  "You are worthy of love, respect, and all the good things life has to offer.",
  "Your mistakes don't define you; your growth does.",
  "You have a heart of gold, Rahma. Keep shining. 🌟",
];

const QUESTS = [
  "Take a deep breath and name 3 things you can see right now.",
  "Send a 'Thinking of you' text to a friend.",
  "Write one thing you like about yourself today.",
  "Drink a glass of water and imagine it's refreshing your soul. 💧",
];

export default function SurpriseScreen() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHug, setShowHug] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [currentQuest, setCurrentQuest] = useState(QUESTS[0]);

  useEffect(() => {
    loadAchievements();
    setCurrentQuest(QUESTS[Math.floor(Math.random() * QUESTS.length)]);
    
    // Heart Pulsating Logic
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const loadAchievements = async () => {
    const saved = await AsyncStorage.getItem('user_achievements');
    if (saved) setAchievements(JSON.parse(saved));
  };

  const handleCompleteQuest = async () => {
    const updated = [currentQuest, ...achievements].slice(0, 5); // Keep last 5
    setAchievements(updated);
    await AsyncStorage.setItem('user_achievements', JSON.stringify(updated));
    // Pick a new quest for tomorrow
    setCurrentQuest(QUESTS[Math.floor(Math.random() * QUESTS.length)]);
  };

  const revealAffirmation = () => {
    setIsRevealed(true);
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. HUG MODAL (Full Screen Animation) */}
      <Modal visible={showHug} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeModal} onPress={() => setShowHug(false)}>
            <X color="white" size={30} />
          </TouchableOpacity>
          
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Heart size={150} color="white" fill="white" />
          </Animated.View>
          
          <Text style={styles.hugMsg}>This is a hug from me to you</Text>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Surprise</Text>
          <Text style={styles.subtitle}>A DAILY BOOST FOR RAHMA</Text>
        </View>

        {/* 2. SECRET MESSAGE */}
        <View style={styles.section}>
          <TouchableOpacity activeOpacity={0.9} onPress={revealAffirmation} style={styles.sparkCard}>
            {!isRevealed ? (
              <View style={styles.unrevealedContent}>
                <Gift size={40} color="white" />
                <Text style={styles.tapToReveal}>Tap to unlock your message</Text>
              </View>
            ) : (
              <Animated.View style={[styles.revealedContent, { opacity: fadeAnim }]}>
                <Text style={styles.sparkText}>{AFFIRMATIONS[0]}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>

        {/* 3. MINI-QUEST & ACHIEVEMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={18} color="#FFD700" />
            <Text style={styles.sectionTitle}>Today's Mini-Quest</Text>
          </View>
          <View style={styles.questCard}>
            <Text style={styles.questText}>{currentQuest}</Text>
            <TouchableOpacity onPress={handleCompleteQuest} style={styles.completeBtn}>
              <Trophy size={18} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.completeBtnText}>I did it!</Text>
            </TouchableOpacity>
          </View>

          {/* Achievement Area */}
          {achievements.length > 0 && (
            <View style={styles.achievementArea}>
              <Text style={styles.achieveTitle}>Recent Victories</Text>
              {achievements.map((item, index) => (
                <View key={index} style={styles.achieveRow}>
                  <Trophy size={14} color="#FFD700" />
                  <Text style={styles.achieveText}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 4. GET A HUG BUTTON */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setShowHug(true)} style={styles.hugButton}>
            <HeartHandshake size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={styles.hugButtonText}>Get a Hug</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F5' },
  header: { padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { color: '#FF8A8A', fontWeight: '700', fontSize: 11, letterSpacing: 1.5 },
  section: { paddingHorizontal: 24, marginTop: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  
  // Modal/Hug Animation
  modalOverlay: { flex: 1, backgroundColor: 'rgba(255, 138, 138, 0.95)', justifyContent: 'center', alignItems: 'center' },
  closeModal: { position: 'absolute', top: 50, right: 30 },
  hugMsg: { color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 40, textAlign: 'center', paddingHorizontal: 40 },

  // Cards
  sparkCard: { height: 140, backgroundColor: 'white', borderRadius: 25, borderWidth: 1.5, borderColor: '#FFD1D1', overflow: 'hidden' },
  unrevealedContent: { flex: 1, backgroundColor: '#FF8A8A', justifyContent: 'center', alignItems: 'center' },
  tapToReveal: { color: 'white', fontWeight: 'bold', marginTop: 10 },
  revealedContent: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  sparkText: { fontSize: 16, color: '#4B5563', textAlign: 'center', fontWeight: '600' },

  questCard: { backgroundColor: 'white', padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#FFD1D1', alignItems: 'center' },
  questText: { fontSize: 15, color: '#4B5563', textAlign: 'center', marginBottom: 15 },
  completeBtn: { backgroundColor: '#FFD700', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, flexDirection: 'row' },
  completeBtnText: { color: 'white', fontWeight: 'bold' },

  // Achievements
  achievementArea: { marginTop: 20, backgroundColor: 'rgba(255,255,255,0.5)', padding: 15, borderRadius: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#FFD1D1' },
  achieveTitle: { fontSize: 14, fontWeight: 'bold', color: '#FF8A8A', marginBottom: 10 },
  achieveRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  achieveText: { fontSize: 12, color: '#6B7280' },

  // Hug Button
  hugButton: { backgroundColor: '#FFB1B1', padding: 20, borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  hugButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});