import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Typography,
    IconButton,
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { Search, Add, ArrowBack, Edit, Delete } from "@mui/icons-material";

import NavBar from './NavBar';
import AuthContext from "../context/AuthContext";
import ClientService from "../services/ClientService";

const ClientListPage = () => {
    const { userData } = useContext(AuthContext);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState(null);
    const [searchIdentification, setSearchIdentification] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (userData?.token) {
            ClientService.setAuthToken(userData.token);
            fetchClients();
        }
    }, []);

    const fetchClients = async (name = null, identification = "") => {
        setLoading(true);
        try {
            const response = await ClientService.list(
                userData?.userid,
                name,
                identification
            );
            setClients(response);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
        setLoading(false);
    };

    const handleSearch = () => {
        fetchClients(searchName, searchIdentification);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this client?")) return;
        try {
            await ClientService.delete(id);
            setClients((prev) => prev.filter(client => client.id !== id));
        } catch (error) {
            console.error("Error deleting client:", error)
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />

            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
                <Box mt={8} p={2} component={Paper}>
                    <Typography variant="h5">Consult Clients</Typography>
                    <Box display="flex" gap={2} my={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            size="small"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value ? e.target.value : null)}
                        />
                        <TextField
                            fullWidth
                            label="Identification"
                            variant="outlined"
                            size="small"
                            value={searchIdentification}
                            onChange={(e) => setSearchIdentification(e.target.value)}
                        />
                        <IconButton color="primary" onClick={handleSearch}>
                            <Search />
                        </IconButton>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button variant="contained" startIcon={<Add />} onClick={() => history.push("/clients/new")}>Add</Button>
                        <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => history.push("/")}>Back</Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Identification</TableCell>
                                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Fullname</TableCell>
                                <TableCell sx={{ backgroundColor: "#1976d2", color: "white" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">Loading clients...</TableCell>
                                    </TableRow>
                                ) : (
                                    clients.map((client, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{client.identification}</TableCell>
                                            <TableCell>{client.firstName + " " + client.lastName}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => history.push(`/clients/${client.id}`)}>
                                                    <Edit color="action" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(client.id)}>
                                                    <Delete color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ClientListPage;
