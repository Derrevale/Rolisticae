// Importation des modules nécessaires
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

// Définition du composant Article
function Article({match}) {
    // Utilisation du Hook d'état pour stocker l'article
    const [article, setArticle] = useState({});
    // Utilisation du Hook useParams pour obtenir les paramètres de l'URL
    const params = useParams();

    // Utilisation du Hook d'effet pour récupérer l'article lors du montage du composant
    useEffect(() => {
        // Utilisation de fetch pour effectuer une requête GET à l'API
        fetch(`http://localhost:8010/api/Blog Article/${params.id}/`)
            // Conversion de la réponse en JSON
            .then((response) => response.json())
            // Mise à jour de l'état de l'article avec les données reçues
            .then((data) => setArticle(data))
            // Journalisation des erreurs éventuelles
            .catch((error) => console.log(error));
    }, [params.id]);  // Dépendance sur params.id pour refaire la requête si l'ID change

    // Rendu du composant
    return (
        <section className="Article">
            <div className="article-header">
                <p className="article-title">{article.title}</p>
            </div>
            {/* Affichage de l'image de l'article si elle existe */}
            {article.header_image && (
                <img
                    src={article.header_image}
                    alt={article.title}
                    className="article-img"
                />
            )}
            <div className="article-content">
                {/* Affichage de l'intro et du contenu de l'article */}
                <div dangerouslySetInnerHTML={{__html: article.intro}}></div>
                <div dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
        </section>
    );
}

// Exportation du composant Article
export default Article;
