import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notas from "./screens/Notas";
import CreateNote from "./screens/CreateNote";
import DetailsNote from "./screens/DetailsNote";

export default function App() {
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#111827" },
          headerTintColor: "#f8fafc",
          headerTitleStyle: { fontSize: 16, fontWeight: "700" },
        }}
      >
        <Stack.Screen
          name="Notas"
          component={Notas}
          options={{
            title: "NOTAS",
          }}
        />
        <Stack.Screen
          name="Crear"
          component={CreateNote}
          options={{
            title: "CREAR NOTAS",
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsNote}
          options={{
            title: "DETALLES NOTAS",
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
