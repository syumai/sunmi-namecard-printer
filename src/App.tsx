import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// @ts-ignore
import { SunmiV2Printer } from "react-native-sunmi-v2-printer";
import {
  getMessageByPrinterStatus,
  usePrinterStatus,
} from "./usePrinterStatus";
import { profile } from "./profile";
import { printNamecard } from "./namecard";

/* Init the printer. Without this no events will be fired. */
SunmiV2Printer.printerInit();

const App = () => {
  const printerStatus = usePrinterStatus();

  const printerStatusMsg = printerStatus
    ? `Printer status: ${getMessageByPrinterStatus(printerStatus)}`
    : "Printer status is not available";

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: `data:image/png;base64,${profile.avatar}`,
        }}
      />
      <Text>{printerStatusMsg}</Text>
      <TouchableOpacity style={styles.button} onPress={printNamecard}>
        <Text style={styles.buttonText}>Print name card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 192,
    height: 192,
    resizeMode: "contain",
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "steelblue",
  },
  buttonText: {
    color: "white",
  },
});

export default App;
