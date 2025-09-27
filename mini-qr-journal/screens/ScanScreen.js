// ScanScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Linking from "expo-linking";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Request camera permissions
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // Open scanned QR code if it's a URL
    if (data.startsWith("http")) {
      Linking.openURL(data).catch(() =>
        Alert.alert("Error", "Unable to open URL")
      );
    } else {
      Alert.alert("Invalid QR", "Scanned QR code is not a valid URL");
    }

    // Reset scanner after 2 seconds
    setTimeout(() => setScanned(false), 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera. Please enable permissions in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.infoBox}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Scan a QR code to view PDF
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoBox: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
  },
});
