// Importation des modules nécessaires
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/Formulaire/EventForm.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Redirect, useNavigate} from 'react-router-dom';

// Définition du composant EventForm
const EventForm = () => {
    // Définition des états
    const [title, setTitle] = useState('');
    const [debut, setDebut] = useState('');
    const [fin, setFin] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [calendars, setCalendars] = useState([]);
    const [recurrency, setRecurrence] = useState(false);
    const [frequency, setFrequency] = useState('3');
    const [count, setCount] = useState('1');
    const [interval, setInterval] = useState('1');

    // Check for access and is_staff
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');
    const isStaff = localStorage.getItem('is_staff') === 'true';

    if (!accessToken || !isStaff) {
        navigate('/'); // Redirect to a not-authorized page or any other page of your choice
    }

    useEffect(() => {
        axios.get('http://localhost:8010/api/EventManager Calendrier /')
            .then(response => {
                setCalendars(response.data);
            })
            .catch(error => {
                console.error("Error fetching calendars:", error);
            });
    }, []);

    // Gestion de la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post('http://localhost:8010/api/EventManager Event/', {
                title,
                Debut: debut,
                Fin: fin,
                location,
                description,
                category,
                recurrency,
                frequency,
                count,
                interval,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Rendu du composant
    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-label">
                        Titre :
                        <input
                            className="form-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            title="Saisissez le titre de l'événement ici."
                        />
                    </label>
                    <br/>
                    <label className="form-label">
                        Lieu :
                        <input
                            className="form-input"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            title="Saisissez lieu et/ou la salle de l'événement"
                        />
                    </label>
                </div>
                <div className="form-col">
                    <label className="form-label">
                        Début :
                        <input
                            className="form-input"
                            type="datetime-local"
                            value={debut}
                            onChange={(e) => setDebut(e.target.value)}
                            title="Saisissez la date et l'heure de début de l'événement"
                        />
                    </label>
                    <br/>
                    <label className="form-label">
                        Fin :
                        <input
                            className="form-input"
                            type="datetime-local"
                            value={fin}
                            onChange={(e) => setFin(e.target.value)}
                            title="Saisissez la date et l'heure de fin de l'événement"
                        />
                    </label>
                </div>
            </div>
            <label className="form-label">
                Description :
                <ReactQuill
                    className="form-input"
                    value={description}
                    onChange={setDescription}
                />
            </label>
            <br/>
            <div className="form-row">
                <div className="form-col">
                    <label className="form-label">
                        Calendrier :
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            title="Sélectionnez le calendrier de l'événement"
                        >
                            <option value="">Sélectionnez un calendrier</option>
                            {calendars.map(calendar => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-col">
                    <div className="form-checkbox">
                        <input
                            type="checkbox"
                            checked={recurrency}
                            onChange={(e) => setRecurrence(e.target.checked)}
                            title="Cliquez pour définir une récurrence pour cet événement"
                        />
                        <label className="form-label-checkbox">Récurrence</label>
                    </div>
                </div>
            </div>

            {recurrency && (
                <div className="form-row">
                    <div className="form-col">
                        <label className="form-label">
                            Fréquence :
                            <select
                                className="form-select"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                title="Sélectionnez la fréquence de l'événement"
                            >
                                <option value="">Sélectionnez une fréquence</option>
                                <option value="3">Quotidien</option>
                                <option value="2">Hebdomadaire</option>
                                <option value="1">Mensuel</option>
                                <option value="0">Annuel</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-col">
                        <label className="form-label">
                            Count :
                            <input className="form-input" type="number" value={count}
                                   onChange={(e) => setCount(e.target.value)}/>
                        </label>
                    </div>
                    <div className="form-col">
                        <label className="form-label">
                            Intervalle :
                            <input className="form-input" type="number" value={interval}
                                   onChange={(e) => setInterval(e.target.value)}/>
                        </label>
                    </div>
                </div>
            )}

            <div className="form-row">
                <div className="form-col">
                    <button
                        className="form-button"
                        type="submit"
                        disabled={
                            !title ||
                            !debut ||
                            !fin ||
                            !location ||
                            !description ||
                            !category ||
                            (recurrency && (!frequency || !count || !interval))
                        }
                    > Enregistrer
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EventForm;
