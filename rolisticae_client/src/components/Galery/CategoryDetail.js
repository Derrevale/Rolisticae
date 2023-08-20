import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Modal,
    IconButton,
    Box
} from '@mui/material';
import {NavigateBefore, NavigateNext} from '@mui/icons-material';
import '../../styles/Galerie/CategoryList.css';
import config from "../config";

const CategoryDetail = () => {
    const {categoryId} = useParams();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.API_ENDPOINT}/Galerie Categorie/`);
                setCategories(response.data);
                const currentCategory = response.data.find((cat) => cat.id === parseInt(categoryId));
                setCategory(currentCategory);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${config.API_ENDPOINT}/Galerie Image/`);
                setImages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des images:', error);
            }
        };

        fetchCategories();
        fetchImages();
    }, [categoryId]);

    const handleOpen = (imageId) => {
        const index = category.images.findIndex(id => id === imageId);
        setSelectedImageIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrev = () => {
        setSelectedImageIndex(prev => (prev - 1 + category.images.length) % category.images.length);
    };

    const handleNext = () => {
        setSelectedImageIndex(prev => (prev + 1) % category.images.length);
    };

    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>
                {category?.name}
            </Typography>

            <Typography variant="h5" component="h3" gutterBottom>
                Images
            </Typography>
            <Grid container spacing={4}>
                {category?.images.sort((a, b) => a - b).map((imageId) => {
                    const image = images.find((img) => img.id === imageId);
                    return (
                        image && (
                            <Grid item key={image.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea onClick={() => handleOpen(image.id)}>
                                        <CardMedia
                                            component="img"
                                            alt={image.name}
                                            height="140"
                                            image={image.image}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    );
                })}
            </Grid>

            {category && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <IconButton onClick={handlePrev}>
                            <NavigateBefore/>
                        </IconButton>
                        <img src={images.find(img => img.id === category.images[selectedImageIndex]).image}
                             alt="Gallery" style={{maxHeight: '80vh', maxWidth: '80vw'}}/>
                        <IconButton onClick={handleNext}>
                            <NavigateNext/>
                        </IconButton>
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default CategoryDetail;
