import React from "react";
import { Pressable, Text } from "react-native";
import styles from "../styles/styles";

export default function AddButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.addButton,
        { backgroundColor: pressed ? "#b5e0d7" : "#a3d2ca" }, // 👈 lighter when pressed
      ]}
    >
      <Text style={styles.addButtonText}>+ Add Dummy Entry</Text>
    </Pressable>
  );
}
