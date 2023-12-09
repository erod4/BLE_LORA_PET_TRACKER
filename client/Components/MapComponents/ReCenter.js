import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

import { StyleSheet } from "react-native";

const ReCenter = ({ handleRecenter }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 120,
        right: 20,
        zIndex: 2,
        backgroundColor: "rgba(45, 45, 45, 0.975)",
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
      onPress={() => {
        handleRecenter();
      }}
    >
      <FontAwesomeIcon icon={faLocationCrosshairs} size={18} color="#fff" />
    </TouchableOpacity>
  );
};

export default ReCenter;
