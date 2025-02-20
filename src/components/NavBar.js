import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Box,
} from "@mui/material";
import { ExitToApp, Home, People } from "@mui/icons-material";

import AuthContext from "../context/AuthContext";


const drawerWidth = 240;


const NavBar = () => {
    const { userData, logout } = useContext(AuthContext);

    const history = useHistory();
    
    const handleLogout = () => {
        logout();
        history.push("/login");
    };

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, ml: drawerWidth }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Company Logo
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        {userData?.username}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout} >
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <Drawer
                variant="persistent"
                anchor="left"
                open
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ textAlign: "center", my: 2 }}>
                    <Avatar sx={{ width: 80, height: 80, mx: "auto" }} />
                    <Typography fontWeight="bold">{userData?.username}</Typography>
                </Box>

                <List>
                    <Typography variant="h6" sx={{ ml: 2, my: 1 }}>
                        MENU
                    </Typography>
                    <ListItem button onClick={() => history.push("/")} >
                        <ListItemIcon >
                            <Home color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => history.push("/clients")}>
                        <ListItemIcon>
                            <People color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Consult Clients" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default NavBar;
