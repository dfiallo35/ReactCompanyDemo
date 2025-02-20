import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Container,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Alert,
    Snackbar
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AuthContext from "../context/AuthContext";

const rememberUserName = "rememberUserName";
const rememberPassword = "rememberPassword";



const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const { login } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const savedUsername = localStorage.getItem(rememberUserName);
        const savedPassword = localStorage.getItem(rememberPassword);

        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await login(username, password);
            if (rememberMe) {
                localStorage.setItem(rememberUserName, username);
                localStorage.setItem(rememberPassword, password);
            } else {
                localStorage.removeItem(rememberUserName);
                localStorage.removeItem(rememberPassword);
            }
            setSnackbarMessage("Login successful!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            history.push("/");
        } catch (error) {
            setSnackbarMessage("Login failed. Please check your credentials.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    }

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
                    Log In
                </Typography>

                <form onSubmit={handleLogin} style={{ width: "100%" }}>
                    <TextField 
                        label="User" 
                        fullWidth 
                        margin="normal" 
                        variant="outlined" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth style={{ marginTop: 20 }} type="submit">
                        Log In
                    </Button>
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Remember me"
                        style={{ marginTop: 10 }}
                    />
                    <Typography variant="body2" style={{ marginTop: 10 }}>
                        Don't you have an account? <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>Register</a>
                    </Typography>
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

export default LoginForm;
