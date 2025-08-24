import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddButton from "../components/AddButton"; // 👈 separate button component
import styles from "../Styling/Styles";

// Helper to get nice date/time
const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};

export default function HomeScreen() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");

  // Load entries on app start
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem("journalEntries");
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading entries:", error);
    }
  };

  const saveEntries = async (newEntries) => {
    try {
      await AsyncStorage.setItem("journalEntries", JSON.stringify(newEntries));
    } catch (error) {
      console.log("Error saving entries:", error);
    }
  };

  // Add dummy entry
  const addEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      category: "🌸 Gratitude",
      text: "This is a sample journal entry ✨",
      date: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
  };

  // Search filter
  const filteredEntries = entries.filter(
    (e) =>
      e.text.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🌼 MINI QR Journal</Text>
      <Text style={styles.subtitle}>your digitalised safe space ✨</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Search your entries..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Add Entry Button */}
      <AddButton onPress={addEntry} />

      {/* Entries List */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryCategory}>{item.category}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
            <Text style={styles.entryDate}>{formatDateTime(item.date)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
            No entries yet. Add one! 🌸
          </Text>
        }
      />
    </View>
  );
}
