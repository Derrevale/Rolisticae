import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import config from '../config';

function Article({match}) {
    const [article, setArticle] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`${config.API_ENDPOINT}/Blog Article/${params.id}/`)
            .then((response) => response.json())
            .then((data) => setArticle(data))
            .catch((error) => console.log(error));
    }, [params.id]);

    return (
        <section className="Article">

            {article.header_image && (
                <img
                    src={article.header_image}
                    alt={article.title}
                    className="article-img"
                />
            )}
            <div className="article-header">
                <p className="article-title">{article.title}</p>
            </div>
            <div className="article-content">
                <div dangerouslySetInnerHTML={{__html: article.intro}}></div>
                <div dangerouslySetInnerHTML={{__html: article.content}}></div>
            </div>
        </section>
    );
}

export default Article;
