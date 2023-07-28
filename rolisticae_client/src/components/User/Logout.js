import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Supprimer les jetons du stockage local
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        // Rediriger l'utilisateur vers la page d'accueil ou de connexion
        navigate('/login');
    }, [navigate]);

    return null;
}

export default Logout;
