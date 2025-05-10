import { socketService } from "../services/socket/SocketService";
import React, { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

// SocketProvider component that provides socket context globally
export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleConnectionState = () => {
      setIsConnected(socketService.isConnected());
      setIsLoading(socketService.isLoading);
    };

    // Initialize socket connection
    socketService.connect();
    handleConnectionState();

    // Interval to monitor connection status
    const interval = setInterval(handleConnectionState, 100);

    // Cleanup interval (but don't disconnect socket)
    return () => clearInterval(interval);
  }, []);

  const refreshConnection = () => {
    socketService.refreshConnection();
    setIsLoading(true); // Start loading while refreshing
  };

  const emitDeviceInWareHouseDownload = (payload) => {
    console.log("clicked");
    socketService.emit("deviceInWarehouse", payload);
  };

  const emitFGDispatch = (payload) => {
    console.log("clicked");
    socketService.emit("fgDeviceReport", payload);
  };
  const emitDeviceOnLocation = (payload) => {
    console.log("clicked");
    socketService.emit("deviceOnLocation", payload);
  };

  const emitBERDeviceReport = (payload) => {
    console.log("clicked");
    socketService.emit("berDeviceReport", payload);
  };

  const emitDownloadr5Report = (payload) => {
    console.log(payload)
    socketService.emit("r5DeviceSerial", payload);
  };
  const emitDownloadWrongDeviceReport = (payload) => {
    console.log(payload)
    socketService.emit("rWrongDevice", payload);
  };

  const emitSwipeFunctionalReport = (payload) => {
    console.log(payload)
    socketService.emit("swipeFunctionalReport", payload);
  }

  const swipeMachineInward = (payload) => {
    console.log(payload)
    socketService.emit("swipeMachineInward", payload);
  }

  const emitGetNotification = () => {
    socketService.emit("getNotification","");
  };
  const onDownloadReport = (callback) => {
    socketService.on("progress", callback);
  };
  const onnotification = (callback) => {
    socketService.on("socket_receive_notification", callback);
  };
  
  const off = (event) => {
    socketService.off(event);
  };

  return <SocketContext.Provider value={{emitSwipeFunctionalReport, swipeMachineInward, emitDeviceInWareHouseDownload,emitDownloadWrongDeviceReport,emitDownloadr5Report, onDownloadReport, isConnected, refreshConnection, isLoading, off, onnotification,emitGetNotification,emitDeviceOnLocation,emitBERDeviceReport,emitFGDispatch }}>{children}</SocketContext.Provider>;
};
