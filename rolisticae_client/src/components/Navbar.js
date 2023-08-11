import '../styles/Navbar.css';
import '../styles/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {
    faHome,
    faCalendar,
    faFile,
    faBook,
    faIdBadge,
    faImages,
    faSearch,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const isLoggedIn = localStorage.getItem('access') !== null;
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = `/search?q=${searchQuery}`;
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            setShowUserDropdown(!showUserDropdown);
        } else {
            navigate('/login');
        }
    };

    const handleProfileClick = () => {
        navigate('/userprofile');
        setShowUserDropdown(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access');
        navigate('/login');
        setShowUserDropdown(false);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/EventManager Calendrier /')
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <header id="banner_header">
            <div className="container">
                <div className="container-inner">
                    <div className="row">
                        <div className="header_logo col-auto">
                            <div className="header_column">
                                <div className="logo">
                                    <a href="/">
                                        <img className="logo-image  ls-is-cached lazyloaded"
                                             data-srcset="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png 1x"
                                             data-src="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png"
                                             alt="Intranet"
                                             data-size="auto"
                                             srcSet="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png 1x"
                                             src="src/components/Blog/ArticleList"></img>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="header_menu col flex-auto">
                            <div className="sp-column d-flex justify-content-end align-items-center">
                                <nav className="sp-megamenu-wrapper d-flex" role="navigation">
                                    <ul className="sp-megamenu-parent menu-animation-fade-up d-none d-lg-block">
                                        <li className="sp-menu-item">
                                            <a href="/">
                                                <FontAwesomeIcon icon={faHome}
                                                                 className="fa-facebook"></FontAwesomeIcon> Home
                                            </a>
                                        </li>
                                        <li className="sp-menu-item">
                                            <a onClick={toggleDropdown}>
                                                <FontAwesomeIcon icon={faCalendar}
                                                                 className="fa-facebook"></FontAwesomeIcon>{' '}
                                                Planning
                                            </a>
                                            {showDropdown && (
                                                <div className="dropdown">
                                                    <ul>
                                                        {categories.map((category, index) => (
                                                            <li key={index}>
                                                                <a href={`/calendrier/${category.id}`}>{category.name}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                        <li className="sp-menu-item">
                                            <a href="/Documents">
                                                <FontAwesomeIcon icon={faFile}
                                                                 className="fa-facebook"></FontAwesomeIcon> Documents
                                            </a>
                                        </li>
                                        <li className="sp-menu-item">
                                            <a href="/">
                                                <FontAwesomeIcon icon={faBook}
                                                                 className="fa-facebook"></FontAwesomeIcon> Règles
                                            </a>
                                        </li>
                                        <li className="sp-menu-item">
                                            <a href="">
                                                <FontAwesomeIcon icon={faIdBadge}
                                                                 className="fa-facebook"></FontAwesomeIcon> Personnage
                                            </a>
                                        </li>
                                        <li className="sp-menu-item">
                                            <a href="/Galerie">
                                                <FontAwesomeIcon icon={faImages}
                                                                 className="fa-facebook"></FontAwesomeIcon> Illustration
                                            </a>
                                        </li>
                                        <li className="sp-menu-item">
                                            <form className="center-align" onSubmit={handleSubmit}>
                                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                                <input
                                                    className="center-align"
                                                    type="text"
                                                    placeholder="Search"
                                                    value={searchQuery}
                                                    onChange={handleChange}
                                                />
                                            </form>
                                        </li>
                                        <li className="sp-menu-item d-lg-none">
                                            <button
                                                className="btn btn-link text-white"
                                                type="button"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#offcanvasExample"
                                                aria-controls="offcanvasExample"
                                            >
                                                <FontAwesomeIcon icon={faBars} className="fa-bars" size="xl"/>
                                            </button>
                                        </li>
                                        <li className="sp-menu-item">
                                            <a onClick={handleUserIconClick}>
                                                <FontAwesomeIcon icon={isLoggedIn ? faUserCircle : faUser}
                                                                 className="fa-facebook"/>
                                            </a>
                                            {showUserDropdown && (
                                                <div className="dropdown">
                                                    <ul>
                                                        <li>
                                                            <a onClick={handleProfileClick}>Mon profil utilisateur</a>
                                                        </li>
                                                        <li>
                                                            <a onClick={handleLogoutClick}>Déconnexion</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        Off-canvas
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <p>Contenu off-canvas...</p>
                        {/* Vous pouvez ajouter ici le contenu de votre off-canvas */}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
