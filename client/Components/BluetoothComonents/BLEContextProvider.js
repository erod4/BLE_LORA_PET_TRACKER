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
  const [availableDevices, setAvailableDevices] = useState([]);
  const [deviceID, setDeviceID] = useState(null);
  const [stepDataChar, setStepDataChar] = useState(null); // Not Used
  const [connectionStatus, setConnectionStatus] = useState("Searching...");
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  const GPS_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
  const LIGHT_BUZZER_UUID = "2d8957fe-e927-49e0-9c9a-c4d2dde04df1";

  const deviceRef = useRef(null);
  const checkDeviceConnection = useCallback(() => {
    if (deviceRef.current) {
      deviceRef.current
        .isConnected()
        .then((isConnected) => {
          if (isConnected) {
            setConnectionStatus("Connected");
          } else {
            setConnectionStatus("Disconnected");
          }
        })
        .catch((error) => {
          console.error("Error checking device connection:", error);
          setConnectionStatus("Error in Checking Connection");
        });
    }
  }, []);
  const scanDevices = useCallback(() => {
    let devices = [];
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setConnectionStatus("Error searching for devices");
        return;
      }
      if (device && device.name == "MyESP32") {
        bleManager.stopDeviceScan();
        devices.push(device);
        setAvailableDevices(devices);
      }
    });
  }, []);

  useEffect(() => {
    checkDeviceConnection(); // Check connection on component mount
  }, []);
  const selectAndConnectToDevice = useCallback(
    (selectedDevice) => {
      setConnectionStatus("Connecting...");
      connectToDevice(selectedDevice);
    },
    [connectToDevice]
  );
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
          (char) => char.uuid === GPS_CHAR_UUID
        );
        setStepDataChar(stepDataCharacteristic);
        stepDataCharacteristic.monitor((error, char) => {
          if (error) {
            console.error("err", error);
            return;
          }
          const rawStepData = atob(char.value);
          console.log("data: ", rawStepData);
          // console.log("Incoming: ", rawStepData);

          const latitude = rawStepData?.split(" ")[0]?.split(",")[2];
          const longitude = rawStepData?.split(" ")[1]?.split(",")[0];
          if (latitude != lat && longitude != long) {
            // console.log(latitude);
            setLat(latitude);
            setLong(longitude);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setConnectionStatus("Error in Connection");
      });
  };
  const writeToCharacteristic = useCallback(async (data) => {
    if (!deviceRef.current) {
      console.error("No device connected");
      return;
    }

    const service = await deviceRef.current
      .discoverAllServicesAndCharacteristics()
      .then((device) => device.services())
      .then((services) =>
        services.find((service) => service.uuid === SERVICE_UUID)
      );

    if (!service) {
      console.error("Service not found");
      return;
    }

    const characteristic = await service
      .characteristics()
      .then((chars) => chars.find((char) => char.uuid === LIGHT_BUZZER_UUID));

    if (!characteristic) {
      console.error("Characteristic not found");
      return;
    }

    const encodedData = btoa(data);
    await characteristic.writeWithResponse(encodedData);
  }, []);
  const disconnectDevice = useCallback(() => {
    if (deviceRef.current) {
      deviceRef.current
        .cancelConnection()
        .then(() => {
          setConnectionStatus("Disconnected");
          console.log("Disconnected successfully");
        })
        .catch((error) => {
          console.error("Error disconnecting:", error);
        });
    }
  }, []);
  // useEffect(() => {
  //   const subscription = bleManager.onDeviceDisconnected(
  //     deviceID,
  //     (error, device) => {
  //       if (error) {
  //         console.log("Disconnected with error:", error);
  //       }
  //       setConnectionStatus("Disconnected");
  //       console.log("Disconnected device");
  //       if (deviceRef.current) {
  //         setConnectionStatus("Reconnecting...");
  //         connectToDevice(deviceRef.current)
  //           .then(() => setConnectionStatus("Connected"))
  //           .catch((error) => {
  //             console.log("Reconnection failed: ", error);
  //             setConnectionStatus("Reconnection failed");
  //           });
  //       }
  //     }
  //   );
  //   return () => subscription.remove();
  // }, [deviceID]);
  return (
    <BLEContext.Provider
      value={{
        connectionStatus,
        long,
        lat,
        writeToCharacteristic,
        scanDevices,
        selectAndConnectToDevice,
        disconnectDevice,
        availableDevices,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
};
