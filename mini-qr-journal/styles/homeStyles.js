import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fefefe", 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginTop: 20,
    color: "#333"
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#666", 
    marginBottom: 30,
    fontStyle: "italic"
  },
  search: {
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
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
  emptyText: { 
    textAlign: "center", 
    marginTop: 50, 
    color: "#999",
    fontSize: 16,
    fontStyle: "italic"
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a3d2ca", // default color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});