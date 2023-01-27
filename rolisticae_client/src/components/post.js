import React from "react";
import parse from 'html-react-parser';


const Article = ({title, content, header_image, onclick}) => {
    const cleanedContent = parse(content, {
        replace: (node) => {
            if (node.attribs) {
                // Supprimer les attributs HTML (ex: style, class)
                node.attribs = {};
            }
            if (node.name === 'script') {
                // Supprimer les balises script
                return null;
            }
        },
    });
    return (
        <div className="article">
            <div className="article-header">
                <div>
                    <p className="article-title">{title}</p>
                </div>
                <div>
                    <img src={header_image} alt={title} className="article-img"/>
                </div>
                <div>
                    <a href="#" className="close" onClick={onclick}>X</a>
                </div>
            </div>
            <div className="article-content">
                <p>{cleanedContent}</p>
            </div>
        </div>
    )
}

export {
    Article
}
