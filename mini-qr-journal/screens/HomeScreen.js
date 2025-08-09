import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([
    { id: '1', text: 'My first journal entry', date: '2025-08-09' },
    { id: '2', text: 'Learning React Native!', date: '2025-08-08' }
  ]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Entry" onPress={() => navigation.navigate('AddEntry', { setEntries })} />
      <Button title="Scan QR" onPress={() => navigation.navigate('Scan')} />

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('QRCode', { entry: item })}>
            <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#eee' }}>
              <Text>{item.text}</Text>
              <Text style={{ fontSize: 12, color: '#555' }}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
