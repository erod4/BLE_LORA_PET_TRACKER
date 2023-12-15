import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ConfirmAccountDelete from "./ConfirmAccountDelete";
import ConfirmLogout from "./ConfirmLogout";

const SettingsPage = () => {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
  const handleDeletePress = () => {};
  const handleLogoutPress = () => {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(25, 25, 25, 1)",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <AccountSettings />
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsConfirmLogoutOpen(true);
          }}
          style={{
            backgroundColor: "#000",
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#fff" }}>
            Log Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsConfirmDeleteOpen(true);
          }}
          style={{
            backgroundColor: "red",
            margin: 20,

            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#fff" }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>

      {isConfirmDeleteOpen && (
        <ConfirmAccountDelete
          onConfirm={handleDeletePress}
          onCancel={() => {
            setIsConfirmDeleteOpen(false);
          }}
        />
      )}
      {isConfirmLogoutOpen && (
        <ConfirmLogout
          onConfirm={handleLogoutPress}
          onCancel={() => {
            setIsConfirmLogoutOpen(false);
          }}
        />
      )}
    </View>
  );
};

export default SettingsPage;
