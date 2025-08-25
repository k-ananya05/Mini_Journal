import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  
  // Header Section
  header: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Search Bar
  search: {
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 12,
    margin: 20,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // List Content
  listContent: {
    padding: 20,
    paddingTop: 10,
    flexGrow: 1,
  },

  // Header Add Button
  headerAddButton: {
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
  headerAddButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // Add Entry Button
  addEntryButton: {
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: 12,
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
  addEntryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    color: "#bbb",
    fontSize: 14,
    fontStyle: "italic",
  },
});