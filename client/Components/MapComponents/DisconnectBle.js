import { View, Text, Alert } from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBluetoothB } from "@fortawesome/free-brands-svg-icons";
import { BLEContext } from "../BluetoothComonents/BLEContextProvider";

const DisconnectBle = () => {
  const { disconnectDevice } = useContext(BLEContext);
  const onCancel = () => {};
  const onConfirm = () => {
    disconnectDevice();
  };

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 160,
        left: 20,
        zIndex: 2,
        backgroundColor: "rgba(45, 45, 45, 0.975)",
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
      onPress={() => {
        Alert.alert(
          "Confirm Device Disconnect",
          "Are you sure you want to disconnecct device?",
          [
            {
              text: "Cancel",
              onPress: onCancel,
              style: "cancel",
            },
            {
              text: "Disconnect",
              onPress: onConfirm,
            },
          ],
          { cancelable: false }
        );
      }}
    >
      <FontAwesomeIcon icon={faBluetoothB} size={18} color="#fff" />
    </TouchableOpacity>
  );
};

export default DisconnectBle;
