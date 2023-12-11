import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FormButton = ({ title, link, disabled, onPress }) => {
  const navigation = useNavigation();
  const toLocation = () => {
    if (link) {
      navigation.navigate(link);
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        disabled={disabled}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0466c8",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "900",
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
});
export default FormButton;
