import { Text, View, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import useNoteStore from "../store/useNoteStore";

const DetailsNote = () => {
  const selectedNoteId = useNoteStore((state) => state.selectedNoteId);
  const [note, setNote] = useState(null);
  const NOTES_KEY = "notes";

  useEffect(() => {
    const loadNote = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
        const notes = jsonValue ? JSON.parse(jsonValue) : [];
        const found = notes.find((n) => n.id === selectedNoteId);
        setNote(found || null);
      } catch (e) {
        setNote(null);
      }
    };

    if (selectedNoteId) {
      loadNote();
    } else {
      setNote(null);
    }
  }, [selectedNoteId]);

  if (!note) {
    return (
      <View style={styles.screen}>
        <View style={styles.decorTop} pointerEvents="none" />
        <View style={styles.decorBottom} pointerEvents="none" />
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No hay nota seleccionada.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.decorTop} pointerEvents="none" />
      <View style={styles.decorBottom} pointerEvents="none" />
      <View style={styles.detailCard}>
        <Text style={styles.title}>{note.titulo || "Sin título"}</Text>
        <Text style={styles.meta}>
          {note.fecha || "Sin fecha"} · {note.hora || "Sin hora"}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{note.detalle || "Sin detalle"}</Text>
      </View>
    </View>
  );
};

export default DetailsNote;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    padding: 22,
    paddingTop: 32,
    overflow: "hidden",
  },
  decorTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 120,
    backgroundColor: "#e0f2fe",
    opacity: 0.7,
  },
  decorBottom: {
    position: "absolute",
    bottom: -140,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: "#dc96f55c",
    opacity: 0.7,
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: 0.2,
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-medium",
    }),
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748b",
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginTop: 14,
    marginBottom: 14,
  },
  body: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  emptyText: {
    fontSize: 15,
    color: "#64748b",
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
});
