import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/OffcanvasRight.css';
import {
    faHome,
    faCalendar,
    faFile,
    faBook,
    faIdBadge,
    faImages,
    faSearch
} from '@fortawesome/free-solid-svg-icons';

function OffcanvasRight({ show, handleClose }) {
  const [searchValue, setSearchValue] = useState('');

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
        <Offcanvas.Title>Menu secondaire</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
            <div className="sp-menu-item">
                <a href="/">
                    <FontAwesomeIcon icon={faHome} className="fa-facebook"></FontAwesomeIcon> Home
                </a>
            </div>
            <div className="sp-menu-item">
                <a href="/calendar">
                    <FontAwesomeIcon icon={faCalendar} className="fa-facebook"></FontAwesomeIcon> Calendrier
                </a>
            </div>
            <div className="sp-menu-item">
                <a href="/documents">
                    <FontAwesomeIcon icon={faFile} className="fa-facebook"></FontAwesomeIcon> Documents
                </a>
            </div>
            <div className="sp-menu-item">
                <a href="/formation">
                    <FontAwesomeIcon icon={faBook} className="fa-facebook"></FontAwesomeIcon> Formation
                </a>
            </div>
            <div className="sp-menu-item">
                <a href="/carrieres">
                    <FontAwesomeIcon icon={faIdBadge} className="fa-facebook"></FontAwesomeIcon> Carrière
                </a>
            </div>
            <div className="sp-menu-item">
                <a href="/galerie">
                    <FontAwesomeIcon icon={faImages} className="fa-facebook"></FontAwesomeIcon> Galerie
                </a>
            </div>
            <div className="sp-menu-item">
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
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasRight;
