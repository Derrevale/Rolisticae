import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import SignupForm from "./User/SignupForm";  // Import the SignupForm

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Link,
    Outlet,
    RouterProvider,
    useParams
} from "react-router-dom";
import ArticleList from "./Blog/ArticleList";
import Article from "./Blog/Article";

import Documents from "./Documents/Documents";
import FileImports from "./Documents/FileImports";

import CategoryList from "./Galery/CategoryList";
import CategoryDetail from "./Galery/CategoryDetail";

import SearchResult from "./Search/SearchResult";

import CalendarEvent from "./Calendar/CalendarEvent";
import AddEventForm from "./Formulaire/EventForm";

import AppointmentList  from "./Appointments/AppointmentList";

import LoginForm from "./User/LoginForm";  // Import the LoginForm

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root/>}>
                <Route index element={<ArticleList/>}/>
                <Route path="/calendrier/:id" element={<CalendarEvent/>}/>

                <Route path="/eventform" element={<AddEventForm/>}/>
                <Route path="/fileimport" element={<FileImports/>}/>
                <Route path="/search" element={<SearchResult/>}/>

                <Route path="/articlelist" element={<ArticleList/>}/>
                <Route path="/articles/:id" element={<Article/>}/>

                <Route path="/appointment" element={<AppointmentList/>}/>

                <Route path="/documents" element={<Documents/>}/>

                <Route path="/Galerie" element={<CategoryList/>}/>
                <Route path="/Galerie/:categoryId" element={<CategoryDetail/>}/>

                <Route path="/signup" element={<SignupForm/>}/>  // New route for SignupForm
                <Route path="/login" element={<LoginForm/>}/>

                <Route element={<Navbar/>}/>
            </Route>
        )
    );


    return (
        <div className="App">
            <Topbar/>
            <Navbar/>
            <RouterProvider router={router}/>
        </div>
    );
}

const Root = () => {
    return (
        <>

            <div className="container">
                <Outlet/>
            </div>
        </>
    )
}
export default App
