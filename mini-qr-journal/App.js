import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import TagEntriesScreen from "./screens/TagEntriesScreen";
import EntryDetailScreen from "./screens/EntryDetailScreen";

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
          options={({ route }) => ({ title: route.params.tag.emoji + " " + route.params.tag.name })}
        />
        <Stack.Screen
          name="EntryDetail"
          component={EntryDetailScreen}
          options={{ title: "Your Entry ✨" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
