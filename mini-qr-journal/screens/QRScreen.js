import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRScreen({ route, navigation }) {
  const { qrValue, tagColor } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: tagColor }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* QR Code Center */}
      <View style={styles.qrWrapper}>
        <QRCode value={qrValue} size={250} backgroundColor="white" color="black" />
        <Text style={styles.qrText}>Scan to View Entry</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#FFB6C1", // baby pink
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  qrWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
