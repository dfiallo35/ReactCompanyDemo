import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import NavBar from "./NavBar";

const NotFoundPage = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh", textAlign: "center" }}>
            <NavBar />
            <Box sx={{ mt: 10 }}>
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