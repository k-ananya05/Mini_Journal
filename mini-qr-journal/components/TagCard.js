import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/componentStyles";

const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function TagCard({ tag, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.tagCard, { borderLeftColor: tag.color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.tagCardHeader}>
        <Text style={styles.tagEmoji}>{tag.emoji}</Text>
        <View style={styles.tagInfo}>
          <Text style={styles.tagName}>{tag.name}</Text>
          <Text style={styles.tagCount}>{tag.count} entries</Text>
        </View>
        <Text style={styles.tagDate}>{formatDateTime(tag.lastEntry)}</Text>
      </View>
      
      <View style={[styles.tagColorBar, { backgroundColor: tag.color }]} />
    </TouchableOpacity>
  );
}