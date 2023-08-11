
import React from 'react';
import axios from "axios";

async function refreshToken() {
    const refresh = localStorage.getItem('refresh');

    const response = await fetch("http://localhost:8010/api/token/refresh/", {
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

    const response = await fetch("http://localhost:8010/api/User/", {
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

export { refreshToken, getUserInfo };

export async function fetchCampaigns() {
    const response = await fetch('http://localhost:8010/api/Campaign/', {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': '5IuVqPFT992G2aBtywHsJ7POMCwsNPqPgpgIGI7BBDlcVSFKdcYaTGJwuo4RISyf'
        }
    });
    const data = await response.json();
    return data;
}
export const getCharacterDetail = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8010/api/Character/${id}/`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
