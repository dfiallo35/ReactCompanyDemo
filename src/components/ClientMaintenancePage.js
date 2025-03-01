import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Grid,
    Avatar,
    Snackbar,
    Alert
} from "@mui/material";
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
        interest: "",
        image: ""
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

    useEffect(() => {
            if (!userData || !userData.token) {
                history.push("/login");
            }
        }, [userData, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name, newValue) => {
        setClient((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setClient((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchClientDetails = async (id) => {
        try {
            const clientData = await ClientService.get(id);
            setClient(clientData);
        } catch (error) {
            setSnackbarMessage("Error fetching client details");
            setSnackbarSeverity("error");
        }
    };

    const fetchInterests = async () => {
        try {
            const response = await InterestService.list();
            setInterests(response);
        } catch (error) {
            setSnackbarMessage("Error fetching interests");
            setSnackbarSeverity("error");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (clientId) {
                await ClientService.update(clientId, client, userData?.userid);
                setSnackbarMessage("Client updated successfully");
                setSnackbarSeverity("success");
            } else {
                await ClientService.create(client, userData?.userid);
                setSnackbarMessage("Client created successfully");
                setSnackbarSeverity("success");
            }
            setOpenSnackbar(true);
            history.push("/clients");
        } catch (error) {
            setSnackbarMessage("Error creating/updating client");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />

            <Box component="main" mt={8} p={2} sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} mb={4}>
                    <Avatar
                        sx={{ width: 80, height: 80, cursor: "pointer" }}
                        src={client.image || ""}
                        onClick={() => document.getElementById('imageInput').click()}
                    />
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

                    <input
                        type="file"
                        id="imageInput"
                        hidden
                        onChange={handleImageChange}
                        accept="image/*"
                    />

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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ClientMaintenancePage;
