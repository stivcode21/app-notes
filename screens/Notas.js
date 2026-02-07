import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Notas = (props) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Notas</Text>
        <Text style={styles.subtitle}>
          Organiza tus ideas de forma rápida y clara.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Crea tu primera nota</Text>
        <Text style={styles.cardBody}>
          Guarda tus pensamientos, tareas o recordatorios en un solo lugar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Crear")}
          activeOpacity={0.85}
        >
          <Text style={styles.textButton}>Agregar nueva nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Notas;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f6fb",
  },
  content: {
    padding: 20,
    paddingTop: 28,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#121826",
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#667085",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#eef2f6",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  cardBody: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  textButton: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
