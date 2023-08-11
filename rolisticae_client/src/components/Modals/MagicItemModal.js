import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useParams} from "react-router-dom";

function MagicItemModal({isOpen, onRequestClose, onSave}) {
    const {id} = useParams();

    // Initialize local states for Magic item properties.
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        const newMagicItem = {
            name,
            description,
            quantity,
            character: parseInt(id)  // Assuming the character's ID should be set here
        };

        try {
            const response = await fetch(`http://localhost:8010/api/MagicItem/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMagicItem)
            });

            const data = await response.json();
            if (response.ok) {
                onSave(newMagicItem);
                onRequestClose();
            } else {
                console.error("Erreur lors de l'ajout de l'objet magique:", data);
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

export default MagicItemModal;
