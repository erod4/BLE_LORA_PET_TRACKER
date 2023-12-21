import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { faBluetoothB } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";

const Searchresult = ({ name, device }) => {
  const { selectAndConnectToDevice } = useContext(BLEContext);
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faBluetoothB} color={"#fff"} size={20} />
        </View>
        <Text style={styles.deviceName}>{name}</Text>
      </View>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => {
          selectAndConnectToDevice(device);
        }}
      >
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 10,
    backgroundColor: "rgba(45, 45, 45, 0.975)",
  },
  containerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconContainer: {
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0466c8",
    width: 25,
    height: 25,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  connectButton: {
    backgroundColor: "#0466c8",
    borderRadius: 20,
    padding: 5,
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
export default Searchresult;
