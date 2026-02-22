# App Notes

Aplicacion movil de tareas hecha con **React Native + Expo**.  
Permite crear tareas, listarlas y ver el detalle de cada una. Los datos se guardan localmente en el dispositivo usando `AsyncStorage`.

## Tecnologias

- Expo SDK 54
- React Native 0.81
- React Navigation (stack)
- Zustand (estado temporal de seleccion)
- AsyncStorage (persistencia local)
- DateTimePicker

## Requisitos

- Node.js LTS (recomendado 20.x o 22.x)
- npm
- Expo Go en celular (opcional, para pruebas rapidas)
- Android Studio / Xcode (opcional, para emuladores)

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

Comandos utiles:

```bash
npm run android
npm run ios
npm run web
```

## Como funciona

1. Pantalla `Tareas` (`screens/Notas.js`)
   - Lee las notas desde `AsyncStorage` con la clave `notes`.
   - Muestra lista de tareas o estado vacio.
   - Boton `+` navega a `Crear`.
2. Pantalla `Crear` (`screens/CreateNote.js`)
   - Captura titulo, detalle, fecha y hora.
   - Genera ID en formato `numero + letra` (ejemplo: `12K`).
   - Guarda en `AsyncStorage` y vuelve a `Tareas`.
3. Pantalla `Detail` (`screens/DetailsNote.js`)
   - Toma la nota seleccionada por ID.
   - Muestra titulo, fecha/hora y detalle.

## Estructura del proyecto

```text
app-notes/
|- App.js
|- index.js
|- screens/
|  |- Notas.js
|  |- CreateNote.js
|  |- DetailsNote.js
|- store/
|  |- useNoteStore.js
|- assets/
|- app.json
|- package.json
```

## Persistencia de datos

- Clave usada en almacenamiento local: `notes`
- Estructura de cada nota:

```json
{
  "id": "1A",
  "titulo": "Titulo",
  "detalle": "Detalle",
  "fecha": "9/2/2026",
  "hora": "8:30 PM"
}
```

## Que tener en cuenta

- Los datos son **locales** al dispositivo/emulador; al cambiar de dispositivo no se comparten.
- Si desinstalas la app o limpias almacenamiento, se pierden las notas.
- Actualmente no hay editar/eliminar notas desde UI.
- No hay validaciones estrictas antes de guardar (puede guardar campos vacios).
- La seleccion de nota para detalle se maneja en Zustand (`selectedNoteId`), no por params de navegacion.
- `CreateNote` usa `minimumDate` de 2025 para el selector de fecha.

## Proximas mejoras recomendadas

1. Validar campos obligatorios antes de guardar.
2. Agregar editar/eliminar nota.
3. Ordenar notas por fecha de creacion.
4. Agregar pruebas basicas de componentes y almacenamiento.
5. Migrar la seleccion de nota a params de navegacion para evitar dependencias globales.

