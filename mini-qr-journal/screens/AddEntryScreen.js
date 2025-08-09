import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function AddEntryScreen({ route, navigation }) {
  const { setEntries } = route.params;
  const [text, setText] = useState('');

  const handleSave = () => {
    setEntries(prev => [
      ...prev,
      { id: Date.now().toString(), text, date: new Date().toISOString().split('T')[0] }
    ]);
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
          height: 100
        }}
        multiline
      />
      <Button title="Save Entry" onPress={handleSave} />
    </View>
  );
}
