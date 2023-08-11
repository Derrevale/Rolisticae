// Importation des modules nécessaires
import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../../styles/Appointment/AppointmentList.css';

// Définition du composant AppointmentList
function AppointmentList() {
    // Utilisation du Hook d'état pour stocker les rendez-vous
    const [appointments, setAppointments] = useState([]);

    // Utilisation du Hook d'effet pour récupérer les rendez-vous lors du montage du composant
    useEffect(() => {
        // Utilisation d'axios pour effectuer une requête GET à l'API
        axios.get("http://localhost:8010/api/Appointment Date/")
            // Mise à jour de l'état des rendez-vous avec les données reçues
            .then((response) => setAppointments(response.data))
            // Journalisation des erreurs éventuelles
            .catch((error) => console.log(error));
    }, []);

    // Fonction pour voter pour une date de rendez-vous
    function vote(dateId) {
        // Utilisation d'axios pour effectuer une requête POST à l'API
        axios.post('http://localhost:8010/api/Appointment Votes/', { appointment_date: dateId })
            // Journalisation des données de réponse
            .then(response => console.log(response.data))
            // Journalisation des erreurs éventuelles
            .catch(error => console.error(error));
    }

    // Rendu du composant
    return (
        <section className="row row-1 cols-3">
            {/* Mappage des rendez-vous pour les afficher */}
            {appointments.map((appointment) => (
                <div className="col-lg-4" key={appointment.id}>
                    <div className="appointmentList-item">
                        <div className="appointment-header">
                            <h2 className="appointmentList-title">{appointment.name}</h2>
                        </div>
                        <div className="appointment-content">
                            <div dangerouslySetInnerHTML={{__html: appointment.description}}></div>
                            {/* Mappage des dates de rendez-vous pour les afficher */}
                            {appointment.dates.map(date => (
                                <div key={date.id}>
                                    <p>{date.date} {date.start_time}-{date.end_time}</p>
                                    {/* Bouton pour voter pour une date */}
                                    <button onClick={() => vote(date.id)}>Vote</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

// Exportation du composant AppointmentList
export default AppointmentList;
