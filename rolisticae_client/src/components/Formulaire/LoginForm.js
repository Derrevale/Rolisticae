import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Snackbar, Alert} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import config from "../config";

const PaperContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const Form = styled('form')(({theme}) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2),
}));

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch(`${config.API_ENDPOINT}/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the tokens in the local storage
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            // Fetch the user details to get is_staff
            fetch(`${config.API_ENDPOINT}/User/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.access}`
                }
            })
                .then(userResponse => {
                    if (!userResponse.ok) {
                        throw new Error('Failed to fetch user details');
                    }
                    return userResponse.json();
                })
                .then(userData => {
                    localStorage.setItem('is_staff', userData[0].is_staff);
                    setMessage(`Bienvenue ${email}`);
                    setSeverity("success");
                    setOpen(true);
                    navigate('/');
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                    setMessage("Une erreur s'est produite lors de la récupération des détails de l'utilisateur");
                    setSeverity("error");
                    setOpen(true);
                });
        } else {
            setMessage("Email ou mot de passe incorrect");
            setSeverity("error");
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <PaperContainer component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <Form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </SubmitButton>
            </Form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </PaperContainer>
    );
}

export default LoginForm;
