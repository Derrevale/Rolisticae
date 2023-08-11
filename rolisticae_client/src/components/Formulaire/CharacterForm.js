import React, {useState, useEffect} from 'react';

function CreateCharacter() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [level, setLevel] = useState('');
    // Ajoutez d'autres états pour les autres champs

    const [races, setRaces] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [race, setRace] = useState('');
    const [campaign, setCampaign] = useState('');

    useEffect(() => {
        // Remplacez ces URLs par les URLs de vos points de terminaison API
        const racesApiUrl = 'http://localhost:8010/api/Race/';
        const campaignsApiUrl = 'http://localhost:8010/api/Campaign/';

        // Récupérez les races
        fetch(racesApiUrl)
            .then(response => response.json())
            .then(data => setRaces(data))
            .catch(error => console.error('Erreur lors de la récupération des races:', error));

        // Récupérez les campagnes
        fetch(campaignsApiUrl)
            .then(response => response.json())
            .then(data => setCampaigns(data))
            .catch(error => console.error('Erreur lors de la récupération des campagnes:', error));
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        // Appellez votre point de terminaison API pour créer un personnage ici
        // Vous devrez créer un objet qui regroupe tous les champs du formulaire
        // Vous devrez également gérer les champs complexes comme 'equipment', 'magic_items', etc.
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom du personnage"
            />
            <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom de famille du personnage"
            />
            <input
                type="number"
                value={level}
                onChange={e => setLevel(e.target.value)}
                placeholder="Niveau du personnage"
            />
            {/* Ajoutez d'autres champs pour les autres attributs du personnage */}
            <select value={race} onChange={e => setRace(e.target.value)}>
                {races.map(race => (
                    <option key={race.id} value={race.id}>{race.name}</option>
                ))}
            </select>
            <select value={campaign} onChange={e => setCampaign(e.target.value)}>
                {campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                ))}
            </select>
            <button type="submit">Créer un personnage</button>
        </form>
    );
}

export default CreateCharacter;
