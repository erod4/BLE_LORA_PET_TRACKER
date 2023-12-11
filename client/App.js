import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import PetMarker from "./Components/MarkerComponent/PetMarker";
import PetCallout from "./Components/MarkerComponent/PetCallout";
import Map from "./Components/MapComponents/Map";
import BottomPanel from "./Components/BottomSheet/BottomPanel";
import { BLEContextProvider } from "./Components/BluetoothComonents/BLEContextProvider";
import Searching from "./Components/BluetoothComonents/BluetoothConnectScreen.js/Searching";
import Home from "./Components/Home";
import { SettingContextProvider } from "./Components/BottomSheet/Connected/SettingContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Components/Login/Login";
import SettingsPage from "./Components/Settings/SettingsPage";
import RegisterScreen from "./Components/Register/RegisterScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BLEContextProvider>
        <SettingContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="settings"
                component={SettingsPage}
                options={{
                  title: "Settings",
                  headerShown: true,
                  headerStyle: { backgroundColor: "rgba(25, 25, 25, 1)" },
                  headerTitleStyle: { color: "#fff" },
                  headerTintColor: "#fff",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SettingContextProvider>
      </BLEContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
