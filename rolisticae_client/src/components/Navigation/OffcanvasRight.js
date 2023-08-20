import React, {useState} from 'react';
import {Offcanvas} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../../styles/Navigation/OffcanvasRight.css';
import {
    faHome,
    faCalendar,
    faFile,
    faBook,
    faIdBadge,
    faImages,
    faSearch
} from '@fortawesome/free-solid-svg-icons';

function OffcanvasRight({show, handleClose}) {
    const [searchValue, setSearchValue] = useState('');
    const isLoggedIn = localStorage.getItem('access') !== null; // Ajoutez cette ligne

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        window.location.href = `/search?q=${searchValue}`;
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <img src="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png" alt="Rolisticae"
                         className="offcanvas-logo"/>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div>
                    <div className="sp-menu-item offcanvas-sp">
                        <form className="center-align" onSubmit={handleSearchSubmit}>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            <input
                                className="center-align"
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="sp-menu-item offcanvas-sp">
                                <a href="/userprofile">Mon profil</a>
                            </div>
                            <div className="sp-menu-item offcanvas-sp">
                                <a href="/personnage">
                                    <FontAwesomeIcon icon={faIdBadge}
                                                     className="fa-facebook"></FontAwesomeIcon> Personnage
                                </a>
                            </div>
                            <div className="sp-menu-item offcanvas-sp">
                                <a href="/createcharacterstep1 ">
                                    <FontAwesomeIcon icon={faIdBadge}
                                                     className="fa-facebook"></FontAwesomeIcon> Création de personnage
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="sp-menu-item offcanvas-sp">
                            <a href="/login">Connexion</a>
                        </div>
                    )}
                    <div className="sp-menu-item offcanvas-sp">
                        <a href="/">
                            <FontAwesomeIcon icon={faHome} className="fa-facebook"></FontAwesomeIcon> Home
                        </a>
                    </div>
                    <div className="sp-menu-item offcanvas-sp">
                        <a href="/calendar">
                            <FontAwesomeIcon icon={faCalendar} className="fa-facebook"></FontAwesomeIcon> Calendrier
                        </a>
                    </div>
                    <div className="sp-menu-item offcanvas-sp">
                        <a href="/documents">
                            <FontAwesomeIcon icon={faFile} className="fa-facebook"></FontAwesomeIcon> Documents
                        </a>
                    </div>
                    <div className="sp-menu-item offcanvas-sp">
                        <a href="/rule">
                            <FontAwesomeIcon icon={faBook} className="fa-facebook"></FontAwesomeIcon> Règles
                        </a>
                    </div>
                    <div className="sp-menu-item offcanvas-sp">
                        <a href="/galerie">
                            <FontAwesomeIcon icon={faImages} className="fa-facebook"></FontAwesomeIcon> Galerie
                        </a>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OffcanvasRight;
