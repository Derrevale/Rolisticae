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

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                full_name: fullName,
                phone_number: phoneNumber,
                birth_date: birthDate
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("User registered: ", data);
        } else {
            console.log("Error registering user: ", data);
        }
    };

    return (
        <PaperContainer component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoFocus
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                />
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Register
                </SubmitButton>
            </Form>
        </PaperContainer>
    );
}

export default SignupForm;
