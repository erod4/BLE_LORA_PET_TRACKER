import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Map from "./MapComponents/Map";
import { BLEContext } from "./BluetoothComonents/BLEContextProvider";
import Searching from "./BluetoothComonents/BluetoothConnectScreen.js/Searching";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsIcon from "./Settings/SettingsIcon";
import ReCenter from "./MapComponents/ReCenter";
import Offline from "./OfflineMode/Offline";
import { useNetInfo } from "@react-native-community/netinfo";
import BottomPanel from "./BottomSheet/BottomPanel";

const Home = () => {
  const { connectionStatus } = useContext(BLEContext);
  const { type, isConnected } = useNetInfo();

  return (
    <View style={styles.container}>
      {!isConnected && <Offline />}
      <SettingsIcon />
      {/* <Map /> */}
      {connectionStatus === "Connected" ? <Map /> : <Searching />}
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
