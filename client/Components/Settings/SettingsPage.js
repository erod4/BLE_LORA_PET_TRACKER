import { View, Text } from "react-native";
import React from "react";
import AccountSettings from "./AccountSettings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SettingsPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(25, 25, 25, 1)" }}>
      <AccountSettings />
    </View>
  );
};

export default SettingsPage;
