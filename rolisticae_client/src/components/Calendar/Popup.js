// Importation des modules nécessaires
import React from "react";
import moment from "moment";
import "moment/locale/fr";

// Importation des styles CSS
import "../../styles/Calendar/Popup.css";

// Définition de la langue de Moment.js sur français
moment.locale('fr');

// Définition du composant Popup
const Popup = ({ title, start, end, description, handleClosePopup }) => {
  // Formatage des dates de début et de fin
  const startDate = moment(start).format("dddd DD MMMM YYYY, HH:mm");
  const endDate = moment(end).format("dddd DD MMMM YYYY, HH:mm");

  // Rendu du composant
  return (
    <div className="Popup">
      <div className="Popup__overlay" onClick={handleClosePopup}></div>
      <div className="Popup__content">
        <div className="Popup__header">
          <h3 className="Popup__title">{title}</h3>
          <button className="Popup__close-btn" onClick={handleClosePopup}>
            &times;
          </button>
        </div>
        <div className="Popup__body">
          <p>
            <strong>Début :</strong> {startDate}
          </p>
          <p>
            <strong>Fin :</strong> {endDate}
          </p>
          <p>
            <strong>Description :</strong>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </p>
        </div>
      </div>
    </div>
  );
};

// Exportation du composant Popup
export default Popup;
