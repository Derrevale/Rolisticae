import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@mui/material';
import '../../styles/Galerie/CategoryList.css';

// Définition du composant CategoryList
const CategoryList = () => {
    // Utilisation des hooks pour définir et gérer l'état
    const [categories, setCategories] = useState([]);

    // Utilisation de useEffect pour récupérer les données lors du montage du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8010/api/Galerie Categorie/');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Filtrer les catégories sans parent (parent_category === null)
    const noParentCategories = categories.filter(category => category.parent_category === null);

    // Rendu du composant
    return (
        <Grid container spacing={4} className="CategoryList">
            {noParentCategories.map((category) => (
                <Grid item key={category.id} xs={12} sm={6} md={4} className="CategoryList2">
                    <Link to={`/Galerie/${category.id}`} style={{textDecoration: 'none'}}>
                        <Card className="CategoryList3">
                            <CardActionArea className="CategoryList4">
                                {category.image && (
                                    <CardMedia
                                        component="img"
                                        alt={category.name}
                                        image={category.image}
                                        className="Img_Cadre"
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {category.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

// Exportation du composant CategoryList
export default CategoryList;
