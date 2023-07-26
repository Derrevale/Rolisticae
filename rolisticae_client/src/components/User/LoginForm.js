import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const PaperContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch("http://localhost:8010/api/token/", {
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
            console.log("User logged in: ", data);
        } else {
            console.log("Error logging in: ", data);
        }
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
        </PaperContainer>
    );
}

export default LoginForm;
