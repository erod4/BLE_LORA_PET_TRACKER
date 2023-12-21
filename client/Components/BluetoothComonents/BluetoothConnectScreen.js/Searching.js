import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBluetoothB } from "@fortawesome/free-brands-svg-icons";
import { BLEContext } from "../BLEContextProvider";

const Searching = () => {
  const { connectionStatus, scanDevices } = useContext(BLEContext);

  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current && animationRef.current.play();
    // Or set a specific startFrame and endFrame with:
    animationRef.current && animationRef.current.play(30, 120);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(45, 45, 45, 0.975)",
        paddingTop: 120,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#0466c8",
          paddingHorizontal: 80,
          paddingVertical: 15,
          borderRadius: 10,
          marginBottom: 40,
        }}
        onPress={scanDevices}
      >
        <Text style={{ fontWeight: "700", color: "#fff", fontSize: 15 }}>
          Search
        </Text>
      </TouchableOpacity>
      <LottieView
        style={{
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          width: 400,
        }}
        ref={animationRef}
        source={require("../../../assets/pulse.json")}
      >
        <FontAwesomeIcon icon={faBluetoothB} size={50} color="#fff" />
      </LottieView>
    </View>
  );
};

export default Searching;
