// Importation des modules nécessaires
import React, {useState, useEffect} from "react";
import axios from "axios";

// Définition du composant SearchResult
function SearchResult(props) {
    // Utilisation des hooks pour définir et gérer l'état
    const [results, setResults] = useState([]);

    // Utilisation de useEffect pour récupérer les données lors du montage du composant
    useEffect(() => {
        // Récupération de la requête de recherche à partir de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("q");

        const fetchData = async () => {
            // Appel à l'API de recherche avec la requête de recherche
            const response = await axios.get(`http://localhost:8010/api/search/?q=${searchQuery}`);
            // Mise à jour de l'état avec les résultats de la recherche
            setResults(response.data);
            console.log(response.data)
        };
        fetchData();
    }, []);

    // Rendu du composant
    return (
        <div>
            <h1>Search Results </h1>
            {results.length === 0 ? (
                <p>Aucun résultat a votre recherche</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <a href={`http://localhost:8010/${result.fileUrl}`} download>{result.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Exportation du composant SearchResult
export default SearchResult;
