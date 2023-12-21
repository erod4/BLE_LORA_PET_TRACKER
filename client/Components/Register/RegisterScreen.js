import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import RegisterForm from "./RegisterForm";
import { authContext } from "../Login/UserContextProvider";

const RegisterScreen = () => {
  const { error, clearError } = useContext(authContext);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
      const timer = setTimeout(() => {
        setIsError(false), clearError();
      }, 3000); // Set the timeout
      return () => clearTimeout(timer);
    }
  }, [error]);
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      backgroundColor: "rgba(25, 25, 25, 1)",

      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  library.add(faUser);
  return (
    <View style={styles.container}>
      {error && isError && <Text style={{ color: "red" }}>{error}</Text>}

      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;
