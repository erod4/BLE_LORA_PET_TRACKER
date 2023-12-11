import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import PanelHeader from "./Connected/ConnectedPanel";
import ConnectedPanel from "./Connected/ConnectedPanel";
import { BLEContext } from "../BluetoothComonents/BLEContextProvider";
import DisconnectedPanel from "./Disconnected/DisconnectedPanel";
const BottomPanel = () => {
  const [isContentsShown, setIsContentsShown] = useState(false);
  const { connectionStatus } = useContext(BLEContext);
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["10%", "45%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index == 0) {
      setIsContentsShown(false);
    } else {
      setIsContentsShown(true);
    }
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={styles.contentContainer}
      backgroundStyle={{
        backgroundColor: "rgba(25, 25, 25, 0.975)",
      }}
      handleIndicatorStyle={{ backgroundColor: "#777" }}
    >
      {connectionStatus === "Connected" ? (
        <ConnectedPanel name={"Luna"} isContentsShown={isContentsShown} />
      ) : (
        <DisconnectedPanel />
      )}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 15,
  },
});

export default BottomPanel;
