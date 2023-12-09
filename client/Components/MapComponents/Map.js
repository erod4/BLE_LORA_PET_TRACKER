import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import PetMarker from "../MarkerComponent/PetMarker";
import PetCallout from "../MarkerComponent/PetCallout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ReCenter from "./ReCenter";

const Map = () => {
  const initialRegion = {
    latitude: 32.7633224,
    longitude: -117.1228235,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const mapRef = useRef(null);

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };
  return (
    <>
      <MapView
        ref={mapRef}
        userInterfaceStyle={"dark"}
        style={styles.map}
        region={initialRegion}
      >
        <Marker coordinate={{ latitude: 32.7633224, longitude: -117.1228235 }}>
          <PetMarker />
          <Callout tooltip style={{}}>
            <PetCallout name={"Luna"} />
          </Callout>
        </Marker>
        <View></View>
      </MapView>
      <ReCenter handleRecenter={handleRecenter} />
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Map;
