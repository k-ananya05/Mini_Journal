import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, FlatList } from "react-native";
import styles from "../styles/homeStyles"; // adjust if you want separate modal styles

export default function TagModal({ visible, onClose, onSubmit, themes }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [tagName, setTagName] = useState("");

  const handleSubmit = () => {
    if (!selectedTheme) {
      Alert.alert("Select a theme", "Please select a theme for your tag.");
      return;
    }
    if (!tagName.trim()) {
      Alert.alert("Name required", "You must enter a name for your tag.");
      return;
    }

    const tag = {
      ...selectedTheme,
      name: tagName.trim(),
    };

    onSubmit(tag, ""); // You can pass empty string for entry text here
    setSelectedTheme(null);
    setTagName("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: "#00000080", justifyContent: "center", padding: 20 }}>
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>New Tag</Text>

          {/* Theme Selection */}
          <FlatList
            data={Object.values(themes)}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedTheme(item)}
                style={{
                  padding: 12,
                  marginRight: 10,
                  borderRadius: 8,
                  borderWidth: selectedTheme?.name === item.name ? 2 : 0,
                  borderColor: "#000",
                  backgroundColor: item.color,
                }}
              >
                <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Tag Name Input */}
          <TextInput
            placeholder="Enter tag name"
            value={tagName}
            onChangeText={setTagName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              marginTop: 20,
            }}
          />

          {/* Buttons */}
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
              <Text style={{ color: "#666", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ color: "#4ECDC4", fontSize: 16, fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
