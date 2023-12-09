import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import AppleLogin from "./AppleLogin.js/AppleLogin";

const Login = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.page}>
        <AppleLogin />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: "rgba(25, 25, 25, 1)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Login;
