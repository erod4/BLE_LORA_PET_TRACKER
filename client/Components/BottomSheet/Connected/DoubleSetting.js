import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import SettingIcon from "./SettingIcon";
const DoubleSetting = ({ name, onPress, icon, iconBGColor, description }) => {
  return (
    <Pressable style={styles.touchable}>
      <View style={styles.container}>
        <SettingIcon icon={icon} bgColor={iconBGColor} rotate={true} />

        <Text style={styles.setting}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  touchable: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  container: {
    backgroundColor: "rgba(45, 45, 45, 0.975)",
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
export default DoubleSetting;
