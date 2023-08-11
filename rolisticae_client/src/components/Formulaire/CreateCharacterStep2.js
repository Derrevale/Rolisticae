import React, { useState } from 'react';

const CreateCharacterStep2 = () => {
    const [strength, setStrength] = useState(0);
    const [strengthBonus, setStrengthBonus] = useState(0);
    const [strengthMalus, setStrengthMalus] = useState(0);

    const [dexterity, setDexterity] = useState(0);
    const [dexterityBonus, setDexterityBonus] = useState(0);
    const [dexterityMalus, setDexterityMalus] = useState(0);

    const [constitution, setConstitution] = useState(0);
    const [constitutionBonus, setConstitutionBonus] = useState(0);
    const [constitutionMalus, setConstitutionMalus] = useState(0);

    const [perception, setPerception] = useState(0);
    const [perceptionBonus, setPerceptionBonus] = useState(0);
    const [perceptionMalus, setPerceptionMalus] = useState(0);

    const [charisma, setCharisma] = useState(0);
    const [charismaBonus, setCharismaBonus] = useState(0);
    const [charismaMalus, setCharismaMalus] = useState(0);

    const [intelligence, setIntelligence] = useState(0);
    const [intelligenceBonus, setIntelligenceBonus] = useState(0);
    const [intelligenceMalus, setIntelligenceMalus] = useState(0);

    const handleNext = () => {
        console.log({
            strength, strengthBonus, strengthMalus,
            dexterity, dexterityBonus, dexterityMalus,
            constitution, constitutionBonus, constitutionMalus,
            perception, perceptionBonus, perceptionMalus,
            charisma, charismaBonus, charismaMalus,
            intelligence, intelligenceBonus, intelligenceMalus
        });
        // Ici, ajoutez la logique pour passer à l'étape suivante
    };

    return (
        <div>
            {/* Exemple pour la force, répétez la même structure pour les autres statistiques */}
            <label>
                Force :
                <input type="number" value={strength} onChange={e => setStrength(e.target.value)} />
                Bonus :
                <input type="number" value={strengthBonus} onChange={e => setStrengthBonus(e.target.value)} />
                Malus :
                <input type="number" value={strengthMalus} onChange={e => setStrengthMalus(e.target.value)} />
            </label>
            <br />
            {/* ... (Les autres champs de statistiques) */}
            <button onClick={handleNext}>Suivant -></button>
        </div>
    );
}

export default CreateCharacterStep2;
