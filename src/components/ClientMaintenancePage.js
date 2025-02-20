import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, Grid, Avatar } from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import NavBar from "./NavBar";
import ClientService from "../services/ClientService";
import InterestService from "../services/InterestService";
import AuthContext from "../context/AuthContext";



const ClientMaintenancePage = () => {
    const { userData } = useContext(AuthContext);
    const { clientId } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [interests, setInterests] = useState([]);
    const [client, setClient] = useState({
        identification: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: null,
        affiliationDate: null,
        mobilePhone: "",
        otherPhone: "",
        address: "",
        review: "",
        interest: ""
    });

    useEffect(() => {
        fetchInterests();
        if (clientId) {
            fetchClientDetails(clientId);
        }
    }, [clientId]);

    useEffect(() => {
        if (userData?.token) {
            ClientService.setAuthToken(userData.token);
            InterestService.setAuthToken(userData.token);
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prev) => ({ ...prev, [name]: value }));
    }

    const handleDateChange = (name, newValue) => {
        setClient((prev) => ({ ...prev, [name]: newValue }));
    }

    const fetchClientDetails = async (id) => {
        try {
            const clientData = await ClientService.get(id);
            setClient(clientData);
        } catch (error) {
            console.error('Error fetching client details:', error);
        }
    }

    const fetchInterests = async () => {
        try {
            const response = await InterestService.list();
            setInterests(response); 
        } catch (error) {
            console.error('Error fetching interests:', error);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (clientId) {
                await ClientService.update(clientId, client, userData?.userid);
                alert("Client updated successfully");
            }
            else {
                await ClientService.create(client, userData?.userid);
                alert("Client created successfully");
            }
            history.push("/clients");
        } catch (error) {
            alert("Error creating client: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />

            <Box component="main" mt={8} p={2} sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} mb={4}>
                    <Avatar sx={{ width: 80, height: 80 }} />
                    <Typography variant="h5" gutterBottom sx={{ ml: 2 }}>
                        Client Maintenance
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Identification" name="identification" value={client.identification} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="First Name" name="firstName" value={client.firstName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label="Last Name" name="lastName" value={client.lastName} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Gender *</InputLabel>
                            <Select name="gender" value={client.gender} onChange={handleChange} displayEmpty>
                                <MenuItem value="" disabled></MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Male"}>Male</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <DesktopDatePicker label="Birth Date" inputFormat="dd/MM/yyyy" value={client.birthDate} onChange={(date) => handleDateChange("birthDate", date)} renderInput={(params) => <TextField fullWidth {...params} />} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <DesktopDatePicker label="Affiliation Date" inputFormat="dd/MM/yyyy" value={client.affiliationDate} onChange={(date) => handleDateChange("affiliationDate", date)} renderInput={(params) => <TextField fullWidth {...params} />} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Mobile Phone" name="mobilePhone" value={client.mobilePhone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Other Phone" name="otherPhone" value={client.otherPhone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Address" name="address" value={client.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Review" name="review" value={client.review} onChange={handleChange} multiline rows={3} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Interest *</InputLabel>
                            <Select name="interest" value={client.interest} onChange={handleChange} displayEmpty>
                                <MenuItem value="" disabled></MenuItem>
                                {interests.map((interest) => (
                                    <MenuItem key={interest.id} value={interest.id}>
                                        {interest.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Button variant="contained" startIcon={<Save />} onClick={handleSubmit} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => history.push("/clients/")}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        
    );
};

export default ClientMaintenancePage;
