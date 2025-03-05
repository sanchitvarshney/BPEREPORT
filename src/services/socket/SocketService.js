import { getToken } from "../../utils/tokenUtills";
import { io, Socket } from "socket.io-client";


class SocketService {
  socket= null;
  isLoading = false;
  constructor(url) {}

  connect() {
    if (this.socket?.connected) return;
    this.isLoading = true; 
    this.socket = io(this.url, {
      transports: ["websocket"],
      auth: { authorization: getToken() },
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id)
      this.isLoading = false;
    });
    this.socket.on("disconnect", () => {
      console.log("Socket disconnected")
      this.isLoading = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.isLoading = false; 
    });
  
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  on(event, callback) {
    this.socket?.on(event, callback);
  }

  off(event) {
    this.socket?.off(event);
  }

  emit(event, data) {
    this.socket?.emit(event, data);
  }

  isConnected() {
    return this.socket?.connected ?? false;
  }
  refreshConnection() {
    console.log("Refreshing socket connection...");
    this.disconnect();
    this.connect();
  }
}

export const socketService = new SocketService(import.meta.env.VITE_SOCKET_URL);
