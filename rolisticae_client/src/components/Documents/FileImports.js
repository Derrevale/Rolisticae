// Importation des modules nécessaires
import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Définition du composant FileImports
const FileImports = () => {
    // Définition des états
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Utilisation de l'effet pour récupérer les catégories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8002/api/FileManager Categorie/');
                setCategories(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    // Gestion du dépôt de fichiers
    const handleFileDrop = (e) => {
        e.preventDefault();
        const fileList = Array.from(e.dataTransfer.files);
        setFiles(fileList);
    };

    // Gestion de l'envoi de fichiers
    const handleFileUpload = () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });
        formData.append('description', description);
        formData.append('categories', selectedCategory);
        axios.post('http://localhost:8002/api/FileManager File/', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Gestion du changement de catégorie
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Rendu du composant
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                border: '2px dashed black',
                padding: '20px',
                fontSize: '24px',
                textAlign: 'center',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
        >
            <h1 style={{marginBottom: '20px'}}>Drag and drop files to upload</h1>
            {files.length > 0 && (
                <>
                    <h2 style={{marginBottom: '10px'}}>Selected files:</h2>
                    <ul style={{listStyleType: 'none', textAlign: 'left'}}>
                        {files.map((file) => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                    </ul>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </label>
                    {!isLoading && (
                        <label>
                            Categories:
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    <button onClick={handleFileUpload}>Upload</button>
                </>
            )}
        </div>
    );
};

// Exportation du composant FileImports
export default FileImports;
