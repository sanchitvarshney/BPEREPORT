import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";

const ConsumptionLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define tab routes
  const tabRoutes = ["/assembly-consumption", "/assembly-component-summary"];

  // Determine the active tab based on the current route
  const currentTabIndex = tabRoutes.indexOf(location.pathname);

  const handleChange = (_, newValue) => {
    // Navigate to the corresponding route when tab changes
    navigate(tabRoutes[newValue]);
  };

  return (
    <div className="h-screen">
      {/* Tab Navigation Header */}
      <div className="w-full h-[50px] border-b border-neutral-300 bg-white">
        <Tabs
          sx={{
            padding: 0,
            width: "max-content",
          }}
          TabIndicatorProps={{
            style: {
              height: "3px", // Increase thickness of the indicator
            },
          }}
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          onChange={handleChange}
          centered
          aria-label="Device Sections"
        >
          {/* Device In Warehouse Tab */}
          <Tab
            sx={{ fontWeight: "500" }}
            label={
              <div className="flex items-center justify-center gap-[8px]">
                <span>Assembly Consumption</span>
              </div>
            }
            aria-label="Device In Warehouse"
          />

          {/* Wrong Device Detail Tab */}
          <Tab
            sx={{ fontWeight: "500" }}
            label={
              <div className="flex items-center justify-center gap-[8px]">
                {/* <SettingsIcon fontSize="small" /> */}
                <span>Consumption Summary</span>
              </div>
            }
            aria-label="Wrong Device Detail"
          />
        </Tabs>
      </div>

      {/* Content Box */}
      {/* <Box sx={{ height: "calc(80vh - 120px)" }}> */}
      <Box sx={{
        height: "calc(100vh - 160px)", // Subtracting tab header height
        overflowY: 'auto', // Enable scrolling if content exceeds the space
        padding: 0,
      }}>
        {children}
      </Box>
    </div>
  );
};

export default ConsumptionLayout;
