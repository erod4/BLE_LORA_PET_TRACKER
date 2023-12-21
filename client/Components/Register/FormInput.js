import { View, Text, TextInput, StyleSheet } from "react-native";

import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  icon,
  keyboardType,
}) => {
  const [active, setActive] = useState(false);
  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      width: "100%",
      color: "#fff",
      padding: 10,
    },
    inputView: {
      fontSize: 20,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#eee",
      padding: 2,
      paddingLeft: 15,
      borderRadius: 10,
      borderColor: active ? "#0466c8" : "#000",
      borderWidth: 1,
      backgroundColor: "#253341",
      alignItems: "center",
    },
    input: {
      flex: 1,
      padding: 10,
      lineHeight: 16,
      color: "#ddd",
      alignItems: "center",
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputView}>
        <FontAwesomeIcon icon={icon} color={"#ddd"} />
        <TextInput
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          keyboardAppearance="dark"
          placeholder={placeholder}
          placeholderTextColor={"#aaa"}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
        />
      </View>
    </View>
  );
};

export default FormInput;
