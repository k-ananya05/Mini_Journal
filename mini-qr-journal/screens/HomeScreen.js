import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddButton from "../components/AddButton";
import TagCard from "../components/TagCard";
import TagModal from "../components/TagModel";
import styles from "../styles/homeStyles";

// Predefined aesthetic themes
export const THEMES = {
  sunset: { color: "#FF6B6B", emoji: "🌅", name: "Sunset" },
  ocean: { color: "#4ECDC4", emoji: "🌊", name: "Ocean" },
  lavender: { color: "#A8A2D3", emoji: "🌸", name: "Lavender" },
  forest: { color: "#95E1D3", emoji: "🌿", name: "Forest" },
  golden: { color: "#F7DC6F", emoji: "✨", name: "Golden" },
  cherry: { color: "#FFB6C1", emoji: "🌺", name: "Cherry" },
  sky: { color: "#87CEEB", emoji: "☁️", name: "Sky" },
  mint: { color: "#98FB98", emoji: "🍃", name: "Mint" },
};

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const saved = await AsyncStorage.getItem("journalEntries");
      if (saved) setEntries(JSON.parse(saved));
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

  // Add new entry with selected tag
  const addEntry = (selectedTag, entryText) => {
    const newEntry = {
      id: Date.now().toString(),
      tag: selectedTag,
      text: entryText,
      date: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
  };

  // Group entries by tags
  const getTagsWithCounts = () => {
    const tagCounts = {};
    entries.forEach(entry => {
      if (entry.tag) {
        if (!tagCounts[entry.tag.name]) {
          tagCounts[entry.tag.name] = {
            ...entry.tag,
            count: 0,
            lastEntry: entry.date,
          };
        }
        tagCounts[entry.tag.name].count++;
        if (new Date(entry.date) > new Date(tagCounts[entry.tag.name].lastEntry)) {
          tagCounts[entry.tag.name].lastEntry = entry.date;
        }
      }
    });
    return Object.values(tagCounts).sort(
      (a, b) => new Date(b.lastEntry) - new Date(a.lastEntry)
    );
  };

  const filteredTags = getTagsWithCounts().filter(tag =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTagPress = (tag) => {
    navigation.navigate('TagEntries', { tag, entries: entries.filter(e => e.tag?.name === tag.name) });
  };

  // ------------------------------
  // DELETE TAG FUNCTIONALITY
  // ------------------------------
  const handleTagLongPress = (tag) => {
    Alert.alert(
      "Delete Tag",
      `Are you sure you want to delete the tag "${tag.name}" and all its entries?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            const updatedEntries = entries.filter(e => e.tag?.name !== tag.name);
            setEntries(updatedEntries);
            saveEntries(updatedEntries);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>🌼 MINI QR Journal</Text>
      <Text style={styles.subtitle}>your digitalised safe space ✨</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Search your tags..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Add Entry Button */}
      <AddButton onPress={() => setShowTagModal(true)} />

      {/* Tags List */}
      <FlatList
        data={filteredTags}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TagCard 
            tag={item} 
            onPress={() => handleTagPress(item)}
            onLongPress={() => handleTagLongPress(item)} // <-- delete on long press
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tags yet. Add one! 🌸
          </Text>
        }
      />

      {/* Tag Selection Modal */}
      <TagModal
        visible={showTagModal}
        onClose={() => setShowTagModal(false)}
        onSubmit={addEntry}
        themes={THEMES}
      />
    </View>
  );
}
