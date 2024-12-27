import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlightManager = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const flights = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, number: `Flight ${i + 1010}`, time: 'Scheduled Departure Time:' }));

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
        <div className="flight-container">
            <div className="header">
                <strong>{user ? user.name : 'Flight Manager'}</strong>
                <span>Flight manager</span>
                <div className="user-info">
                    <div className="log-out" onClick={handleLogout}>Log out</div>
                </div>
            </div>
            <div className="flight-list">
                {flights.map((flight, index) => (
                    <div key={flight.id} className={`flight-item ${index % 2 === 0 ? 'even' : 'odd'}`} onClick={() => navigate("/table")}>
                        <div>Flight Number: {flight.number}</div>
                        <div>{flight.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightManager;