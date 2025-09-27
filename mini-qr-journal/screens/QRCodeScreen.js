// QRCodeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen({ route }) {
  const { qrValue, tagColor } = route.params;

  return (
    <View style={{
      flex: 1,
      backgroundColor: tagColor || '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#fff' }}>
        Scan to View Entry PDF
      </Text>
      <QRCode value={qrValue} size={250} backgroundColor="#fff" color="black" />
    </View>
  );
}
