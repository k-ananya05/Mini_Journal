import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "../styles/componentStyles";

export default function TagModal({ visible, onClose, onSubmit, themes }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [entryText, setEntryText] = useState("");

  const handleSubmit = () => {
    if (selectedTheme && entryText.trim()) {
      onSubmit(selectedTheme, entryText.trim());
      setSelectedTheme(null);
      setEntryText("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedTheme(null);
    setEntryText("");
    onClose();
  };

  const themeKeys = Object.keys(themes);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <Text style={styles.modalTitle}>✨ Create New Entry</Text>
          
          {/* Entry Text Input */}
          <TextInput
            style={styles.entryInput}
            placeholder="What's on your mind? 💭"
            value={entryText}
            onChangeText={setEntryText}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Theme Selection */}
          <Text style={styles.themeTitle}>Choose a vibe 🎨</Text>
          <FlatList
            data={themeKeys}
            numColumns={4}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const theme = themes[item];
              const isSelected = selectedTheme?.name === theme.name;
              
              return (
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    { backgroundColor: theme.color },
                    isSelected && styles.selectedTheme
                  ]}
                  onPress={() => setSelectedTheme(theme)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.themeEmoji}>{theme.emoji}</Text>
                  <Text style={styles.themeName}>{theme.name}</Text>
                </TouchableOpacity>
              );
            }}
            style={styles.themeGrid}
          />

          {/* Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!selectedTheme || !entryText.trim()) && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!selectedTheme || !entryText.trim()}
            >
              <Text style={styles.submitButtonText}>Create Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}