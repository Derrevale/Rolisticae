import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../../styles/AppointmentList.css';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/Appointment Date/")
            .then((response) => setAppointments(response.data))
            .catch((error) => console.log(error));
    }, []);

    function vote(dateId) {
        axios.post('http://localhost:8000/api/Appointment Votes/', { appointment_date: dateId })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }

    return (
        <section className="row row-1 cols-3">
            {appointments.map((appointment) => (
                <div className="col-lg-4" key={appointment.id}>
                    <div className="appointmentList-item">
                        <div className="appointment-header">
                            <h2 className="appointmentList-title">{appointment.name}</h2>
                        </div>
                        <div className="appointment-content">
                            <div dangerouslySetInnerHTML={{__html: appointment.description}}></div>
                            {appointment.dates.map(date => (
                                <div key={date.id}>
                                    <p>{date.date} {date.start_time}-{date.end_time}</p>
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

export default AppointmentList;
