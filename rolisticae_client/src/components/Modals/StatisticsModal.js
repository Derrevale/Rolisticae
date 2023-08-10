import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/Modals/StatisticsModal.css';
import {useParams} from "react-router-dom";

function StatisticsModal({ isOpen, onRequestClose, statistics, onSave }) {
  const {id} = useParams();
  // Vérifications pour s'assurer que statistics et ses propriétés existent
  const initialStrength = statistics && statistics[0] ? statistics[0].strength : 0;
  const initialDexterity = statistics && statistics[0] ? statistics[0].dexterity : 0;
  const initialConstitution = statistics && statistics[0] ? statistics[0].constitution : 0;
  const initialPerception = statistics && statistics[0] ? statistics[0].perception : 0;
  const initialCharisma = statistics && statistics[0] ? statistics[0].charisma : 0;
  const initialIntelligence = statistics && statistics[0] ? statistics[0].intelligence : 0;

  const [strength, setStrength] = useState(initialStrength);
  const [dexterity, setDexterity] = useState(initialDexterity);
  const [constitution, setConstitution] = useState(initialConstitution);
  const [perception, setPerception] = useState(initialPerception);
  const [charisma, setCharisma] = useState(initialCharisma);
  const [intelligence, setIntelligence] = useState(initialIntelligence);

  const handleSubmit = async () => {
    const updatedStatistics = {
      strength,
      dexterity,
      constitution,
      perception,
      charisma,
      intelligence
    };

    try {
      // Utilisation de l'ID des statistiques pour l'endpoint de l'API
      console.log(statistics[0].id);
      const response = await fetch(`http://localhost:8010/api/Statistics/${statistics[0].id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez d'autres en-têtes si nécessaire, par exemple des tokens d'authentification
        },
        body: JSON.stringify(updatedStatistics)
      });

      const data = await response.json();
      if (response.ok) {
        onSave(updatedStatistics);  // Si vous avez une fonction de callback pour mettre à jour l'UI
        onRequestClose();  // Fermer le modal
      } else {
        console.error('Erreur lors de la mise à jour des statistiques:', data);
        // Gérez les erreurs ici, peut-être afficher un message à l'utilisateur
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      // Gérez les erreurs réseau ici, peut-être afficher un message à l'utilisateur
    }
};


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <label>
        Force:
        <input type="number" value={strength} onChange={e => setStrength(e.target.value)} />
      </label>
      <label>
        Dextérité:
        <input type="number" value={dexterity} onChange={e => setDexterity(e.target.value)} />
      </label>
      <label>
        Constitution:
        <input type="number" value={constitution} onChange={e => setConstitution(e.target.value)} />
      </label>
      <label>
        Perception:
        <input type="number" value={perception} onChange={e => setPerception(e.target.value)} />
      </label>
      <label>
        Charisme:
        <input type="number" value={charisma} onChange={e => setCharisma(e.target.value)} />
      </label>
      <label>
        Intelligence:
        <input type="number" value={intelligence} onChange={e => setIntelligence(e.target.value)} />
      </label>

      <button onClick={onRequestClose}>Fermer</button>
      <button onClick={handleSubmit}>Sauvegarder</button>
    </Modal>
  );
}

export default StatisticsModal;
