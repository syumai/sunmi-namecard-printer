import { useEffect, useState } from "react";
import { DeviceEventEmitter, EmitterSubscription } from "react-native";

export type PrinterStatus =
  | "OUT_OF_PAPER"
  | "ERROR"
  | "NORMAL"
  | "COVER_OPEN"
  | "COVER_ERROR"
  | "KNIFE_ERROR_1"
  | "KNIFE_ERROR_2"
  | "OVER_HEATING"
  | "FIRMWARE_UPDATING";

export const getMessageByPrinterStatus = (status: PrinterStatus): string => {
  switch (status) {
    case "NORMAL":
      return "printer normal";
    case "OUT_OF_PAPER":
      return "printer out out page";
    case "COVER_OPEN":
      return "printer cover open";
  }
  return "";
};

export const usePrinterStatus = (): PrinterStatus | undefined => {
  const [status, setStatus] = useState<PrinterStatus | undefined>(undefined);

  useEffect(() => {
    let listener: EmitterSubscription;

    try {
      listener = DeviceEventEmitter.addListener(
        "PrinterStatus",
        (action: string) => {
          const printerStatus: PrinterStatus = action
            .split(".")?.[1]
            ?.replace("_ACTION", "") as any;
          // console.log({ action, printerStatus });
          setStatus(printerStatus);
        }
      );
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [setStatus]);

  return status;
};
