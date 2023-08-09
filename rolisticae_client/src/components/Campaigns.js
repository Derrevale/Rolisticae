
import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from './api';

function CampaignCard({ campaign }) {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <img src={campaign.image} alt={campaign.name} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{campaign.name}</h5>
                    <p className="card-text">{campaign.description}</p>
                </div>
            </div>
        </div>
    );
}

function Campaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCampaigns()
            .then(data => setCampaigns(data))
            .catch(err => {
                console.error(err);
                setError('Failed to load campaigns.');
            });
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (campaigns.length === 0) {
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    return (
        <div className="container mt-4">
            <h1>Campaigns</h1>
            <div className="row">
                {campaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
}

export default Campaign;
