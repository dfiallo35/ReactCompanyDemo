import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Toolbar, Typography, Box } from "@mui/material";

import NavBar from "./NavBar";
import AuthContext from "../context/AuthContext";


const HomePage = () => {
    const history = useHistory();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (!userData || !userData.token) {
            history.push("/login");
        }
    }, [userData, history]);

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
