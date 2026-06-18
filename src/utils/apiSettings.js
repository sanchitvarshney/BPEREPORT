const API_BASE_URL_KEY = "bpereport_custom_api_base_url";

export const getApiBaseUrl = () => {
  const custom = localStorage.getItem(API_BASE_URL_KEY);
  if (custom && custom.trim() !== "") {
    return custom.trim().replace(/\/$/, "");
  }
  return import.meta.env.VITE_REACT_APP_API_BASE_URL || "";
};

export const setApiBaseUrl = (url) => {
  const value = url.trim();
  if (value === "") {
    localStorage.removeItem(API_BASE_URL_KEY);
  } else {
    localStorage.setItem(API_BASE_URL_KEY, value.replace(/\/$/, ""));
  }
};

export const getStoredApiBaseUrl = () => {
  return localStorage.getItem(API_BASE_URL_KEY) || "";
};
