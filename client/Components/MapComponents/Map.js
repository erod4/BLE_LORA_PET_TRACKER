import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import PetMarker from "../MarkerComponent/PetMarker";
import PetCallout from "../MarkerComponent/PetCallout";
import ReCenter from "./ReCenter";
import { BLEContext } from "../BluetoothComonents/BLEContextProvider";
import TrainerMarker from "../MarkerComponent/TrainerMarker";
import TrainerCallout from "../MarkerComponent/TrainerCallout";
import { LocationContext } from "../Location/LocationProvider";
import UserLoc from "../MarkerComponent/UserLoc";
const Map = () => {
  const { lat, long } = useContext(BLEContext);
  const { userLocation, heading, reverseGeoCode } = useContext(LocationContext);

  useEffect(() => {
    if (lat != 0 && long != 0) {
      reverseGeoCode(lat, long);
    }
  }, [lat, long]);
  const initialRegion = {
    latitude: userLocation?.latitude,
    longitude: userLocation?.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const mapRef = useRef(null);

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };
  return (
    <>
      <UserLoc userLocation={userLocation} />
      <MapView
        ref={mapRef}
        userInterfaceStyle={"dark"}
        style={styles.map}
        region={initialRegion}
        showsUserLocation={false}
        showsCompass={true}
        showsIndoors={true}
      >
        <Marker coordinate={{ latitude: lat, longitude: long }}>
          <PetMarker />
          <Callout tooltip style={{}}>
            <PetCallout name={"Luna"} />
          </Callout>
        </Marker>
        <Marker
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
          }}
        >
          <TrainerMarker rotation={heading} />
          <Callout tooltip style={{}}>
            <TrainerCallout name={"Enrique"} />
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
