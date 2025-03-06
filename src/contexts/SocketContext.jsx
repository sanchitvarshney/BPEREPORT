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
    console.log("clicked",payload);
    socketService.emit("deviceInWarehouse", payload);
  };
  const emitDeviceOnLocation = (payload) => {
    console.log("clicked",payload);
    socketService.emit("deviceOnLocation", payload);
  };

  const emitDownloadR2Report = (payload) => {
    console.log("clicked");
    socketService.emit("r2_download", payload);
  };

  const emitDownloadR10Report = (payload) => {
    console.log("clicked");
    socketService.emit("r10Download", payload);
  };
  const emitDownloadr5Report = (payload) => {
    console.log(payload)
    socketService.emit("r5DeviceSerial", payload);
  };
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

  return <SocketContext.Provider value={{ emitDeviceInWareHouseDownload, onDownloadReport, isConnected, refreshConnection, isLoading, off, onnotification,emitGetNotification,emitDeviceOnLocation,emitDownloadR2Report,emitDownloadR10Report,emitDownloadr5Report }}>{children}</SocketContext.Provider>;
};
