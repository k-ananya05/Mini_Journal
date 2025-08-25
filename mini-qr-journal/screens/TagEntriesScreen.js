import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EntryCard from "../components/EntryCard";
import AddEntryModal from "../components/AddEntryModel";
import styles from "../styles/tagEntriesStyles";

const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};

export default function TagEntriesScreen({ route, navigation }) {
  const { tag } = route.params;
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `${tag.emoji} ${tag.name}`,
      headerStyle: {
        backgroundColor: tag.color,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerAddButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.headerAddButtonText}>+ Add</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, tag]);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem("journalEntries");
      if (saved) {
        const allEntries = JSON.parse(saved);
        setAllEntries(allEntries);
        const tagEntries = allEntries.filter(entry => entry.tag?.name === tag.name);
        setEntries(tagEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
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

  const addEntry = (entryText) => {
    const newEntry = {
      id: Date.now().toString(),
      tag: tag,
      text: entryText,
      date: new Date().toISOString(),
    };
    
    const updatedAllEntries = [newEntry, ...allEntries];
    const updatedTagEntries = [newEntry, ...entries];
    
    setAllEntries(updatedAllEntries);
    setEntries(updatedTagEntries);
    saveEntries(updatedAllEntries);
  };

  const deleteEntry = (entryId) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedAllEntries = allEntries.filter(entry => entry.id !== entryId);
            setAllEntries(updatedAllEntries);
            setEntries(entries.filter(entry => entry.id !== entryId));
            saveEntries(updatedAllEntries);
          }
        }
      ]
    );
  };

  const handleEntryPress = (entry) => {
    navigation.navigate('EntryDetail', { 
      entry, 
      onUpdate: loadEntries,
      tagColor: tag.color 
    });
  };

  // Filter entries based on search
  const filteredEntries = entries.filter(entry =>
    entry.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: tag.color }]}>
        <Text style={styles.headerTitle}>{tag.emoji} {tag.name}</Text>
        <Text style={styles.headerSubtitle}>{entries.length} entries</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Search entries..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Add Entry Button - Floating style */}
      <TouchableOpacity 
        style={[styles.addEntryButton, { backgroundColor: tag.color }]}
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addEntryButtonText}>✨ Add New Entry</Text>
      </TouchableOpacity>

      {/* Entries List */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EntryCard
            entry={item}
            onPress={() => handleEntryPress(item)}
            onDelete={() => deleteEntry(item.id)}
            tagColor={tag.color}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No entries in this tag yet 🌸</Text>
            <Text style={styles.emptySubtext}>Tap the button above to add your first entry!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Entry Modal */}
      <AddEntryModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={addEntry}
        tag={tag}
      />
    </View>
  );
}