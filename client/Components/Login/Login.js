import { ScrollView, StyleSheet, Text, View } from "react-native";
import LoginForm from "./LoginForm";
import { useContext, useEffect, useState } from "react";
import { authContext } from "./UserContextProvider";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const { userAuth, error, clearError } = useContext(authContext);
  const [isError, setIsError] = useState(false);

  const nav = useNavigation();
  useEffect(() => {
    console.log(userAuth);
    if (userAuth) {
      nav.navigate("home");
    }
  }, []);
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
      flex: 1,
      backgroundColor: "rgba(25, 25, 25, 1)",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
  });
  return (
    <View style={styles.container}>
      {error && isError && <Text style={{ color: "red" }}>{error}</Text>}
      <LoginForm />
    </View>
  );
};

export default Login;
