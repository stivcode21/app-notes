import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useState } from "react";

const CreateNote = (props) => {
  const initialState = {
    titulo: "",
    detalle: "",
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState(initialState);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    let fTime = tempDate.getHours() + " minutos: " + tempDate.getMinutes();

    // setText(fDate + " " + fTime);
    setFecha(fDate);
    setHora(fTime);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Añade una nueva nota</Text>
        <Text style={styles.subtitle}>
          Completa los campos para guardar tu idea.
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Ingresa el título"
            placeholderTextColor="#9aa2b1"
            style={styles.input}
          />
          <Text style={styles.label}>Detalle</Text>
          <TextInput
            placeholder="Ingresa el detalle"
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
              placeholderTextColor="#9aa2b1"
              style={[styles.input, styles.textDate]}
            />
            <TouchableOpacity
              style={styles.buttonDate}
              onPress={() => showMode("date")}
              activeOpacity={0.85}
            >
              <Text style={styles.textLabel}>Date</Text>
            </TouchableOpacity>
          </View>

          {/* contenedor de hora */}
          <View style={styles.inputTime}>
            <TextInput
              placeholder="08:30"
              placeholderTextColor="#9aa2b1"
              style={[styles.input, styles.textTime]}
            />
            <TouchableOpacity
              style={styles.buttonTime}
              onPress={() => showMode("time")}
              activeOpacity={0.85}
            >
              <Text style={styles.textLabel}>Hora</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date("2025-1-1")}
            />
          )}

          <TouchableOpacity style={styles.submitButton} activeOpacity={0.85}>
            <Text style={styles.submitText}>Guardar nota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f6fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    width: "100%",
    maxWidth: 420,
    padding: 22,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eef2f6",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    color: "#111827",
  },
  inputArea: {
    minHeight: 120,
  },
  inputDate: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  textDate: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  buttonDate: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  inputTime: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  textTime: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  buttonTime: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 18,
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#111827",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 3,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  textLabel: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
