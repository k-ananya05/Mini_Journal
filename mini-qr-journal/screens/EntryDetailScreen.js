import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/entryDetailStyles";

const formatDateTime = (date) => {
  return new Date(date).toLocaleString();
};

export default function EntryDetailScreen({ route, navigation }) {
  const { entry, onUpdate, tagColor } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);

  useEffect(() => {
    navigation.setOptions({
      title: "Entry Details",
      headerStyle: {
        backgroundColor: tagColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.headerButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, tagColor, isEditing]);

  const handleSave = async () => {
  const trimmedText = editText.trim();
  if (!trimmedText) {
    Alert.alert("Empty Entry", "Please enter some text before saving.");
    return;
  }

  try {
    const saved = await AsyncStorage.getItem("journalEntries");
    let entries = saved ? JSON.parse(saved) : [];

    // Update the entry
    entries = entries.map(e =>
      e.id === entry.id ? { ...e, text: trimmedText, date: new Date().toISOString() } : e
    );

    await AsyncStorage.setItem("journalEntries", JSON.stringify(entries));

    // Notify previous screen to reload
    if (onUpdate) onUpdate();

    setIsEditing(false);
    navigation.goBack(); // optional: go back after saving
  } catch (error) {
    console.log("Error saving entry:", error);
  }
};


  const handleDelete = () => {
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
          onPress: async () => {
            try {
              const saved = await AsyncStorage.getItem("journalEntries");
              if (saved) {
                const entries = JSON.parse(saved);
                const updatedEntries = entries.filter(e => e.id !== entry.id);
                await AsyncStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
                onUpdate();
                navigation.goBack();
              }
            } catch (error) {
              console.log("Error deleting entry:", error);
            }
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    setEditText(entry.text);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: tagColor }]}>
        <Text style={styles.headerEmoji}>{entry.tag.emoji}</Text>
        <Text style={styles.headerTag}>{entry.tag.name}</Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>{formatDateTime(entry.date)}</Text>

      {/* Entry Content */}
      <View style={styles.entryContainer}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
            multiline={true}
            textAlignVertical="top"
            autoFocus={true}
          />
        ) : (
          <Text style={styles.entryText}>{entry.text}</Text>
        )}
      </View>

      {/* Action Buttons */}
      {isEditing ? (
        <View style={styles.editButtons}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: tagColor }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: tagColor }]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>✏️ Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}