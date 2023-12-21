import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";

const ConfirmAccountDelete = ({ onConfirm, onCancel }) => {
  Alert.alert(
    "Confirm Account Deletion",
    "Are you sure you want to delete your account?",
    [
      {
        text: "Cancel",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
};

export default ConfirmAccountDelete;
