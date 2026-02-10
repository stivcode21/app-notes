import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react-native";
import useNoteStore from "../store/useNoteStore";

const GRID_SIZE = 10;
const GRID_CELLS = Array.from({ length: 4000 });

const Notas = (props) => {
  const [notes, setNotes] = useState([]);
  const NOTES_KEY = "notes";
  const setSelectedNoteId = useNoteStore((state) => state.setSelectedNoteId);

  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      setNotes(jsonValue ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error("Error cargando notas:", e);
      setNotes([]);
    }
  };

  useEffect(() => {
    loadNotes();
    const unsubscribe = props.navigation.addListener("focus", loadNotes); //desmontar el listener cuando se desmonta el componente
    return unsubscribe;
  }, [props.navigation]);

  // const clearNotes = async () => {
  //   try {
  //     await AsyncStorage.removeItem(NOTES_KEY);
  //     setNotes([]);
  //   } catch (e) {

  //   }
  // };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid} pointerEvents="none">
        {GRID_CELLS.map((_, index) => (
          <View key={`cell-${index}`} style={styles.gridCell} />
        ))}
      </View>

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Tareas</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => props.navigation.navigate("Crear")}
            activeOpacity={0.85}
            accessibilityLabel="Agregar nueva nota"
          >
            <Plus size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Organiza tus tareas de forma rápida y clara.
        </Text>
      </View>

      {/* {__DEV__ && (
        <TouchableOpacity
          style={styles.devButton}
          onPress={clearNotes}
          activeOpacity={0.85}
          accessibilityLabel="Limpiar notas (dev)"
        >
          <Text style={styles.devButtonText}>Limpiar notas (dev)</Text>
        </TouchableOpacity>
      )} */}

      {notes.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Crea tu primera tarea</Text>
          <Text style={styles.cardBody}>
            gestiona tus tareas o recordatorios en un solo lugar.
          </Text>
          <Text style={styles.cardHint}>
            Usa el botón + para agregar una nueva tarea.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {notes.map((note) => (
            <TouchableOpacity
              key={note.id}
              style={styles.noteCard}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedNoteId(note.id);
                props.navigation.navigate("Detail");
              }}
              accessibilityLabel={`Nota ${note.titulo || "sin título"}`}
            >
              <Text style={styles.noteTitle}>
                {note.titulo?.trim() || "Sin título"}
              </Text>
              <Text style={styles.noteBody} numberOfLines={1}>
                {note.detalle?.trim() || "Sin detalle"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Notas;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  content: {
    padding: 22,
    paddingTop: 32,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.35,
  },
  gridCell: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 1,
    borderColor: "#79d9c839",
  },
  header: {
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#313773",
    letterSpacing: 0.2,
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-medium",
    }),
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748b",
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#0ea5a4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0ea5a4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 3,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-medium",
    }),
  },
  cardBody: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  cardHint: {
    marginTop: 12,
    fontSize: 13,
    color: "#94a3b8",
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  devButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    backgroundColor: "#f97316",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  devButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  list: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5a4",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-medium",
    }),
  },
  noteBody: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
});
