
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { refreshToken, getUserInfo, fetchCampaigns } from '../api';  // Assuming that these functions will be in api.js

function PersonnagesList() {
    const [userInfo, setUserInfo] = useState(null);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        fetchCampaigns()
            .then(data => setCampaigns(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        getUserInfo()
            .then(data => setUserInfo(data))
            .catch(error => console.error(error));
    }, []);

    if (!userInfo) {
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    return (
        <div className="container mt-4">
            <h1>Personnages:</h1>
            <div className="row">
                {userInfo[0].characters && userInfo[0].characters.map(character => (
                    <div className="col-md-4 mb-3" key={character.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{character.first_name} {character.last_name}</h5>
                                <p className="card-text">PV: {character.health_points}</p>
                                <p className="card-text">PM: {character.mana_points}</p>
                                <p className="card-text">Race: {character.race.name}</p>
                                <p className="card-text">Level: {character.level}</p>
                                <p className="card-text">Campaign: {campaigns.find(camp => camp.id === character.campaign)?.name || "N/A"}</p>
                                <Link to={`/personnage/${character.id}`} className="btn btn-primary">Voir la fiche de personnage</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonnagesList;
