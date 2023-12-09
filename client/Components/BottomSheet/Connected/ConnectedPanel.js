import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import SingleSetting from "./SingleSetting";
import DoubleSetting from "./DoubleSetting";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTurnDown,
  faLightbulb,
  faPlay,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";
import { SettingContext } from "./SettingContext";
const ConnectedPanel = ({ name, isContentsShown }) => {
  const { connectedDevice, sendData } = useContext(BLEContext);
  const {
    toggleLight,
    playSound,
    navigateTo,
    setDirections,
    isLightOn,
    playingSound,
  } = useContext(SettingContext);

  useEffect(() => {
    sendData(`Light: ${isLightOn} `);
  }, [isLightOn]);
  useEffect(() => {
    sendData(`Sound: ${playingSound} `);
  }, [playingSound]);
  return (
    <View style={styles.header}>
      <View style={styles.nameContainer}>
        <FontAwesomeIcon icon={faPaw} color="#fff" />
        <Text style={styles.name}>{name}</Text>
      </View>
      {isContentsShown && (
        <>
          <Text style={styles.address}>4592 39th St, San Diego, CA 92116</Text>
          <View style={styles.doubleContainer}>
            <SingleSetting
              icon={faLightbulb}
              name={"Light"}
              iconBGColor={"purple"}
              description={isLightOn ? "ON" : "OFF"}
              onPress={toggleLight}
              bgColor={isLightOn ? "#0466c8" : "rgba(45, 45, 45, 0.975)"}
              shadow={isLightOn ? true : false}
            />
            <SingleSetting
              icon={faPlay}
              name={playingSound ? "Sound Playing" : "Play Sound"}
              iconBGColor={"red"}
              description={playingSound ? "ON" : "OFF"}
              onPress={playSound}
              disabled={playingSound ? true : false}
              bgColor={playingSound ? "#0466c8" : "rgba(45, 45, 45, 0.975)"}
              shadow={playingSound ? true : false}
            />
          </View>
          <DoubleSetting
            icon={faTurnDown}
            name={"Directions"}
            iconBGColor={"green"}
            description={"Get Directions to Pet"}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 15,
    gap: 10,
  },
  nameContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
    textAlign: "left",
    width: "100%",
  },
  address: {
    color: "#aaa",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "left",
    width: "100%",
  },
  doubleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
});
export default ConnectedPanel;
