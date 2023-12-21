import React, { createContext, useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import Geolocation from "@react-native-community/geolocation";
import CompassHeading from "react-native-compass-heading";
import axios from "react-native-axios";
import { GEO_API_KEY } from "@env";

export const LocationContext = createContext(null);

export const LocationContextProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [heading, setHeading] = useState(null);
  const [address, setAdress] = useState(null);
  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
      setHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);
  useEffect(() => {
    // Use watchPosition to continuously track the user's location
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10 }
    );

    // Clean up the watchPosition when the component unmounts
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const reverseGeoCode = async (latitude, longitude) => {
    const apiKey = GEO_API_KEY;

    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=${apiKey}&at=${latitude},${longitude}&lang=en-US`;

    try {
      const res = await axios.get(url);
      const fullAdress = res.data.items[0].address.label;
      const formattedAddress = fullAdress.split("-")[0];
      setAdress(formattedAddress);
    } catch (error) {
      console.log("reverse geo", error);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        heading,
        address,
        reverseGeoCode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
