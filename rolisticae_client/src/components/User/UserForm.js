import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styling for the container
const PaperContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

// Styling for the form
const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

// Styling for the submit button
const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

function UserForm() {
    // State variables for user information
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    // Fetch user information on component mount
    useEffect(() => {
        fetch("http://localhost:8010/api/User/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access')}`
            },
        })
        .then(response => response.json())
        .then(data => {
            setUsername(data[0].username);
            setEmail(data[0].email);
            setUserInfo(data);  // Save the user data for later use
        });
    }, []);

    // Handle form submission
    const handleSubmit = async event => {
        event.preventDefault();

        // Check if user information is available
        if (!userInfo || !userInfo[0] || !userInfo[0].id) {
            console.error("User ID not available");
            return;
        }

        // Send a PUT request to update the user information
        const response = await fetch(`http://localhost:8010/api/User/${userInfo[0].id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify({
                username: username,
                email: email,
                // Include other user fields as needed
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("User updated: ", data);
        } else {
            console.log("Error updating user: ", data);
        }
    };

    // Render the form
    return (
        <PaperContainer component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Update User
            </Typography>
            <Form onSubmit={handleSubmit}>
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
                    name="email"
                    label="Email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {/* Include other user fields as needed */}
                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Update
                </SubmitButton>
            </Form>
        </PaperContainer>
    );
}

export default UserForm;
