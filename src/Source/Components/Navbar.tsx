import React, { useContext, useState } from "react";
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
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { ReactFlowContextApi } from "../ContextApi/Index";
import { CheckCircleOutline } from "@mui/icons-material";

export default function Navbar() {
  const [Visible, setVisible] = useState(false)
  const [save, setSave] = useState(false);
  const [message, setMessage] = useState<string>("Please connect all nodes")
  let context = useContext(ReactFlowContextApi);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { fileName, SetFileName, nodes, edges, SaveChart } = context;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Handler to update the file name
  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetFileName(event.target.value);
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
        {["draw history", "Starred", "Send email", "Drafts"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  // Handler for the Save button click
let isConnected: { [key: string]: boolean } = {};

const isAllConnected = ():boolean => {
  

  if (nodes.length === 0) {
    setMessage("Nothing to save")
    return false;
  }

  if (nodes.length === 1) {
    return true;
  }
  // Initialize isConnected for each node
  for (let i = 0; i < nodes.length; i++) {
    isConnected[nodes[i].id] = false;
  }

  // Mark connected nodes as true
  for (let i = 0; i < edges.length; i++) {
    const source = edges[i].source;
    const target = edges[i].target;

    isConnected[source] = true;
    isConnected[target] = true;
  }

  

  // Check if any node is not connected
  for (const nodeId in isConnected) {
    if (!isConnected[nodeId]) {
      // If any node is not connected, return false
      console.log(`Node ${nodeId} is not connected.`);
      setMessage("Please connect all nodes")
      return false;
    }
  }

  // If all nodes are connected, proceed with saving
  console.log("All nodes are connected. Proceeding with saving...");
  return true;
};


  function handleSave() {
    if (!isAllConnected()) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 3000)
    }

    SaveChart();

    setSave(true)

    setTimeout(() => {
      setSave(false)
    }, 3000);

  }


  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      {Visible && (
        <Alert
          sx={{
            marginBottom: "10px",
            position: "fixed",
            width: "50%",
            zIndex: 1000,
            top: 10,
            left: "25%",
          }}
          severity="warning"
        >
          {message}
        </Alert>
      )}

      {save && (
        <Alert
          sx={{
            marginBottom: "10px",
            position: "fixed",
            width: "50%",
            zIndex: 1000,
            top: 10,
            left: "25%",
          }}
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          Chart saved successfully
        </Alert>
      )}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                  width: "200px",
                  textAlign: "center",
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
                  width: "60%",
                  textAlign: "center",
                }}
              >
                {fileName}
              </Typography>
            )}
          </Box>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </Box>
  );
}
