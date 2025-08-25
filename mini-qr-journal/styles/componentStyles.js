import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // TagCard Styles
  tagCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tagCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  tagInfo: {
    flex: 1,
  },
  tagName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tagCount: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  tagDate: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  tagColorBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 15,
    opacity: 0.7,
  },

  // EntryCard Styles
  entryCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 5,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  entryText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    marginBottom: 12,
  },
  entryColorBar: {
    height: 3,
    borderRadius: 2,
    opacity: 0.6,
  },

  // TagModal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },

  // Entry Input
  entryInput: {
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fafafa",
    marginBottom: 20,
    minHeight: 100,
  },

  // Theme Selection
  themeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  themeGrid: {
    maxHeight: 200,
    marginBottom: 25,
  },
  themeOption: {
    flex: 1,
    margin: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    maxWidth: "22%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedTheme: {
    transform: [{ scale: 0.95 }],
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  themeEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  themeName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // AddEntryModal Styles
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  modalHeaderEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  addEntryInput: {
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fafafa",
    marginBottom: 20,
    minHeight: 150,
  },

  // Modal Buttons
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#95a5a6",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#a3d2ca",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#ddd",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});