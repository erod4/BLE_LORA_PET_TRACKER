import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import BottomPanel from "./BottomSheet/BottomPanel";
import Map from "./MapComponents/Map";
import { BLEContext } from "./BluetoothComonents/BLEContextProvider";
import Searching from "./BluetoothComonents/BluetoothConnectScreen.js/Searching";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsIcon from "./Settings/SettingsIcon";
import ReCenter from "./MapComponents/ReCenter";

const Home = () => {
  const { isSearching, isConnected } = useContext(BLEContext);
  return (
    <View style={styles.container}>
      <SettingsIcon />

      {!(isSearching || !isConnected) ? <Searching /> : <Map />}
      <BottomPanel />
    </View>
  );
};
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

export default Home;
