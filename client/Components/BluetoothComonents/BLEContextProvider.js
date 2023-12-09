import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { BleManager, Device, Subscription } from "react-native-ble-plx";
import { err } from "react-native-svg";
import base64 from "react-native-base64";
export const BLEContext = createContext(null);

const BLTManager = new BleManager();

export const BLEContextProvider = ({ children }) => {
  const [scannedDevices, setScannedDevices] = useState(null);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState("Nothing Yet");
  const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
  const MESSAGE_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";

  async function scanDevices() {
    setIsSearching(true);
    console.log("scanning");
    BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      if (scannedDevice && scannedDevice.name == "DSD TECH") {
        setScannedDevices(scannedDevice);
        setIsSearching(false);

        BLTManager.stopDeviceScan();
        // connectDevice(scannedDevice);
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      BLTManager.stopDeviceScan();
    }, 5000);
  }
  async function connectDevice(device) {
    console.log("connecting to Device:", device.name);

    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
        });

        //Read inital values
        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setMessage(base64.decode(valenc?.value));
          });

        //BoxValue

        //monitor values and tell what to do when receiving an update
        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic?.value)
              );
            }
          },
          "messagetransaction"
        );

        console.log("Connection established");
      });
  }
  async function sendData(data) {
    BLTManager.writeCharacteristicWithoutResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      MESSAGE_UUID,
      base64.encode(data)
    );
  }
  return (
    <BLEContext.Provider
      value={{
        scanDevices,
        connectDevice,
        isConnected,
        isSearching,
        scannedDevices,
        sendData,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
};
