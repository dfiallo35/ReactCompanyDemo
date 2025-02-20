import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import NavBar from "./NavBar";
import AuthContext from "../context/AuthContext";

const NotFoundPage = () => {
    const history = useHistory();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (!userData || !userData.token) {
            history.push("/login");
        }
    }, [userData, history]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <NavBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
                <ErrorOutlineIcon sx={{ fontSize: 100, color: "primary.main" }} />
                <Typography variant="h2" fontWeight="bold" color="primary">
                    404
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    Oops... Page Not Found!
                </Typography>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
