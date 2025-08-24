import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 20 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  addButton: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  addButtonText: { textAlign: "center", fontSize: 16, color: "#fff" },
  entryCard: {
    backgroundColor: "#fdf6e3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  entryCategory: { fontSize: 16, fontWeight: "600" },
  entryText: { marginTop: 5, fontSize: 14, color: "#444" },
  entryDate: { marginTop: 8, fontSize: 12, color: "#888", textAlign: "right" },
});
