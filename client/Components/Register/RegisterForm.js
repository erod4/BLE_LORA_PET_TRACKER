import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import { useNavigation } from "@react-navigation/native";
import FormButton from "./FormButton";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigation();
  const toLogin = () => {
    navigation.navigate("login");
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      // Show an error message or prevent form submission
      alert("Please fill in all required fields.");
    } else if (formData.password != formData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      // Perform form submission
      // ...
    }
  };
  return (
    <View style={styles.container}>
      <FormInput
        label={"Full Name"}
        icon={faUser}
        placeholder={"Full Name"}
        onChangeText={(text) => {
          handleInputChange("fullName", text);
        }}
      />
      <FormInput
        label={"Email"}
        icon={faEnvelope}
        placeholder={"Email"}
        onChangeText={(text) => {
          handleInputChange("email", text);
        }}
      />
      <FormInput
        label={"Password"}
        icon={faLock}
        secureTextEntry={true}
        placeholder={"Password"}
        onChangeText={(text) => {
          handleInputChange("password", text);
        }}
      />
      <FormInput
        secureTextEntry={true}
        label={"Confirm Password"}
        icon={faLock}
        placeholder={"Confirm Password"}
        onChangeText={(text) => {
          handleInputChange("confirmPassword", text);
        }}
      />
      <FormButton link={"nav"} title={"Sign Up"} onPress={handleSubmit} />
      <View style={styles.text}>
        <Text style={{ color: "#aaa" }}>Already have am account? </Text>
        <TouchableOpacity onPress={toLogin}>
          <Text style={{ color: "#0466c8" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
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
export default RegisterForm;
