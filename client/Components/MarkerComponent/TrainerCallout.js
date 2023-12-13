import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLightbulb,
  faPaw,
  faPlay,
  faTurnDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const TrainerCallout = ({ name }) => {
  library.add(faPaw, faLightbulb, faPlay, faTurnDown);
  return (
    <View style={styles.callout}>
      <FontAwesomeIcon icon={faUser} color="#fff" />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  callout: {
    position: "relative",
    top: 110,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 100,
    width: 70,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: "rgba(0,0,0,0.5s)",
  },
  name: { fontWeight: "700", color: "#fff" },
  image: {
    width: 20,
    height: 20,
  },
});
export default TrainerCallout;
