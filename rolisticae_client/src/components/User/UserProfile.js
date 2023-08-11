import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

async function refreshToken() {
    const refresh = localStorage.getItem('refresh');

    const response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({refresh: refresh})
    });

    const data = await response.json();
    return data.access;
}

async function getUserInfo() {
    const token = localStorage.getItem('access');  // Get the token from local storage

    const response = await fetch("http://localhost:8000/api/User/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // Include the token in the Authorization header
        }
    });

    if (response.status === 401) {
        const newToken = await refreshToken();
        localStorage.setItem('access', newToken);
        return fetch(response.url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${newToken}`
            },
        });
    } else if (!response.ok) {
        throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    return data;
}

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserInfo().then(data => setUserInfo(data)).catch(error => console.error(error));
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userInfo[0].first_name} {userInfo[0].last_name}</p>
            <p>Email: {userInfo[0].email}</p>
            {/* Display other user info as needed */}
            <Link to="/UserForm">Modifier mes informations</Link>
        </div>
    );
}

export default UserProfile;
