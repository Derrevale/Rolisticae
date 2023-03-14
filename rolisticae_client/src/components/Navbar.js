import '../styles/Navbar.css'
import '../styles/bootstrap.min.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faCalendar, faFile, faBook, faIdBadge, faImages, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/calendrier/")
            .then((response) => setCategories(response.data))
            .catch((error) => console.log(error));
    }, []);
    return <header id="banner_header">
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
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                                className="fa-facebook"
                                            ></FontAwesomeIcon>{" "}
                                            Campagnes
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
                                        <a href="/Reglement">
                                            <FontAwesomeIcon icon={faBook}
                                                             className="fa-facebook"></FontAwesomeIcon> Règles
                                        </a>
                                    </li>
                                    <li className="sp-menu-item">
                                        <a href="/Personnage">
                                            <FontAwesomeIcon icon={faIdBadge}
                                                             className="fa-facebook"></FontAwesomeIcon> Personnage
                                        </a>
                                    </li>
                                    <li className="sp-menu-item">
                                        <a href="/Illustration">
                                            <FontAwesomeIcon icon={faImages}
                                                             className="fa-facebook"></FontAwesomeIcon> Illustration
                                        </a>
                                    </li>
                                    <li className="sp-menu-item">
                                        <a href="/off-menu">
                                            <span className="..."></span> Off-menu
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    </header>

}

export default Navbar