import { View, Text } from "react-native";
import React from "react";

const UserLoc = ({ userLocation }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 60,
        left: 100,
        zIndex: 2,
        backgroundColor: "rgba(45, 45, 45, 0.975)",
        width: 200,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "column",
      }}
    >
      <Text style={{ color: "#fff" }}>Lat: {userLocation?.latitude}</Text>
      <Text style={{ color: "#fff" }}>Long: {userLocation?.longitude}</Text>
    </View>
  );
};

export default UserLoc;
