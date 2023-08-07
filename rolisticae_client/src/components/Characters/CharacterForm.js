import React, { useState } from 'react';

async function refreshToken() {
    console.log('Refreshing token...');
    const refresh = localStorage.getItem('refresh');

    const response = await fetch("http://localhost:8010/api/token/refresh/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refresh })
    });

    const data = await response.json();
    console.log('New access token:', data.access);
    return data.access;
}

async function createCharacter(character) {
    console.log('Creating character with data:', character);
    let token = localStorage.getItem('access');
    console.log('Current access token:', token);

    let response = await fetch("http://localhost:8010/api/Character/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(character)
    });

    console.log('Response status:', response.status);
    if (response.status === 401) {
        console.log('Unauthorized, refreshing token...');
        const newToken = await refreshToken();
        localStorage.setItem('access', newToken);
        token = newToken;
        response = await fetch("http://localhost:8010/api/Character/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(character)
        });
    }

    if (!response.ok) {
        console.error('Failed to create character, response:', response);
        throw new Error("Failed to create character");
    }

    const data = await response.json();
    console.log('Character created, data:', data);
    return data;
}

function CharacterForm() {
    console.log('Initializing character form...');
    const [character, setCharacter] = useState({
        first_name: '',
        last_name: '',
        level: '',
        health_points: '',
        health_points_max: '',
        mana_points: '',
        mana_points_max: '',
        destiny_points: '',
        experience: '',
        sex: '',
        size: '',
        user: '',
        campaign: '',
        race: ''
        // Add all the other character attributes here...
    });

    const handleChange = (event) => {
        console.log(`Updating form field ${event.target.name} with value ${event.target.value}`);
        setCharacter({
            ...character,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitting form...');
        createCharacter(character).then(data => {
            console.log('Form submitted, response data:', data);
            // Handle the response here. For example, you might want to redirect the user to the character page...
        }).catch(error => console.error('Error while submitting form:', error));
    };

    console.log('Rendering form...');
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" name="first_name" value={character.first_name} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" value={character.last_name} onChange={handleChange} />
            </label>
            <label>
                Level:
                <input type="text" name="level" value={character.level} onChange={handleChange} />
            </label>
            <label>
                Health Points:
                <input type="text" name="health_points" value={character.health_points} onChange={handleChange} />
            </label>
            <label>
                Max Health Points:
                <input type="text" name="health_points_max" value={character.health_points_max} onChange={handleChange} />
            </label>
            <label>
                Mana Points:
                <input type="text" name="mana_points" value={character.mana_points} onChange={handleChange} />
            </label>
            <label>
                Max Mana Points:
                <input type="text" name="mana_points_max" value={character.mana_points_max} onChange={handleChange} />
            </label>
            <label>
                Destiny Points:
                <input type="text" name="destiny_points" value={character.destiny_points} onChange={handleChange} />
            </label>
            <label>
                Experience:
                <input type="text" name="experience" value={character.experience} onChange={handleChange} />
            </label>
            <label>
                Sex:
                <input type="text" name="sex" value={character.sex} onChange={handleChange} />
            </label>
            <label>
                Size:
                <input type="text" name="size" value={character.size} onChange={handleChange} />
            </label>
            <label>
                User ID:
                <input type="text" name="user" value={character.user} onChange={handleChange} />
            </label>
            <label>
                Campaign ID:
                <input type="text" name="campaign" value={character.campaign} onChange={handleChange} />
            </label>
            <label>
                Race ID:
                <input type="text" name="race" value={character.race} onChange={handleChange} />
            </label>
            {/* Add the inputs for the other character attributes here... */}
            <input type="submit" value="Create Character" />
        </form>
    );
}

export default CharacterForm;
