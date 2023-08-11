import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Row, Container} from 'react-bootstrap';

const CreateCharacterStep1 = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [healthPoints, setHealthPoints] = useState(0);
    const [healthPointsMax, setHealthPointsMax] = useState(0);
    const [manaPoints, setManaPoints] = useState(0);
    const [manaPointsMax, setManaPointsMax] = useState(0);
    const [destinyPoints, setDestinyPoints] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState('');

    const handleNext = () => {
        console.log({
            firstName,
            lastName,
            healthPoints,
            healthPointsMax,
            manaPoints,
            manaPointsMax,
            destinyPoints,
            selectedCampaign,
            selectedRace
        });
        // Ici, vous ajouteriez la logique pour passer à l'étape suivante
    };

    // Simuler une récupération des données de l'API (à remplacer par une vraie requête AJAX)
    useEffect(() => {
        // Récupération des campagnes
        fetch('http://localhost:8010/api/Campaign/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'pQ9PjIJ71Aa3S2nNbtRr3c2UdJKWFKfM4ZOjKdl8olPzpbMneqTySSEahg8lCQri'
            }
        })
            .then(response => response.json())
            .then(data => {
                const campaignNames = data.map(campaign => campaign.name);
                setCampaigns(campaignNames);
            });

        // Récupération des races
        fetch('http://localhost:8010/api/Race/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'pQ9PjIJ71Aa3S2nNbtRr3c2UdJKWFKfM4ZOjKdl8olPzpbMneqTySSEahg8lCQri'
            }
        })
            .then(response => response.json())
            .then(data => {
                const raceNames = data.map(race => race.name);
                setRaces(raceNames);
            });
    }, []);


    return (
        <Container>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Prénom</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Nom</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>PV</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="number" value={healthPoints}
                                      onChange={e => setHealthPoints(e.target.value)}/>
                    </Col>
                    <Col sm={1}>
                        <Form.Label>à</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control type="number" value={healthPointsMax}
                                      onChange={e => setHealthPointsMax(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>PM</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="number" value={manaPoints} onChange={e => setManaPoints(e.target.value)}/>
                    </Col>
                    <Col sm={1}>
                        <Form.Label>à</Form.Label>
                    </Col>
                    <Col sm={4}>
                        <Form.Control type="number" value={manaPointsMax}
                                      onChange={e => setManaPointsMax(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Points de destin</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="number" value={destinyPoints}
                                      onChange={e => setDestinyPoints(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Campagne</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={selectedCampaign}
                                      onChange={e => setSelectedCampaign(e.target.value)}>
                            {campaigns.map(campaign => (
                                <option key={campaign} value={campaign}>
                                    {campaign}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Race</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" value={selectedRace} onChange={e => setSelectedRace(e.target.value)}>
                            {races.map(race => (
                                <option key={race} value={race}>
                                    {race}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleNext}>Suivant -></Button>
            </Form>
        </Container>
    );
}

export default CreateCharacterStep1;
