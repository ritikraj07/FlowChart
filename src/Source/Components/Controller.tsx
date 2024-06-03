import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Controller() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Synchronize tab value with the current route
  React.useEffect(() => {
    if (location.pathname === "/node-panel") {
      setValue(0);
    } else if (location.pathname === "/edge-panel") {
      setValue(1);
    } else if (location.pathname === "/setting-panel") {
      setValue(2);
    } else if (location.pathname.startsWith("/node-editor")) {
      setValue(3);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/node-panel");
    } else if (newValue === 1) {
      navigate("/edge-panel");
    } else if (newValue === 2) {
      navigate("/setting-panel");
    } else if (newValue === 3) {
      navigate("/node-editor");
    }
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      sx={{ flexGrow: 1 }}
    >
      <Tab label="Node Panel" />
      <Tab label="Edge Panel" />
      <Tab label="Setting Panel" />
      <Tab label="Node Editor" />
    </Tabs>
  );
}
