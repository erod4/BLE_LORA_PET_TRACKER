import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Searchresult from "./Searchresult";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";

const DisconnectedPanel = () => {
  const { isSearching, scannedDevices } = useContext(BLEContext);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isSearching ? "Search Results" : "Begin Scanning For Devices"}
      </Text>

      {scannedDevices && (
        <Searchresult
          name={scannedDevices?.name}
          key={scannedDevices?.id}
          device={scannedDevices}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
    fontSize: 18,
  },
});
export default DisconnectedPanel;
