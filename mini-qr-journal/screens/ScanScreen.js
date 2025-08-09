// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function ScanScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [data, setData] = useState('');

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setData(data);
//     alert(`Scanned ID: ${data}`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={{ flex: 1 }}
//       />
//       {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
//       {data ? <Text style={{ padding: 10 }}>Scanned Data: {data}</Text> : null}
//     </View>
//   );
// }
