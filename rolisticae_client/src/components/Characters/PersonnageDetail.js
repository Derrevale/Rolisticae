import React, { useState, useEffect } from 'react';
import {getCharacterById, getCharacterDetail} from '../api';
import { useParams } from 'react-router-dom';

function PersonnageDetail() {
    const [character, setCharacter] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await getCharacterDetail(id);
                if (response.status === 200) {
                    setCharacter(response.data);
                }
            } catch (error) {
                console.error("Error fetching the character:", error);
            }
        };
        fetchCharacter();
    }, [id]);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{character.first_name} {character.last_name}</h5>
                <p className="card-text">Race: {character.race?.name}</p>
                <p className="card-text">Level: {character.level}</p>
                <p className="card-text">HP: {character.health_points}/{character.health_points_max}</p>
                <p className="card-text">MP: {character.mana_points}/{character.mana_points_max}</p>
                <p className="card-text">DP: {character.destiny_points}</p>
                <p className="card-text">XP: {character.experience}</p>
                <p className="card-text">Sex: {character.sex}</p>
                <p className="card-text">Size: {character.size}</p>
                <p className="card-text">Statistics: {character.statistics?.map(stat => (
                    <div key={stat.id}>
                        <p>Strength: {stat.strength}</p>
                        <p>Dexterity: {stat.dexterity}</p>
                        <p>Constitution: {stat.constitution}</p>
                        <p>Perception: {stat.perception}</p>
                        <p>Charisma: {stat.charisma}</p>
                        <p>Intelligence: {stat.intelligence}</p>
                    </div>
                ))}</p>
                <p className="card-text">History: {character.history?.map(hist => (
                    <div key={hist.id} dangerouslySetInnerHTML={{ __html: hist.text }}></div>
                ))}</p>
            </div>
        </div>
    );
}

export default PersonnageDetail;
