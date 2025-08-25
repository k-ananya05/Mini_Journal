import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/componentStyles";

const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function EntryCard({ entry, onPress, onDelete, tagColor }) {
  const truncatedText = entry.text.length > 100 
    ? entry.text.substring(0, 100) + "..."
    : entry.text;

  return (
    <TouchableOpacity 
      style={[styles.entryCard, { borderLeftColor: tagColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{formatDateTime(entry.date)}</Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.entryText}>{truncatedText}</Text>
      
      <View style={[styles.entryColorBar, { backgroundColor: tagColor }]} />
    </TouchableOpacity>
  );
}