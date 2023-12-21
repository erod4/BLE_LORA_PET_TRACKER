import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { faLock, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../Register/FormInput";
import FormButton from "../Register/FormButton";
import { authContext } from "./UserContextProvider";

const LoginForm = () => {
  const { loginUserAction } = useContext(authContext);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const navigation = useNavigation();

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
  const handleSubmit = async () => {
    if (formData.phone === "" || formData.password === "") {
      // Show an error message or prevent form submission
      alert("Please fill in all required fields.");
    } else {
      // Perform form submission
      const submit = await loginUserAction(formData);
      if (submit) {
        navigation.navigate("home");
        setFormData({
          phone: "",
          password: "",
        });
      }
    }
  };
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
        icon={faPhone}
        label={"Phone"}
        value={formData.phone}
        keyboardType={"phone-pad"}
        placeholder={"Phone"}
        onChangeText={(text) => {
          handleInputChange("phone", text);
        }}
      />
      <FormInput
        icon={faLock}
        value={formData.password}
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
      <View style={styles.text}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("reset");
          }}
        >
          <Text style={{ color: "#0466c8" }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
