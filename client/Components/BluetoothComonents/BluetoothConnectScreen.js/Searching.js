import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBluetoothB } from "@fortawesome/free-brands-svg-icons";
import { BLEContext } from "../BLEContextProvider";

const Searching = () => {
  const { scanDevices, isSearching, scannedDevices } = useContext(BLEContext);

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
      {scannedDevices?.length > 0 ? (
        <></>
      ) : (
        <TouchableOpacity
          disabled={isSearching && true}
          onPress={() => {
            scanDevices();
          }}
          style={{
            backgroundColor: "#0466c8",
            paddingHorizontal: 105,
            paddingVertical: 15,
            borderRadius: 30,
            marginBottom: 40,
          }}
        >
          <Text style={{ fontWeight: "700", color: "#fff", fontSize: 20 }}>
            {isSearching ? "Scanning.." : "Begin Scannning"}
          </Text>
        </TouchableOpacity>
      )}
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
