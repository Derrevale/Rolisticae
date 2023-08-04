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
import {useNavigate, Link} from 'react-router-dom';

function Navbar({handleShow}) {
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
        navigate(`/search?q=${searchQuery}`);
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
            .get('http://localhost:8010/api/EventManager Calendrier /')
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
                                    <Link to="/">
                                        <img className="logo-image  ls-is-cached lazyloaded"
                                             data-srcset="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png 1x"
                                             data-src="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png"
                                             alt="Intranet"
                                             data-size="auto"
                                             srcSet="https://i.ibb.co/sKSbDBT/Rolisticae-2-removebg-preview.png 1x"
                                             src="src/components/Blog/ArticleList"></img>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="header_menu col flex-auto">
                            <div className="sp-column d-flex justify-content-end align-items-center">
                                <nav className="sp-megamenu-wrapper d-flex" role="navigation">
                                    <ul className="sp-megamenu-parent menu-animation-fade-up d-none d-lg-block">
                                        <li className="sp-menu-item">
                                            <Link to="/">
                                                <FontAwesomeIcon icon={faHome}
                                                                 className="fa-facebook"></FontAwesomeIcon> Home
                                            </Link>
                                        </li>
                                        <li className="sp-menu-item">
                                            <Link to='#' onClick={toggleDropdown}>
                                                <FontAwesomeIcon icon={faCalendar}
                                                                 className="fa-facebook"></FontAwesomeIcon>{' '}
                                                Planning
                                            </Link>
                                            {showDropdown && (
                                                <div className="dropdown">
                                                    <ul>
                                                        {categories.map((category, index) => (
                                                            <li key={index}>
                                                                <Link
                                                                    to={`/calendrier/${category.id}`}>{category.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                        <li className="sp-menu-item">
                                            <Link to="/Documents">
                                                <FontAwesomeIcon icon={faFile}
                                                                 className="fa-facebook"></FontAwesomeIcon> Documents
                                            </Link>
                                        </li>
                                        <li className="sp-menu-item">
                                            <Link to="/rule">
                                                <FontAwesomeIcon icon={faBook}
                                                                 className="fa-facebook"></FontAwesomeIcon> Règles
                                            </Link>
                                        </li>
                                        {isLoggedIn && (
                                            <li className="sp-menu-item">
                                                <Link to="/personnage">
                                                    <FontAwesomeIcon icon={faIdBadge}
                                                                     className="fa-facebook"></FontAwesomeIcon> Personnage
                                                </Link>
                                            </li>
                                        )}
                                        <li className="sp-menu-item">
                                            <Link to="/Galerie">
                                                <FontAwesomeIcon icon={faImages}
                                                                 className="fa-facebook"></FontAwesomeIcon> Illustration
                                            </Link>
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

                                        <li className="sp-menu-item">
                                            <a onClick={handleUserIconClick}>
                                                <FontAwesomeIcon icon={isLoggedIn ? faUserCircle : faUser}
                                                                 className="fa-facebook"/>
                                            </a>

                                            {showUserDropdown && (
                                                <div className="dropdown">
                                                    <ul>
                                                        <li>
                                                            <a onClick={handleProfileClick}>Mon profil
                                                                utilisateur</a>
                                                        </li>
                                                        <li>
                                                            <a onClick={handleLogoutClick}>Déconnexion</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </ul>
                                    <ul className="sp-megamenu-parent menu-animation-fade-up">
                                        <li className="sp-menu-item burger-icon">
                                            <button
                                                className="btn btn-link text-white  btn-burger"
                                                type="button"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#offcanvasExample"
                                                aria-controls="offcanvasExample"
                                                onClick={handleShow}
                                            >
                                                <FontAwesomeIcon icon={faBars} className="fa-bars" size="xl"/>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
