// AddEntryScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function AddEntryScreen({ route, navigation }) {
  const { setEntries } = route.params;
  const [text, setText] = useState('');

  const handleSave = () => {
    if (!text.trim()) {
      Alert.alert("Validation", "Please write something before saving!");
      return;
    }

    const entry = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString().split('T')[0]
    };

    // Save entry to parent state
    setEntries(prev => [...prev, entry]);

    // Optionally show success message
    Alert.alert("Saved", "Entry saved successfully!");

    // Clear input or navigate back
    setText('');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Write your journal entry..."
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          height: 100,
          borderRadius: 8,
          textAlignVertical: "top"
        }}
        multiline
      />
      <Button title="Save Entry" onPress={handleSave} />
    </View>
  );
}
