import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    TextField, Button, Container, Typography, Box, Snackbar, Alert
} from "@mui/material";

import AuthService from "../services/AuthenticationService";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const history = useHistory();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");

        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError("Password must be 8-20 characters with at least one uppercase and one lowercase letter.");
            return;
        }

        try {
            await AuthService.register(username, email, password);
            setSnackbarMessage("Registration successful! Please log in.");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            history.push("/login");
        } catch (error) {
            setSnackbarMessage("Registration failed. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>

                <form onSubmit={handleRegister} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="User Name"
                        margin="normal"
                        variant="outlined"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, borderRadius: 2 }}
                        type="submit"
                    >
                        REGISTER
                    </Button>
                </form>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterForm;
