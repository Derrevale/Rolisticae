// Importation des modules nécessaires
import {RRule, rrulestr} from 'rrule';
import moment from "moment";
import 'moment-timezone';
import config from "../config";

// Fonction asynchrone pour récupérer les événements
const getEvents = async (category) => {
    try {
        // Faire une requête à l'API pour récupérer les données
        const response = await fetch(`${config.API_ENDPOINT}/EventManager Event/`);
        // Convertir la réponse en JSON
        const data = await response.json();
        // Initialiser un tableau vide pour stocker les événements
        const events = [];

        // Parcourir chaque événement dans les données
        data.forEach((event) => {
            // Si la catégorie de l'événement correspond à la catégorie demandée
            if (event.category === category) {
                // Si l'événement n'est pas récurrent
                if (!event.recurrency) {
                    // Ajouter l'événement au tableau des événements
                    events.push({
                        id: event.id,
                        title: event.title,
                        start: moment.utc(event.Debut).toDate(),
                        end: moment.utc(event.Fin).toDate(),
                        allDay: false,
                        description: event.description,
                        location: event.location,
                        category: event.category,
                    });
                } else {
                    // Si l'événement est récurrent, créer une règle de récurrence
                    const rule = event.rrule.replace(/DTSTART=\d{8}T\d{6}/, match => `DTSTART=${moment.utc(match.slice(8), "YYYYMMDDTHHmmss").format("YYYYMMDDTHHmmss")}Z`);
                    const ruleObj = rrulestr(rule);
                    // Obtenir toutes les occurrences de l'événement
                    const allOccurrences = ruleObj.all((date, i) => i < event.count);
                    // Pour chaque occurrence, ajouter un événement au tableau des événements
                    allOccurrences.forEach((occurrence) => {
                        events.push({
                            id: event.id,
                            title: event.title,
                            start: moment.utc(occurrence).toDate(),
                            end: moment.utc(occurrence.getTime() + (moment.utc(event.Fin).toDate().getTime() - moment.utc(event.Debut).toDate().getTime())).toDate(),
                            allDay: false,
                            description: event.description,
                            location: event.location,
                            category: event.category,
                        });
                    });
                }
            }
        });
        // Retourner le tableau des événements
        return events;
    } catch (error) {
        // En cas d'erreur, afficher l'erreur et retourner un tableau vide
        console.error(error);
        return [];
    }
};

// Exporter la fonction getEvents
export default getEvents;
