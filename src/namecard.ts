import { SunmiV2Printer } from "react-native-sunmi-v2-printer";
import { base64TwitterLogo } from "../assets/logo";
import { profile } from "./profile";

export const printNamecard = async () => {
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
