// Importation des modules React et React Router
import React from "react";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

// Importation des composants de l'application
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import SignupForm from "./User/Signup/SignupForm";
import LoginForm from "./User/LoginForm";
import Logout from './User/Logout';
import UserForm from "./User/UserForm";
import ArticleList from "./Blog/ArticleList";
import Article from "./Blog/Article";
import Documents from "./Documents/Documents";
import FileImports from "./Documents/FileImports";
import CategoryList from "./Galery/CategoryList";
import CategoryDetail from "./Galery/CategoryDetail";
import SearchResult from "./Search/SearchResult";
import CalendarEvent from "./Calendar/CalendarEvent";
import AddEventForm from "./Formulaire/EventForm";
import AppointmentList from "./Appointments/AppointmentList";
import UserProfile from "./User/UserProfile";

// Définition du composant App
function App() {
    return (
        <div className="App">
            <Topbar/>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Root/>}>
                        <Route index element={<ArticleList/> /* Route pour la liste des articles */}/>
                        <Route path="/calendrier/:id"
                               element={<CalendarEvent/> /* Route pour un événement du calendrier */}/>
                        <Route path="/eventform"
                               element={<AddEventForm/> /* Route pour le formulaire d'ajout d'événement */}/>
                        <Route path="/fileimport" element={<FileImports/> /* Route pour l'importation de fichiers */}/>
                        <Route path="/search" element={<SearchResult/> /* Route pour les résultats de recherche */}/>
                        <Route path="/articlelist" element={<ArticleList/> /* Route pour la liste des articles */}/>
                        <Route path="/articles/:id" element={<Article/> /* Route pour un article spécifique */}/>
                        <Route path="/appointment"
                               element={<AppointmentList/> /* Route pour la liste des rendez-vous */}/>
                        <Route path="/documents" element={<Documents/> /* Route pour les documents */}/>
                        <Route path="/Galerie"
                               element={<CategoryList/> /* Route pour la liste des catégories de la galerie */}/>
                        <Route path="/Galerie/:categoryId"
                               element={<CategoryDetail/> /* Route pour une catégorie spécifique de la galerie */}/>
                        <Route path="/signup" element={<SignupForm/> /* Route pour le formulaire d'inscription */}/>
                        <Route path="/login" element={<LoginForm/> /* Route pour le formulaire de connexion */}/>
                        <Route path="/logout" element={<Logout/> /* Route pour la déconnexion */}/>
                        <Route path="/userform" element={<UserForm/> /* Route pour le formulaire utilisateur */}/>
                        <Route path="/userprofile" element={<UserProfile/> /* Route pour le profil utilisateur */}/>
                    </Route>
                </Routes>


            </BrowserRouter>
        </div>
    );
}

// Composant racine pour l'application
const Root = () => {
    return (
        <div className="container">
            <Outlet/>
        </div>
    )
}

// Exportation du composant App
export default App;
