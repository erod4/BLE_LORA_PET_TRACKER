import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsIcon = () => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 60,
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
        nav.navigate("settings");
      }}
    >
      <FontAwesomeIcon icon={faCog} size={18} color="#fff" />
    </TouchableOpacity>
  );
};

export default SettingsIcon;
