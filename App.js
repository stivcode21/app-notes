import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notas from "./screens/Notas";
import CreateNote from "./screens/CreateNote";
import DetailsNote from "./screens/DetailsNote";
import doty from "./assets/Dotylogo.png";
import { Image } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#0f172a",
          headerTitleStyle: { fontSize: 16, fontWeight: "700" },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <Image
              source={doty}
              style={{ width: 140, height: 50, resizeMode: "cover" }}
            />
          ),
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Tareas" component={Notas} options={{}} />
        <Stack.Screen
          name="Crear"
          component={CreateNote}
          options={{
            title: "CREAR TEREA",
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsNote}
          options={{
            title: "DETALLES TAREA",
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
