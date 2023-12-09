import { View, Text } from "react-native";
import React from "react";
import { AppleButton } from "@invertase/react-native-apple-authentication";

const AppleLogin = () => {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() =>
        onAppleButtonPress().then(() => console.log("Apple sign-in complete!"))
      }
    />
  );
};

export default AppleLogin;
