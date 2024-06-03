import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";

export default function Navbar() {
  // State to hold the file name
  const [fileName, setFileName] = useState<string>("File name");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Handler to update the file name
  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  // Handler to switch to editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handler to switch back from editing mode
  const handleBlur = () => {
    setIsEditing(false);
  };

  // Handler to handle keypress (Enter key)
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  // Handler to toggle drawer
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // List items for the drawer
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["draw history", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flowchart
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Center vertically
            }}
          >
            {isEditing ? (
              <InputBase
                value={fileName}
                onChange={handleFileNameChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                autoFocus
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  border: "1px solid grey",
                  width: "200px",
                  textAlign: "center", // Center text inside input
                }}
              />
            ) : (
              <Typography
                variant="h6"
                component="div"
                onClick={handleEditClick}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#1976D2",
                  borderRadius: "4px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  border: "none",
                  width: "200px",
                  textAlign: "center", // Center text inside div
                }}
              >
                {fileName}
              </Typography>
            )}
          </Box>
          <Button color="inherit">Save</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
