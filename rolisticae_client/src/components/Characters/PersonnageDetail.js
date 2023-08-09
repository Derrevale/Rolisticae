import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

function PersonnageDetail() {
    const [character, setCharacter] = useState({});
    const {id} = useParams();

    useEffect(() => {

        // Directly fetch the character details from the API
        fetch(`http://localhost:8010/api/Character/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setCharacter(data);
            })
            .catch(error => {
                console.error("Error fetching the character:", error);
            });
    }, [id]);

    return (
        <div>
            <h1>Personnages:</h1>
                <div className="card">
                    <h2 className="card-header">{character.first_name} {character.last_name}</h2>
                    <div className="card-body">
                        <p className="card-text">Level: {character.level}</p>
                        <p className="card-text">Race: {character.race?.name}</p>
                        <p className="card-text">Point de
                            vie: <span
                                style={{color: 'green'}}>{character.health_points} / {character.health_points_max} </span>
                        </p>
                        <p className="card-text">Point de
                            Mana: <span
                                style={{color: 'Blue'}}>{character.mana_points} / {character.mana_points_max} </span>
                        </p>

                        {character.statistics && character.statistics.map((stat, id) => (
                            <div className="card" key={id}>
                                <div className="card-header">
                                    Caractéristiques
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        Strength: {stat.strength} / <span
                                        style={{color: 'green'}}>Bonus: {stat.strength_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.strength_malus}</span> ->
                                        Total: {stat.strength + stat.strength_bonus - stat.strength_malus}
                                    </p>
                                    <p className="card-text">
                                        Dexterity: {stat.dexterity} / <span
                                        style={{color: 'green'}}>Bonus: {stat.dexterity_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.dexterity_malus}</span> ->
                                        Total: {stat.dexterity + stat.dexterity_bonus - stat.dexterity_malus}
                                    </p>
                                    <p className="card-text">
                                        Constitution: {stat.constitution} / <span
                                        style={{color: 'green'}}>Bonus: {stat.constitution_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.constitution_malus}</span> ->
                                        Total: {stat.constitution + stat.constitution_bonus - stat.constitution_malus}
                                    </p>
                                    <p className="card-text">
                                        Perception: {stat.perception} / <span
                                        style={{color: 'green'}}>Bonus: {stat.perception_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.perception_malus}</span> ->
                                        Total: {stat.perception + stat.perception_bonus - stat.perception_malus}
                                    </p>
                                    <p className="card-text">
                                        Charisma: {stat.charisma} / <span
                                        style={{color: 'green'}}>Bonus: {stat.charisma_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.charisma_malus}</span> ->
                                        Total: {stat.charisma + stat.charisma_bonus - stat.charisma_malus}
                                    </p>
                                    <p className="card-text">
                                        Intelligence: {stat.intelligence} / <span
                                        style={{color: 'green'}}>Bonus: {stat.intelligence_bonus}</span> / <span
                                        style={{color: 'red'}}>Malus: {stat.intelligence_malus}</span> ->
                                        Total: {stat.intelligence + stat.intelligence_bonus - stat.intelligence_malus}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <hr/>
                        <p className="card-text">Equipments:</p>
                        <div className="row">
                            {character.equipment_set && character.equipment_set.map((item, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Roll: {item.roll}</p>
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: item.description}}></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr/>
                        <p className="card-text">Objets Magiques:</p>
                        <div className="row">
                            {character.magic_items && character.magic_items.map((item, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Quantity: {item.quantity}</p>
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: item.description}}></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr/>
                        <p className="card-text">Objets divers :</p>
                        <div className="row">
                            {character.miscellaneous_items && character.miscellaneous_items.map((item, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Quantity: {item.quantity}</p>
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: item.description}}></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr/>
                        <p className="card-text">Nourritures et Boissons:</p>
                        <div className="row">
                            {character.food_drinks && character.food_drinks.map((item, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Quantity: {item.quantity}</p>
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: item.description}}></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr/>
                        <p className="card-text">Potions et Poisons:</p>
                        <div className="row">
                            {character.healing_potions && character.healing_potions.map((item, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {item.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Quantity: {item.quantity}</p>
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: item.description}}></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr/>
                        {character.wealth && character.wealth.map((wealth, id) => (
                            <div className="card" key={id}>
                                <div className="card-header">
                                    Richesse
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Gold Pieces: {wealth.gold_pieces}</p>
                                    <p className="card-text">Silver Pieces: {wealth.silver_pieces}</p>
                                    <p className="card-text">Copper Pieces: {wealth.copper_pieces}</p>
                                    <p className="card-text">Bank: {wealth.bank}</p>
                                </div>
                            </div>
                        ))}


                        <hr/>
                        <p className="card-text">Background:</p>
                        {character.history && character.history.map((history, id) => (
                            <div className="card" key={id}>

                                <div className="card-body">
                                    <p className="card-text"
                                       dangerouslySetInnerHTML={{__html: history.text}}></p>
                                </div>
                            </div>
                        ))}

                        <hr/>
                        <p className="card-text">Connaissance:</p>
                        <div className="row">
                            {character.knowledge && character.knowledge.map((knowledge, id) => (
                                <div className="col-sm-4" key={id}>
                                    <div className="card">
                                        <div className="card-header">
                                            {knowledge.name}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text"
                                               dangerouslySetInnerHTML={{__html: knowledge.description}}></p>
                                            <hr/>
                                            {knowledge.strength_bonus !== 0 &&
                                                <p className="card-text">
                                                    Strength Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.strength_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.strength_malus !== 0 &&
                                                <p className="card-text">
                                                    Strength Malus: <span
                                                    style={{color: 'red'}}>{knowledge.strength_malus}</span>
                                                </p>
                                            }
                                            {knowledge.dexterity_bonus !== 0 &&
                                                <p className="card-text">
                                                    Dexterity Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.dexterity_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.dexterity_malus !== 0 &&
                                                <p className="card-text">
                                                    Dexterity Malus: <span
                                                    style={{color: 'red'}}>{knowledge.dexterity_malus}</span>
                                                </p>
                                            }
                                            {knowledge.constitution_bonus !== 0 &&
                                                <p className="card-text">
                                                    Constitution Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.constitution_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.constitution_malus !== 0 &&
                                                <p className="card-text">
                                                    Constitution Malus: <span
                                                    style={{color: 'red'}}>{knowledge.constitution_malus}</span>
                                                </p>
                                            }
                                            {knowledge.perception_bonus !== 0 &&
                                                <p className="card-text">
                                                    Perception Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.perception_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.perception_malus !== 0 &&
                                                <p className="card-text">
                                                    Perception Malus: <span
                                                    style={{color: 'red'}}>{knowledge.perception_malus}</span>
                                                </p>
                                            }
                                            {knowledge.charisma_bonus !== 0 &&
                                                <p className="card-text">
                                                    Charisma Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.charisma_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.charisma_malus !== 0 &&
                                                <p className="card-text">
                                                    Charisma Malus: <span
                                                    style={{color: 'red'}}>{knowledge.charisma_malus}</span>
                                                </p>
                                            }
                                            {knowledge.intelligence_bonus !== 0 &&
                                                <p className="card-text">
                                                    Intelligence Bonus: <span
                                                    style={{color: 'green'}}>{knowledge.intelligence_bonus}</span>
                                                </p>
                                            }
                                            {knowledge.intelligence_malus !== 0 &&
                                                <p className="card-text">
                                                    Intelligence Malus: <span
                                                    style={{color: 'red'}}>{knowledge.intelligence_malus}</span>
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <Link to={`/CharacterForm/${character.id}`} className="btn btn-primary">Modifier
                        </Link>
                    </div>
                </div>

            <Link to="/CharacterForm/new" className="btn btn-primary">Créer un nouveau personnage</Link>
        </div>

    );
}

export default PersonnageDetail;
