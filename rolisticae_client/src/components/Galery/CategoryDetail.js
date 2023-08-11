// Importation des modules nécessaires
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography, ImageList, ImageListItem} from '@mui/material';
import '../../styles/Galerie/CategoryList.css';

// Définition du composant CategoryDetail
const CategoryDetail = () => {
    // Utilisation des hooks pour définir et gérer l'état
    const {categoryId} = useParams();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);

    // Utilisation de useEffect pour récupérer les données lors du montage du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8010/api/Galerie Categorie/');
                setCategories(response.data);
                const currentCategory = response.data.find((cat) => cat.id === parseInt(categoryId));
                setCategory(currentCategory);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8010/api/Galerie Image/');
                setImages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des images:', error);
            }
        };

        fetchCategories();
        fetchImages();
    }, [categoryId]);

    // Fonction pour obtenir les sous-catégories
    const getSubcategories = () => {
        if (!category) return [];
        return categories.filter((cat) => cat.parent_category === category.id);
    };

    if (!category) {
        return <div>Loading...</div>;
    }
    // Rendu du composant
    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>
                {category.name}
            </Typography>
            <Grid container spacing={4}>
                {getSubcategories().map((subcategory) => (
                    <Grid item key={subcategory.id} xs={12} sm={6} md={4}>
                        <Link to={`/galerie/${subcategory.id}`} style={{textDecoration: 'none'}}>
                            <Card>
                                <CardActionArea>
                                    {subcategory.image && (
                                        <CardMedia
                                            component="img"
                                            alt={subcategory.name}
                                            height="140"
                                            image={subcategory.image}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {subcategory.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" component="h3" gutterBottom>
                Images
            </Typography>
            <ImageList cols={3} gap={8}>
                {category.images.map((imageId) => {
                    const image = images.find((img) => img.id === imageId);
                    return (
                        image && (
                            <ImageListItem key={image.id}>
                                <img src={image.image} alt={image.id} loading="lazy"/>
                            </ImageListItem>
                        )
                    );
                })}
            </ImageList>
        </div>
    );
};

// Exportation du composant CategoryDetail
export default CategoryDetail;
