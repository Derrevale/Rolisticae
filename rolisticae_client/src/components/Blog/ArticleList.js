// Importation des modules nécessaires
import React, {useState, useEffect} from "react";
import '../../styles/Blog/ArticleList.css';

// Définition du composant ArticleList
function ArticleList() {
    // Utilisation du Hook d'état pour stocker les articles
    const [articles, setArticles] = useState([]);

    // Utilisation du Hook d'effet pour récupérer les articles lors du montage du composant
    useEffect(() => {
        // Utilisation de fetch pour effectuer une requête GET à l'API
        fetch("http://localhost:8010/api/Blog Article/")
            // Conversion de la réponse en JSON
            .then((response) => response.json())
            // Mise à jour de l'état des articles avec les données reçues
            .then((data) => setArticles(data))
            // Journalisation des erreurs éventuelles
            .catch((error) => console.log(error));
    }, []);

    // Rendu du composant
    return (
        <section className="row row-1 cols-3">
            {/* Boucle sur les articles pour les afficher */}
            {articles.map((article) => (
                <div className="col-lg-4" key={article.id}>
                    <div className="articleList-item">
                        {/* Affichage de l'image de l'article si elle existe */}
                        {article.header_image && (
                            <img
                                src={article.header_image}
                                alt={article.title}
                                className="articleList-img"
                            />
                        )}
                        <div className="article-header">
                            <h2 className="articlelist-title">{article.title}</h2>
                        </div>
                        <div className="article-content">
                            {/* Affichage de l'intro de l'article */}
                            <div dangerouslySetInnerHTML={{__html: article.intro}}></div>
                            {/* Lien vers la page de l'article */}
                            <a href={`/articles/${article.id}`}>Lire la suite...</a>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

// Exportation du composant ArticleList
export default ArticleList;
