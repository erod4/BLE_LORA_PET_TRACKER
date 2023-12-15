import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const ConfirmLogout = ({ onConfirm, onCancel }) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View
        style={{
          backgroundColor: "rgba(45, 45, 45, 1)",
          borderWidth: 2,
          borderColor: "#0466c8",
          borderRadius: 10,
          padding: 10,
          gap: 15,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}>
          Confirm Log Out?
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onConfirm;
            }}
            style={{
              padding: 10,
              backgroundColor: "#0466c8",
              borderRadius: 10,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700", color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            style={{
              padding: 10,
              backgroundColor: "#aaa",
              borderRadius: 10,
              width: 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700", color: "#fff" }}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmLogout;
