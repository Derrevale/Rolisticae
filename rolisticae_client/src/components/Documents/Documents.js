// Importation des modules nécessaires
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "../../styles/Documents/Document.css";
import config from "../config";
// Définition du composant Documents
const Documents = () => {
    // Définition de l'état des données
    const [data, setData] = useState([]);

    // Fonction pour construire la hiérarchie des documents
    const buildHierarchy = (items) => {
        const itemMap = new Map();
        items.forEach((item) => itemMap.set(item.id, {...item, children: []}));
        const result = [];

        for (const item of itemMap.values()) {
            if (item.parent) {
                const parent = itemMap.get(item.parent.id);
                parent.children.push(item);
            } else {
                result.push(item);
            }
        }

        return result;
    };

    // Utilisation de l'effet pour récupérer les données
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${config.API_ENDPOINT}/FileManager Categorie/`);
            const hierarchy = buildHierarchy(result.data);
            setData(hierarchy);
        };
        fetchData();
    }, []);

    // Fonction pour rendre l'arbre des documents
    const renderTree = (nodes, isChild = false) =>
        nodes.map((node) => (
            <TreeItem
                key={node.id}
                nodeId={node.id.toString()}
                label={node.name}
                sx={isChild ? {ml: 2} : {}}
            >
                {Array.isArray(node.files) &&
                    node.files.map((file) => (
                        <TreeItem
                            key={file.name}
                            nodeId={file.name}
                            label={
                                <a
                                    href={`${config.SEARCH_ENDPOINT}${file.fileUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {file.name}
                                </a>
                            }
                        />
                    ))}
                {node.children.length > 0 && renderTree(node.children, true)}
            </TreeItem>
        ));

    // Rendu du composant
    return (
        <div className="test" style={{margin: '2%', padding: '1%',width:'75%'}}>
            <TreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ChevronRightIcon/>}>
                {renderTree(data)}
            </TreeView>
        </div>
    );
};

// Exportation du composant Documents
export default Documents;
