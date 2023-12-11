import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TrainerMarker = () => {
  return <View style={styles.marker} />;
};
const styles = StyleSheet.create({
  marker: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "rgb(0, 120, 254)",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
export default TrainerMarker;
