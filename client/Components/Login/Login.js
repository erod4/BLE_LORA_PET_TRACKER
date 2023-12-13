import { ScrollView, StyleSheet, Text, View } from "react-native";
import LoginForm from "./LoginForm";

const Login = () => {
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
      <LoginForm />
    </View>
  );
};

export default Login;
