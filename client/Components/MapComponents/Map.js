import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import PetMarker from "../MarkerComponent/PetMarker";
import PetCallout from "../MarkerComponent/PetCallout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ReCenter from "./ReCenter";
import { BLEContext } from "../BluetoothComonents/BLEContextProvider";
import Geolocation from "@react-native-community/geolocation";
import TrainerMarker from "../MarkerComponent/TrainerMarker";
import TrainerCallout from "../MarkerComponent/TrainerCallout";

const Map = () => {
  const { lat, long } = useContext(BLEContext);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Use watchPosition to continuously track the user's location
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // Clean up the watchPosition when the component unmounts
    return () => Geolocation.clearWatch(watchId);
  }, []);
  useEffect(() => {
    console.log(long);
  }, [long]);
  const initialRegion = {
    latitude: lat != 0 ? lat : userLocation.latitude,
    longitude: long != 0 ? long : userLocation.longitude,
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
        showsUserLocation={false}
      >
        <Marker coordinate={{ latitude: lat, longitude: long }}>
          <PetMarker />
          <Callout tooltip style={{}}>
            <PetCallout name={"Luna"} />
          </Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        >
          <TrainerMarker />
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
