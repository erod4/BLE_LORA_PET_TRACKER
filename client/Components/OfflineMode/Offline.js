import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlugCircleMinus } from "@fortawesome/free-solid-svg-icons";

const Offline = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 60,
        zIndex: 5,
        backgroundColor: "rgba(45, 45, 45, 0.975)",
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        gap: 5,
      }}
    >
      <FontAwesomeIcon icon={faPlugCircleMinus} color="#fff" />
      <Text style={{ color: "#fff", fontWeight: "700" }}>
        No Network Connection
      </Text>
    </View>
  );
};

export default Offline;
