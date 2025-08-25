import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import TagEntriesScreen from "./screens/TagEntriesScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";
import QRScreen from "./screens/QRScreen"; // ✅ Import the QR screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#b5e0d7" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="TagEntries"
          component={TagEntriesScreen}
          options={{ title: "Tag Entries" }}
        />
        <Stack.Screen
          name="EntryDetail"
          component={EntryDetailScreen}
          options={{ title: "Your Entry ✨" }}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRScreen} // ✅ Add QR screen here
          options={{ headerShown: false }} // optional: full-screen QR
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
