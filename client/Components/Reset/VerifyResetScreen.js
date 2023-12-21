import { View, Text } from "react-native";
import React from "react";
import FormInput from "../Register/FormInput";
import FormButton from "../Register/FormButton";
import { faHashtag, faPhone } from "@fortawesome/free-solid-svg-icons";

const VerifyResetScreen = () => {
  const handleSubmit = () => {};

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
          icon={faHashtag}
          label={"Reset Code"}
          placeholder={"Enter Reset Code"}
          keyboardType={"phone-pad"}
        />
        <FormButton title={"Verify Reset Code"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default VerifyResetScreen;
