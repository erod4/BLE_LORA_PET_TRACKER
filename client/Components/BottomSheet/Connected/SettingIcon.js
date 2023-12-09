import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const SettingIcon = ({ icon, bgColor, rotate }) => {
  return (
    <View
      style={{
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginVertical: 5,
        backgroundColor: bgColor,
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        color="#fff"
        style={rotate ? { transform: [{ rotate: "-90deg" }] } : {}}
      />
    </View>
  );
};

export default SettingIcon;
