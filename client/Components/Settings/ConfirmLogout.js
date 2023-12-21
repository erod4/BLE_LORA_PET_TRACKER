import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";

const ConfirmLogout = ({ onConfirm, onCancel }) => {
  Alert.alert(
    "Confirm Log Out",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};

export default ConfirmLogout;
