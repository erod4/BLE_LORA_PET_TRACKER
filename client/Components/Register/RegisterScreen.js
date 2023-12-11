import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import RegisterForm from "./RegisterForm";

const RegisterScreen = () => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      backgroundColor: "#192734",

      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  library.add(faUser);
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;
