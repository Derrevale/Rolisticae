// Importation des modules nécessaires
import React, {Component, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'moment/locale/fr'; // Importe les fichiers de localisation français de Moment.js
import "../../styles/Calendar/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import getEvents from "./EventList";
import Popup from "./Popup";
import queryString from "query-string";

// Définit la langue de Moment.js sur français
moment.locale('fr');

// Crée un localizer pour le calendrier en utilisant Moment.js
const localizer = momentLocalizer(moment);

// Définition de la classe CalendarEvent
class CalendarEvent extends Component {
    // Initialisation de l'état du composant
    state = {
        events: [],
        showPopup: false,
        selectedEvent: null
    };

    // Méthode appelée après le montage du composant
    async componentDidMount() {
        // Récupère l'ID de l'événement à partir de l'URL
        const id = parseInt(window.location.pathname.split("/")[2]);
        // Récupère les événements pour cet ID
        const events = await getEvents(id);
        // Met à jour l'état avec les événements récupérés
        this.setState({events});
    }

    // Méthode pour gérer la sélection d'un événement
    handleSelectEvent = (event) => {
        // Met à jour l'état pour montrer le popup et stocker l'événement sélectionné
        this.setState({
            selectedEvent: event,
            showPopup: true
        });
    };

    // Méthode pour fermer le popup
    handleClosePopup = () => {
        // Met à jour l'état pour cacher le popup
        this.setState({
            showPopup: false
        });
    };

    // Méthode de rendu du composant
    render() {
        // Récupère les valeurs nécessaires de l'état
        const {events, selectedEvent, showPopup} = this.state;
        // Rend le composant
        return (
            <section className="Calendar">
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="agenda"
                    events={events}
                    style={{height: "100vh"}}
                    onSelectEvent={this.handleSelectEvent}
                />
                {showPopup && (
                    <Popup
                        title={selectedEvent.title}
                        start={selectedEvent.start}
                        end={selectedEvent.end}
                        description={selectedEvent.description}
                        handleClosePopup={this.handleClosePopup}
                    />
                )}
            </section>
        );
    }
}

// Exportation du composant CalendarEvent
export default CalendarEvent;
