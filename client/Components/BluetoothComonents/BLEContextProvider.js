import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { BleManager, Device, Subscription } from "react-native-ble-plx";
export const BLEContext = createContext(null);
import { btoa, atob } from "react-native-quick-base64";

const bleManager = new BleManager();

export const BLEContextProvider = ({ children }) => {
  const [deviceID, setDeviceID] = useState(null);
  const [stepCount, setStepCount] = useState(0);
  const [stepDataChar, setStepDataChar] = useState(null); // Not Used
  const [connectionStatus, setConnectionStatus] = useState("Searching...");
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
  const STEP_DATA_CHAR_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";
  const [firstLine, setFirstLine] = useState(true);
  let scnd = false;
  let firstPartOfLong = "";
  let secondLine = "";
  const progress = (stepCount / 1000) * 100;

  const deviceRef = useRef(null);

  const searchAndConnectToDevice = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setConnectionStatus("Error searching for devices");
        return;
      }
      if (device.name === "DSD TECH") {
        bleManager.stopDeviceScan();
        setConnectionStatus("Connecting...");
        connectToDevice(device);
      }
    });
  };

  useEffect(() => {
    searchAndConnectToDevice();
  }, []);

  const connectToDevice = (device) => {
    return device
      .connect()
      .then((device) => {
        setDeviceID(device.id);
        setConnectionStatus("Connected");
        deviceRef.current = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        let service = services.find((service) => service.uuid === SERVICE_UUID);
        return service.characteristics();
      })
      .then((characteristics) => {
        let stepDataCharacteristic = characteristics.find(
          (char) => char.uuid === STEP_DATA_CHAR_UUID
        );
        setStepDataChar(stepDataCharacteristic);
        stepDataCharacteristic.monitor((error, char) => {
          if (error) {
            console.error(error);
            return;
          }
          const rawStepData = atob(char.value);

          // console.log("Incoming: ", rawStepData);

          if (scnd && firstPartOfLong + rawStepData.split(",")[0] != long) {
            // console.log("long: ", firstPartOfLong + rawStepData.split(",")[0]);
            // console.log("long", firstPartOfLong + rawStepData);
            setFirstLine(true);
            setLong(firstPartOfLong + rawStepData.split(",")[0]);
            scnd = false;
            firstPartOfLong = "";
          }
          if (rawStepData.length >= 20) {
            if (firstLine) {
              const latitude = rawStepData.split(" ")[0].split(",")[1];
              firstPartOfLong = rawStepData.split(" ")[1];
              // console.log("first part of second: ", firstPartOfLong);
              if (latitude != lat) {
                setLat(latitude);
              }
              setFirstLine(false);
              scnd = true;
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setConnectionStatus("Error in Connection");
      });
  };

  useEffect(() => {
    const subscription = bleManager.onDeviceDisconnected(
      deviceID,
      (error, device) => {
        if (error) {
          console.log("Disconnected with error:", error);
        }
        setConnectionStatus("Disconnected");
        console.log("Disconnected device");
        setStepCount(0); // Reset the step count
        if (deviceRef.current) {
          setConnectionStatus("Reconnecting...");
          connectToDevice(deviceRef.current)
            .then(() => setConnectionStatus("Connected"))
            .catch((error) => {
              console.log("Reconnection failed: ", error);
              setConnectionStatus("Reconnection failed");
            });
        }
      }
    );
    return () => subscription.remove();
  }, [deviceID]);
  return (
    <BLEContext.Provider
      value={{
        connectionStatus,
        long,
        lat,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
};
