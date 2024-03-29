import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import config from "../config";

function MiscellaneousItemModal({isOpen, onRequestClose, onSave}) {
    const {id} = useParams();

    // Initialize local states for Magic item properties.
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        const newMiscellaneousItem = {
            name,
            description,
            quantity,
            character: parseInt(id)  // Assuming the character's ID should be set here
        };

        try {
            const response = await fetch(`${config.API_ENDPOINT}/MiscellaneousItem/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMiscellaneousItem)
            });

            const data = await response.json();
            if (response.ok) {
                onSave(newMiscellaneousItem);
                onRequestClose();
            } else {
                console.error("Erreur lors de l'ajout de l'objet divers:", data);
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
        }
    };

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Body>
                <label>
                    Nom:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
                </label>
                <label>
                    Quantiter:
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required/>
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} required/>
                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Fermer</Button>
                <Button variant="primary" onClick={handleSubmit}>Ajouter</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MiscellaneousItemModal;
