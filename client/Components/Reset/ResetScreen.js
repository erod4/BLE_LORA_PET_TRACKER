import { View, Text } from "react-native";
import React from "react";
import FormInput from "../Register/FormInput";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import FormButton from "../Register/FormButton";
import { useNavigation } from "@react-navigation/native";

const ResetScreen = () => {
  const nav = useNavigation();
  const handleSubmit = () => {
    nav.navigate("verify");
  };
  return (
    <View
      style={{
        backgroundColor: "rgba(25, 25, 25, 1)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: "90%", gap: 20 }}>
        <FormInput
          icon={faPhone}
          label={"Phone"}
          placeholder={"Enter Phone Number"}
          keyboardType={"phone-pad"}
        />
        <FormButton title={"Send Reset Code"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ResetScreen;
