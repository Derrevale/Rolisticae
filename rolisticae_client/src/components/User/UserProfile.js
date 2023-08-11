
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../api';

async function getCampaignName(campaignId) {
    const response = await fetch(`http://localhost:8010/api/Campaign/${campaignId}/`);
    const data = await response.json();
    return data.name;
}

function Character({ character, campaignName }) {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-header">
                    {character.first_name} {character.last_name}
                </div>
                <div className="card-body">
                    <p className="card-text">Level: {character.level}</p>
                    <p className="card-text">Race: {character.race.name}</p>
                    <p className="card-text">Campaign: {campaignName}</p>
                </div>
            </div>
        </div>
    );
}

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const [campaignNames, setCampaignNames] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setUserInfo(data);
                const fetchCampaignNames = async () => {
                    const names = {};
                    for (let character of data[0].characters) {
                        names[character.id] = await getCampaignName(character.campaign);
                    }
                    setCampaignNames(names);
                }
                fetchCampaignNames();
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load user information.');
            });
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!userInfo) {
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    const characters = userInfo[0].characters;

    return (
        <div className="container mt-4">
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {userInfo[0].first_name} {userInfo[0].last_name}</p>
            <p><strong>Email:</strong> {userInfo[0].email}</p>
            <h2>Characters:</h2>
            {characters.map((character, index) => (
                (index % 3 === 0) && (
                    <div className="row" key={index}>
                        {characters.slice(index, index + 3).map(char => (
                            <Character key={char.id} character={char} campaignName={campaignNames[char.id]} />
                        ))}
                    </div>
                )
            ))}
            <Link to="/UserForm" className="btn btn-primary mt-3">Modifier mes informations</Link>
        </div>
    );
}

export default UserProfile;
