import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../Register/FormInput";
import FormButton from "../Register/FormButton";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (formData.email === "" || formData.password === "") {
      // Show an error message or prevent form submission
      alert("Please fill in all required fields.");
    } else {
      // Perform form submission
      // ...
    }
  };
  const navigation = useNavigation();
  const toSignUp = () => {
    navigation.navigate("register");
  };
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      gap: 20,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      display: "flex",
      alignItems: "center",
      fontSize: 18,
      justifyContent: "center",
      flexDirection: "row",
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      <FormInput
        icon={faEnvelope}
        label={"Email"}
        placeholder={"Email"}
        onChangeText={(text) => {
          handleInputChange("email", text);
        }}
      />
      <FormInput
        icon={faLock}
        label={"Password"}
        placeholder={"Password"}
        secureTextEntry={true}
        onChangeText={(text) => {
          handleInputChange("password", text);
        }}
      />
      <FormButton link={"nav"} title={"Login"} onPress={handleSubmit} />

      <View style={styles.text}>
        <Text style={{ color: "#aaa" }}>Don't have an account? </Text>
        <TouchableOpacity onPress={toSignUp}>
          <Text style={{ color: "#0466c8" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
