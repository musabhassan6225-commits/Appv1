import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { Smile, Heart, Meh, Frown, Save, Sparkles, Clock, ShieldAlert, HeartHandshakes, Wind, Phone } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Reflection {
  id: string;
  dateKey: string;
  displayDate: string;
  mood: string;
  text: string;
}

const MOODS = [
  { label: 'Happy', icon: Smile, color: '#FF8A8A' },
  { label: 'Loved', icon: Heart, color: '#FFB1B1' },
  { label: 'Okay', icon: Meh, color: '#D1D5DB' },
  { label: 'Sad', icon: Frown, color: '#9CA3AF' },
];

export default function JournalScreen() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMood, setCurrentMood] = useState('Happy');
  const [entryText, setEntryText] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('user_reflections');
      if (saved) setReflections(JSON.parse(saved));
    } catch (e) { console.error("Load error", e); }
  };

  const saveReflection = async () => {
    if (!entryText.trim()) return;
    const newEntry: Reflection = {
      id: Date.now().toString(),
      dateKey: selectedDate,
      displayDate: new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: currentMood,
      text: entryText,
    };
    const otherEntries = reflections.filter(r => r.dateKey !== selectedDate);
    const updated = [newEntry, ...otherEntries];
    setReflections(updated);
    await AsyncStorage.setItem('user_reflections', JSON.stringify(updated));
    setEntryText('');
  };

  const openSupportMenu = () => {
    Alert.alert(
      "We're here for you, Rahma",
      "It's okay to have down days. What would help right now?",
      [
        { text: "Breathing Exercise", onPress: () => console.log("Start Breathwork") },
        { text: "Call a Loved One", onPress: () => console.log("Open Phone") },
        { text: "Close", style: "cancel" }
      ]
    );
  };

  const dateList = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      return {
        full: iso,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        hasEntry: reflections.some(r => r.dateKey === iso)
      };
    }).reverse();
  }, [reflections]);

  const selectedEntry = reflections.find(r => r.dateKey === selectedDate);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5F5' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Reflections</Text>
            <Text style={styles.subtitle}>YOUR JOURNEY, DAY BY DAY</Text>
          </View>

          {/* CALENDAR SCROLLER */}
          <View style={styles.calendarWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
              {dateList.map((date) => (
                <TouchableOpacity 
                  key={date.full} 
                  onPress={() => setSelectedDate(date.full)}
                  style={[styles.dateCard, selectedDate === date.full && styles.selectedDateCard]}
                >
                  <Text style={[styles.dayName, selectedDate === date.full && styles.selectedText]}>{date.dayName}</Text>
                  <Text style={[styles.dayNum, selectedDate === date.full && styles.selectedText]}>{date.dayNum}</Text>
                  {date.hasEntry && <View style={[styles.dot, selectedDate === date.full && { backgroundColor: 'white' }]} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* INPUT AREA / VIEW AREA */}
          {!selectedEntry || entryText !== '' ? (
            <View style={styles.inputContainer}>
              <View style={styles.moodHeader}>
                <View style={styles.moodIconCircle}>
                  {React.createElement(MOODS.find(m => m.label === currentMood)?.icon || Smile, { size: 35, color: '#FF8A8A' })}
                </View>
                <View style={styles.moodPicker}>
                  {MOODS.map((m) => (
                    <TouchableOpacity key={m.label} onPress={() => setCurrentMood(m.label)} style={[styles.moodSmallBtn, currentMood === m.label && { backgroundColor: '#FF8A8A' }]}>
                      <m.icon size={18} color={currentMood === m.label ? 'white' : '#9CA3AF'} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* SAD FEATURE BUTTON: Only visible when "Sad" is the active mood */}
              {currentMood === 'Sad' && (
                <TouchableOpacity onPress={openSupportMenu} style={styles.supportButton}>
                  <ShieldAlert size={18} color="white" style={{ marginRight: 8 }} />
                  <Text style={styles.supportButtonText}>Need a moment of support?</Text>
                </TouchableOpacity>
              )}

              <View style={styles.textCard}>
                <TextInput 
                  placeholder="What's happening today, Rahma?"
                  multiline
                  value={entryText}
                  onChangeText={setEntryText}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={saveReflection} style={styles.saveBtn}>
                  <Save size={18} color="white" style={{ marginRight: 8 }} />
                  <Text style={styles.saveBtnText}>Save Reflection</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewCard}>
              <View style={styles.viewHeader}>
                <View style={styles.viewMoodIcon}>
                  {React.createElement(MOODS.find(m => m.label === selectedEntry.mood)?.icon || Smile, { size: 24, color: '#FF8A8A' })}
                </View>
                <Text style={styles.viewDateText}>{selectedEntry.displayDate}</Text>
              </View>
              <Text style={styles.viewContent}>{selectedEntry.text}</Text>
              <TouchableOpacity onPress={() => setEntryText(selectedEntry.text)} style={styles.editHint}>
                <Text style={styles.editHintText}>Tap to edit this memory</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* RECENT FEED SECTION */}
          <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
              <Clock size={20} color="#FF8A8A" />
              <Text style={styles.feedTitle}>Recent Memories</Text>
            </View>

            {reflections.slice(0, 5).map((item) => (
              <TouchableOpacity key={item.id} onPress={() => setSelectedDate(item.dateKey)} style={styles.feedCard}>
                <View style={styles.feedCardLeft}>
                   {React.createElement(MOODS.find(m => m.label === item.mood)?.icon || Smile, { size: 18, color: '#FF8A8A' })}
                </View>
                <View style={styles.feedCardRight}>
                  <Text style={styles.feedCardDate}>{item.displayDate}</Text>
                  <Text style={styles.feedCardText} numberOfLines={1}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 24, paddingBottom: 15 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { color: '#FF8A8A', fontWeight: '700', fontSize: 11, letterSpacing: 1.5 },
  calendarWrapper: { marginBottom: 25 },
  dateCard: { width: 55, height: 75, backgroundColor: 'white', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#FFD1D1' },
  selectedDateCard: { backgroundColor: '#FF8A8A', borderColor: '#FF8A8A' },
  dayName: { fontSize: 10, color: '#9CA3AF', marginBottom: 2, fontWeight: '600' },
  dayNum: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  selectedText: { color: 'white' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF8A8A', marginTop: 4 },
  inputContainer: { paddingHorizontal: 24 },
  moodHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  moodIconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFD1D1' },
  moodPicker: { flexDirection: 'row', gap: 8 },
  moodSmallBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFD1D1' },
  supportButton: { backgroundColor: '#9CA3AF', padding: 12, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  supportButtonText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  textCard: { backgroundColor: 'white', borderRadius: 25, padding: 20, borderWidth: 1, borderColor: '#FFD1D1' },
  textInput: { fontSize: 16, color: '#4B5563', minHeight: 100, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#FF8A8A', padding: 15, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: 'white', fontWeight: 'bold' },
  viewCard: { marginHorizontal: 24, backgroundColor: 'white', borderRadius: 25, padding: 25, borderWidth: 1, borderColor: '#FFD1D1' },
  viewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  viewMoodIcon: { backgroundColor: '#FFF5F5', padding: 10, borderRadius: 12, marginRight: 15 },
  viewDateText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  viewContent: { color: '#4B5563', lineHeight: 24, fontSize: 16 },
  editHint: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 15, alignItems: 'center' },
  editHintText: { color: '#9CA3AF', fontSize: 12, fontStyle: 'italic' },
  feedContainer: { marginTop: 35, paddingHorizontal: 24 },
  feedHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  feedTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  feedCard: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  feedCardLeft: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  feedCardRight: { flex: 1 },
  feedCardDate: { fontSize: 12, fontWeight: 'bold', color: '#1F2937' },
  feedCardText: { fontSize: 13, color: '#9CA3AF', marginTop: 2 }
});