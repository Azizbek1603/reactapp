import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
// import './PilotCalendar.css';

const PilotCalendar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const events = {
        3: 'Flight 1023 - Departure: 10:00 AM',
        12: 'Flight 2045 - Arrival: 3:00 PM',
        13: 'Flight 3056 - Maintenance',
        17: 'Flight 4078 - Departure: 9:00 AM',
        18: 'Flight 5090 - Scheduled Rest',
        27: 'Flight 6012 - Training Session'
    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    return (
        <div className="calendar-container">
            <div className="header-c">
                <strong>{user ? user.name : 'Pilot Name'}</strong>
                <span>Pilot</span>
                <div className="user-info">
                    <div className="log-out" onClick={handleLogout}>Log out</div>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-header">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="day-label">{day}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {days.map(day => (
                        <div key={day} className={`calendar-day ${day === 18 ? 'highlight' : ''}`}>
                            <span>{day}</span>
                            {events[day] && <div className="event">{events[day]}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PilotCalendar;