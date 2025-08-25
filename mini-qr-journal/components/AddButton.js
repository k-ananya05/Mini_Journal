import React from "react";
import { Pressable, Text } from "react-native";
import styles from "../styles/homeStyles";

export default function AddButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.addButton,
        { backgroundColor: pressed ? "#8cbcb4" : "#a3d2ca" }, // same color scheme, darker when pressed
      ]}
    >
      <Text style={styles.addButtonText}>+ Add Tag</Text>
    </Pressable>
  );
}
