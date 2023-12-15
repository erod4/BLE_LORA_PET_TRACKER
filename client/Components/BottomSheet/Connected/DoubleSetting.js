import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { Linking } from "react-native";
import SettingIcon from "./SettingIcon";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";
import { LocationContext } from "../../Location/LocationProvider";
const DoubleSetting = ({ name, onPress, icon, iconBGColor, description }) => {
  const { long, lat } = useContext(BLEContext);
  const { userLocation } = useContext(LocationContext);
  const handlePress = () => {
    if (lat && long) {
      const url = `http://maps.apple.com/?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${lat},${long}&dirflg=d`;
      Linking.openURL(url);
    }
  };
  return (
    <Pressable style={styles.touchable} onPress={handlePress}>
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
