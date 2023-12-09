import { View, Text, Linking } from "react-native";
import React, { createContext, useContext, useReducer } from "react";
import { BLEContext } from "../../BluetoothComonents/BLEContextProvider";

export const SettingContext = createContext();

const INITIAL_STATE = {
  isLightOn: false,
  playingSound: false,
  directionsTo: null,
};
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TOGGLE_LIGHT":
      return {
        ...state,
        isLightOn: payload,
      };
    case "PLAY_SOUND":
      return {
        ...state,
        playingSound: payload,
      };
    case "SET_DIRECTIONS":
      return {
        ...state,
        directionsTo: payload,
      };

    default:
      return state;
  }
};
export const SettingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { sendData } = useContext(BLEContext);
  const toggleLight = () => {
    dispatch({
      type: "TOGGLE_LIGHT",
      payload: !state?.isLightOn,
    });
  };
  const playSound = () => {
    dispatch({
      type: "PLAY_SOUND",
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: "PLAY_SOUND",
        payload: false,
      });
    }, 5000);
  };
  const setDirections = (lat, long, petName) => {
    dispatch({ type: "SET_DIRECTIONS", payload: { lat, long, petName } });
  };
  const navigateTo = () => {
    const { lat, long, petName } = state?.directionsTo;
    const mapUrl = `maps://maps.apple.com/?q=${lat},${long}&label=${petName}`;
    Linking.openURL(mapUrl);
  };

  return (
    <SettingContext.Provider
      value={{
        toggleLight,
        playSound,
        navigateTo,
        setDirections,
        isLightOn: state?.isLightOn,
        playingSound: state?.playingSound,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};
