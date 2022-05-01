import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// @ts-ignore
import { SunmiV2Printer } from "react-native-sunmi-v2-printer";
import {
  getMessageByPrinterStatus,
  usePrinterStatus,
} from "./usePrinterStatus";
import { profile } from "./profile";
import { base64TwitterLogo } from "../assets/logo";

/* Init the printer. Without this no events will be fired. */
SunmiV2Printer.printerInit();

const printReceipt = async () => {
  try {
    // set aligment: 0-left,1-center,2-right
    await SunmiV2Printer.setAlignment(1);

    // Image bitmap object (maximum width is 384 pixels, more than it can't be printed and throw exception)
    await SunmiV2Printer.printBitmap(
      profile.avatar,
      384 /* width */,
      384 /* height */
    );

    await SunmiV2Printer.setFontSize(50);
    await SunmiV2Printer.printOriginalText(`${profile.name}\n`);
    await SunmiV2Printer.setFontSize(24);
    await SunmiV2Printer.setAlignment(0);
    await SunmiV2Printer.printOriginalText("===============================\n");
    await SunmiV2Printer.setAlignment(1);
    await SunmiV2Printer.printOriginalText(`${profile.description}\n`);
    await SunmiV2Printer.setAlignment(0);
    await SunmiV2Printer.printOriginalText("===============================\n");
    await SunmiV2Printer.printOriginalText(`GitHub: @${profile.github}\n`);
    await SunmiV2Printer.printOriginalText(`Twitter: @${profile.twitter}\n`);
    await SunmiV2Printer.printOriginalText(
      `Website: https://${profile.website}\n`
    );
    await SunmiV2Printer.printOriginalText("===============================\n");
    await SunmiV2Printer.setAlignment(1);
    await SunmiV2Printer.setFontSize(22);
    await SunmiV2Printer.printOriginalText("Follow me on Twitter! ");
    await SunmiV2Printer.printBitmap(
      base64TwitterLogo,
      22 /* width */,
      22 /* height */
    );
    await SunmiV2Printer.setFontSize(16);
    await SunmiV2Printer.printOriginalText("\n\n");
    await SunmiV2Printer.printQRCode(
      `https://twitter.com/${profile.twitter}`,
      8 /* modulesize: which should be within 4-16 */,
      1 /* errorlevel: error correction level (0-3) */
    );
    await SunmiV2Printer.setFontSize(22);
    await SunmiV2Printer.printOriginalText("\n\n\n\n");
  } catch (e) {
    console.error(e);
  }
};

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
      <TouchableOpacity style={styles.button} onPress={printReceipt}>
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
