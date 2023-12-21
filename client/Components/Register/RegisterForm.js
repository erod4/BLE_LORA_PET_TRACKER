import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import FormInput from "./FormInput";
import { useNavigation } from "@react-navigation/native";
import FormButton from "./FormButton";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../Login/UserContextProvider";

const RegisterForm = () => {
  const { registerUserAction } = useContext(authContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigation();
  const toLogin = () => {
    navigation.navigate("login");
  };
  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumberString;
  };
  const handleInputChange = (field, value) => {
    if (field === "phone") {
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [field]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      // Show an error message or prevent form submission
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.password != formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.phone.length < 10) {
      alert("Invalid Phone Number");
      return;
    }
    // Perform form submission
    const submit = registerUserAction(formData);
    if (submit) {
      navigation.navigate("home");
    }
  };
  return (
    <View style={styles.container}>
      <FormInput
        label={"Full Name"}
        icon={faUser}
        placeholder={"Full Name"}
        onChangeText={(text) => {
          handleInputChange("name", text);
        }}
      />
      <FormInput
        label={"Phone"}
        icon={faPhone}
        value={formData.phone}
        keyboardType={"phone-pad"}
        placeholder={"Phone"}
        onChangeText={(text) => {
          handleInputChange("phone", text);
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
