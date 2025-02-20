import React from "react";
import { Toolbar, Typography, Box } from "@mui/material";

import NavBar from "./NavBar";


const HomePage = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />
            <Box component="main" mt={8} p={2} sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
                <Toolbar />
                <Typography variant="h3" align="center" fontWeight="bold">
                Welcome to the Home Page
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;
