import React, {useState, useEffect} from 'react';
import {TextField, Button, Container, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import config from "../config";

// Styling for the container
const PaperContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

// Styling for the form
const Form = styled('form')(({theme}) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

// Styling for the submit button
const SubmitButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2),
}));

function UserForm() {
    const navigate = useNavigate();

    // State variables for user information
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    // Fetch user information on component mount
    useEffect(() => {
        fetch(`${config.API_ENDPOINT}/User/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error('Not authorized');
            }
            console.log(response)
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                setUsername(data[0].username);
                setEmail(data[0].email);
                setUserInfo(data);
                console.log(data)
            }
        })
        .catch(error => {
            if (error.message === 'Not authorized') {
                navigate('/login');
            }
            console.error("Error fetching user data:", error);
        });
    }, []);

    if (!localStorage.getItem('access')) {
        navigate('/login');
        return null;
    }

    // Handle form submission
    const handleSubmit = async event => {
        event.preventDefault();

        // Check if user information is available
        if (!userInfo || !userInfo[0] || !userInfo[0].id) {
            console.error("User ID not available");
            return;
        }

        // Send a PUT request to update the user information
        const response = await fetch(`${config.API_ENDPOINT}/User/${userInfo[0].id}/`, {
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
