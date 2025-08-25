import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "../styles/componentStyles";

export default function AddEntryModal({ visible, onClose, onSubmit, tag }) {
  const [entryText, setEntryText] = useState("");

  const handleSubmit = () => {
    if (entryText.trim()) {
      onSubmit(entryText.trim());
      setEntryText("");
      onClose();
    }
  };

  const handleClose = () => {
    setEntryText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with tag info */}
          <View style={[styles.modalHeader, { backgroundColor: tag.color }]}>
            <Text style={styles.modalHeaderEmoji}>{tag.emoji}</Text>
            <Text style={styles.modalHeaderText}>Add to {tag.name}</Text>
          </View>
          
          {/* Entry Text Input */}
          <TextInput
            style={styles.addEntryInput}
            placeholder="What's on your mind? 💭"
            value={entryText}
            onChangeText={setEntryText}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            autoFocus={true}
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
                { backgroundColor: tag.color },
                !entryText.trim() && styles.disabledButton
              ]}
              onPress={handleSubmit}
              disabled={!entryText.trim()}
            >
              <Text style={styles.submitButtonText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}