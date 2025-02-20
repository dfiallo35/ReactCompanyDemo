import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import {
    TextField, Button, Checkbox, FormControlLabel, Container, Box, Typography, IconButton, InputAdornment, Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AuthContext from "../context/AuthContext";

const rememberUserName = "rememberUserName"
const rememberPassword = "rememberPassword"

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

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
        setError("");

        try {
            await login(username, password);
            if (rememberMe) {
                localStorage.setItem(rememberUserName, username);
                localStorage.setItem(rememberPassword, password);
            } else {
                localStorage.removeItem(rememberUserName);
                localStorage.removeItem(rememberPassword);
            }
            history.push("/");
        } catch (error) {
            setError(error);
        }
    }

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
                Iniciar Sesión
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleLogin} style={{ width: "100%"}}>
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
                    {/* Remember me */}
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>}
                        label="Remember me"
                        style={{ marginTop: 10 }}
                    />
                    <Typography variant="body2" style={{ marginTop: 10 }}>
                    Don't you have an account? <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>Register</a>
                    </Typography>
                </form>
                
            </Box>
        </Container>
    );
};

export default LoginForm;