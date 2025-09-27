// EntryDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/entryDetailStyles";

const formatDateTime = (date) => new Date(date).toLocaleString();

export default function EntryDetailScreen({ route, navigation }) {
  const { entry, onUpdate, tagColor } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);
  const [images, setImages] = useState(entry.images || []);
  const [linkText, setLinkText] = useState(entry.link || "");

  // Universal button size
  const buttonSize = 120; // width and height
  const buttonStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Entry Details",
      headerStyle: { backgroundColor: tagColor },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.headerButtonText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, tagColor, isEditing, images, linkText, editText]);

  const handleSave = async () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      Alert.alert("Empty Entry", "Please enter some text before saving.");
      return;
    }

    try {
      const saved = await AsyncStorage.getItem("journalEntries");
      let entries = saved ? JSON.parse(saved) : [];

      entries = entries.map((e) =>
        e.id === entry.id
          ? {
              ...e,
              text: trimmedText,
              date: new Date().toISOString(),
              images,
              link: linkText,
            }
          : e
      );

      await AsyncStorage.setItem("journalEntries", JSON.stringify(entries));
      if (onUpdate) onUpdate();
      setIsEditing(false);
      navigation.goBack();
    } catch (error) {
      console.log("Error saving entry:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const saved = await AsyncStorage.getItem("journalEntries");
            if (saved) {
              const entries = JSON.parse(saved);
              const updatedEntries = entries.filter((e) => e.id !== entry.id);
              await AsyncStorage.setItem(
                "journalEntries",
                JSON.stringify(updatedEntries)
              );
              if (onUpdate) onUpdate();
              navigation.goBack();
            }
          } catch (error) {
            console.log("Error deleting entry:", error);
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    setEditText(entry.text);
    setImages(entry.images || []);
    setLinkText(entry.link || "");
    setIsEditing(false);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((img) => img !== uri));
  };

  // NEW: Function to send entry to backend and get PDF URL
  const handleGenerateQR = async () => {
    try {
      const resp = await fetch("https://pointless-quadruplication-slyvia.ngrok-free.dev/entries",  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: entry.text,
          notes: "",
          images: entry.images || [],
          link: entry.link || "",
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await resp.json(); // { id, pdfUrl }
      navigation.navigate("QRCodeScreen", { qrValue: data.pdfUrl, tagColor });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: tagColor }]}>
        <Text style={styles.headerEmoji}>{entry.tag.emoji}</Text>
        <Text style={styles.headerTag}>{entry.tag.name}</Text>
      </View>

      {/* Date */}
      <Text style={styles.date}>{formatDateTime(entry.date)}</Text>

      {/* Entry Content */}
      <View style={styles.entryContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.editInput}
              value={editText}
              onChangeText={setEditText}
              multiline
              textAlignVertical="top"
              autoFocus
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Add a hyperlink (optional)"
              value={linkText}
              onChangeText={setLinkText}
              keyboardType="url"
            />
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: tagColor, marginTop: 10 }]}
              onPress={pickImage}
            >
              <Text style={styles.saveButtonText}>📷 Add Image</Text>
            </TouchableOpacity>
            <ScrollView horizontal style={{ marginTop: 10 }}>
              {images.map((uri, index) => (
                <View key={index} style={{ marginRight: 10 }}>
                  <Image source={{ uri }} style={styles.entryImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(uri)}
                  >
                    <Text style={styles.removeImageText}>❌</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.entryText}>{entry.text}</Text>
            {images.length > 0 && (
              <ScrollView horizontal style={{ marginTop: 10 }}>
                {images.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.entryImage} />
                ))}
              </ScrollView>
            )}
            {linkText && (
              <Text style={styles.hyperlink} onPress={() => Linking.openURL(linkText)}>
                {linkText}
              </Text>
            )}
          </>
        )}
      </View>

      {/* Action Buttons */}
      {!isEditing && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={[buttonStyle, { backgroundColor: tagColor }]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              ✏️ Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyle, { backgroundColor: "#FFF8E7" }]}
            onPress={handleGenerateQR} // UPDATED: backend QR
          >
            <Text style={{ color: "black", fontWeight: "700", fontSize: 16 }}>
              🔗 QR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyle, { backgroundColor: "#ff6b6b" }]}
            onPress={handleDelete}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              🗑️ Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Editing buttons (Cancel/Save) */}
      {isEditing && (
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: tagColor }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
