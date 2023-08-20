import React, { useState } from 'react';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import config from "../config";

function KnowledgeModal({ isOpen, onRequestClose, onSave }) {
    const { id } = useParams();  // Get the character ID from the URL parameters

    const [knowledgeData, setKnowledgeData] = useState({
        name: "",
        description: "",
        strength_bonus: 0,
        strength_malus: 0,
        dexterity_bonus: 0,
        dexterity_malus: 0,
        constitution_bonus: 0,
        constitution_malus: 0,
        perception_bonus: 0,
        perception_malus: 0,
        charisma_bonus: 0,
        charisma_malus: 0,
        intelligence_bonus: 0,
        intelligence_malus: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setKnowledgeData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...knowledgeData,
            character: parseInt(id)  // Add the character ID to the data
        };

        try {
            const response = await fetch(`${config.API_ENDPOINT}/Knowledge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)  // Send the data with the character ID
            });

            if (response.ok) {
                onSave(dataToSend);
                onRequestClose();
            } else {
                const data = await response.json();
                console.error("Erreur lors de l'ajout de la connaissance:", data);
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Knowledge Modal"
        >
            <h2>Ajouter/Modifier une Connaissance</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Nom: </label>
                    <input type="text" name="name" value={knowledgeData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Description: </label>
                    <textarea name="description" value={knowledgeData.description} onChange={handleChange}
                              required></textarea>
                </div>
                {/* ... You can add similar divs for each of the bonus/malus fields ... */}
                <div>
                    <label>Bonus de Force: </label>
                    <input type="number" name="strength_bonus" value={knowledgeData.strength_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Force: </label>
                    <input type="number" name="strength_malus" value={knowledgeData.strength_malus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Bonus de Dexterité: </label>
                    <input type="number" name="dexterity_bonus" value={knowledgeData.dexterity_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Dexterité: </label>
                    <input type="number" name="dexterity_malus" value={knowledgeData.dexterity_malus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Bonus de Constitution: </label>
                    <input type="number" name="constitution_bonus" value={knowledgeData.constitution_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Constitution: </label>
                    <input type="number" name="constitution_malus" value={knowledgeData.constitution_malus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Bonus de Perception: </label>
                    <input type="number" name="perception_bonus" value={knowledgeData.perception_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Perception: </label>
                    <input type="number" name="perception_malus" value={knowledgeData.perception_malus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Bonus de Charisme: </label>
                    <input type="number" name="charisma_bonus" value={knowledgeData.charisma_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Charisme: </label>
                    <input type="number" name="charisma_malus" value={knowledgeData.charisma_malus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Bonus de Intelligence: </label>
                    <input type="number" name="intelligence_bonus" value={knowledgeData.intelligence_bonus}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Malus de Intelligence: </label>
                    <input type="number" name="intelligence_malus" value={knowledgeData.intelligence_malus}
                           onChange={handleChange}/>
                </div>
                <button type="submit">Sauvegarder</button>
                <button onClick={onRequestClose}>Annuler</button>
            </form>
        </Modal>
    );
}

export default KnowledgeModal;
