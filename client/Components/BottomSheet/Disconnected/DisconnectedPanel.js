import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Searchresult from "./Searchresult";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";

const DisconnectedPanel = () => {
  const { availableDevices } = useContext(BLEContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search Results</Text>

      {availableDevices?.map((device, index) => {
        return <Searchresult name={device?.name} key={index} device={device} />;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
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
