import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable, // Detecta toques con mas control
  TouchableWithoutFeedback, // Detecta toques sin feedback visual
  Keyboard, // Controla el teclado
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateNote = (props) => {
  const minDate = new Date(2025, 0, 1);

  const [date, setDate] = useState(new Date(1));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const NOTES_KEY = "notes";

  const getNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      return [];
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(NOTES_KEY, jsonValue);
    } catch (e) {
      console.error("Error al guardar:", e);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (mode === "time") {
      const updated = new Date(date);
      updated.setHours(currentDate.getHours(), currentDate.getMinutes(), 0, 0);
      setDate(updated);
    } else {
      setDate(currentDate);
    }

    const tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    const hours24 = tempDate.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(tempDate.getMinutes()).padStart(2, "0");
    const ampm = hours24 >= 12 ? "PM" : "AM";
    let fTime = `${hours12}:${minutes} ${ampm}`;

    // setText(fDate + " " + fTime);
    setFecha(fDate);
    setHora(fTime);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  const saveNote = async () => {
    const notes = await getNotes();
    const nextId =
      notes.reduce((maxId, n) => Math.max(maxId, parseInt(n.id, 10) || 0), 0) +
      1;
    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26),
    );

    const newNote = {
      id: `${nextId}${randomLetter}`,
      titulo: title.trim(),
      detalle: text.trim(),
      fecha: fecha,
      hora: hora,
    };

    const updatedNotes = [...notes, newNote];
    await storeData(updatedNotes);
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Tareas" }],
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <View style={styles.decorTop} pointerEvents="none" />
        <View style={styles.decorBottom} pointerEvents="none" />
        <View style={styles.card}>
          <Text style={styles.title}>Añade una nueva tarea</Text>
          <Text style={styles.subtitle}>
            Completa los campos para guardar tu idea.
          </Text>
          <View style={styles.form}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              placeholder="Ingresa el título"
              onChangeText={setTitle}
              placeholderTextColor="#9aa2b1"
              style={styles.input}
            />
            <Text style={styles.label}>Detalle</Text>
            <TextInput
              placeholder="Ingresa el detalle"
              onChangeText={setText}
              placeholderTextColor="#9aa2b1"
              style={[styles.input, styles.inputArea]}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* contenedor de fecha */}
            <View style={styles.inputDate}>
              <TextInput
                placeholder="5/12/25"
                value={fecha}
                placeholderTextColor="#9aa2b1"
                style={[styles.input, styles.textDate]}
                editable={false}
                onPressIn={() => showMode("date")}
              />
            </View>

            {/* contenedor de hora */}
            <View style={styles.inputTime}>
              <TextInput
                placeholder="08:30"
                value={hora}
                placeholderTextColor="#9aa2b1"
                style={[styles.input, styles.textTime]}
                editable={false}
                onPressIn={() => showMode("time")}
              />
            </View>

            {show && (
              <Modal
                transparent
                animationType="fade"
                onRequestClose={() => setShow(false)}
              >
                <View style={styles.pickerOverlay}>
                  <Pressable
                    style={styles.pickerBackdrop}
                    onPress={() => setShow(false)}
                  />
                  <View style={styles.pickerCard}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      style={styles.timePicker}
                      value={date}
                      mode={mode}
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      textColor={Platform.OS === "ios" ? "#0f172a" : undefined}
                      themeVariant={Platform.OS === "ios" ? "light" : undefined}
                      onChange={onChange}
                      minimumDate={mode === "date" ? minDate : undefined}
                    />
                    {Platform.OS === "ios" && (
                      <TouchableOpacity
                        style={styles.pickerDone}
                        onPress={() => setShow(false)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.pickerDoneText}>Listo</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </Modal>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={saveNote}
              activeOpacity={0.85}
            >
              <Text style={styles.submitText}>Guardar Tarea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    width: "100%",
    maxWidth: 420,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    zIndex: 1,
  },
  timePicker: {
    alignSelf: "stretch",
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },
  pickerCard: {
    width: "85%",
    maxWidth: 360,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 7,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  pickerDone: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#0ea5a4",
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  pickerDoneText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
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
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  form: {
    marginTop: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    fontSize: 16,
    color: "#0f172a",
    fontFamily: Platform.select({
      ios: "AvenirNext-Regular",
      android: "sans-serif",
    }),
  },
  inputArea: {
    minHeight: 140,
  },
  inputDate: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  textDate: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  inputTime: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  textTime: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#0ea5a4",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#0ea5a4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 3,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.4,
    fontFamily: Platform.select({
      ios: "AvenirNext-DemiBold",
      android: "sans-serif-medium",
    }),
  },
});
