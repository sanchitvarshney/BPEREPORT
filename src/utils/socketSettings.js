const SOCKET_URL_KEY = "bpereport_custom_socket_url";

export const getSocketUrl = () => {
  const custom = localStorage.getItem(SOCKET_URL_KEY);
  if (custom && custom.trim() !== "") {
    return custom.trim().replace(/\/$/, "");
  }
  return import.meta.env.VITE_SOCKET_URL || "";
};

export const setSocketUrl = (url) => {
  const value = url.trim();
  if (value === "") {
    localStorage.removeItem(SOCKET_URL_KEY);
  } else {
    localStorage.setItem(SOCKET_URL_KEY, value.replace(/\/$/, ""));
  }
};

export const getStoredSocketUrl = () => {
  return localStorage.getItem(SOCKET_URL_KEY) || "";
};

export const resolveDownloadUrl = (fileUrl) => {
  const baseUrl = getSocketUrl().replace(/:\d+$/, "");
  try {
    const resolved = new URL(fileUrl, baseUrl);
    if (resolved.port) {
      resolved.port = "";
    }
    return resolved.href;
  } catch {
    return fileUrl;
  }
};
