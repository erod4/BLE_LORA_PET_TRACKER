import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SettingIcon from "./SettingIcon";

const SingleSetting = ({
  name,
  onPress,
  icon,
  iconBGColor,
  description,
  disabled,
  bgColor,
  shadow,
}) => {
  const styles = StyleSheet.create({
    touchable: {
      width: "100%",
      alignItems: "center",
      flex: 1,
      shadowColor: shadow ? bgColor : "rgba(0,0,0,0)", // Same as background color
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    container: {
      backgroundColor: bgColor,
      padding: 18,
      borderRadius: 10,
      width: "100%",
    },
    setting: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "700",
    },
    description: {
      color: "#999",
      fontSize: 12,
      fontWeight: "700",
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled && true}
      style={styles.touchable}
      onPress={() => {
        onPress();
      }}
    >
      <View style={styles.container}>
        <SettingIcon icon={icon} bgColor={iconBGColor} />
        <Text style={styles.setting}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleSetting;
