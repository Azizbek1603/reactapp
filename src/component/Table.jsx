import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plane, Clock, MapPin, Thermometer } from 'lucide-react';

const Table = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [flightData, setFlightData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (location.state && location.state.flightData) {
            setFlightData(location.state.flightData);
        } else {
            fetchFlightData();
        }
    }, [id, location.state]);

    const fetchFlightData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/flights/${id}`);
            setFlightData(response.data);
        } catch (error) {
            console.error('Error fetching flight data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!flightData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.headerTitle}>{user ? user.name : 'Flight Manager'}</h1>
                    <span style={styles.headerSubtitle}>Flight Information</span>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    <LogOut size={18} />
                    <span style={styles.logoutText}>Log out</span>
                </button>
            </header>

            <main style={styles.main}>
                <section style={styles.flightSummary}>
                    <h2 style={styles.sectionTitle}>Flight Summary</h2>
                    <div style={styles.summaryGrid}>
                        <div style={styles.summaryItem}>
                            <Plane size={24} />
                            <div>
                                <h3 style={styles.summaryItemTitle}>Flight</h3>
                                <p style={styles.summaryItemContent}>{flightData.flight_number}</p>
                            </div>
                        </div>
                        <div style={styles.summaryItem}>
                            <Clock size={24} />
                            <div>
                                <h3 style={styles.summaryItemTitle}>Departure</h3>
                                <p style={styles.summaryItemContent}>{formatDate(flightData.departure_time)}</p>
                            </div>
                        </div>
                        <div style={styles.summaryItem}>
                            <MapPin size={24} />
                            <div>
                                <h3 style={styles.summaryItemTitle}>Route</h3>
                                <p style={styles.summaryItemContent}>{flightData.departure_airport} → {flightData.arrival_airport}</p>
                            </div>
                        </div>
                        <div style={styles.summaryItem}>
                            <Thermometer size={24} />
                            <div>
                                <h3 style={styles.summaryItemTitle}>Weather</h3>
                                <p style={styles.summaryItemContent}>{flightData.weather}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.flightDetails}>
                    <h2 style={styles.sectionTitle}>Flight Details</h2>
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.tableHeader}>Airline</th>
                                <td style={styles.tableCell}>{flightData.airline}</td>
                                <th style={styles.tableHeader}>Aircraft</th>
                                <td style={styles.tableCell}>{flightData.aircraft.aircraft_type}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Departure</th>
                                <td style={styles.tableCell}>{flightData.departure_airport}, {flightData.departure_country}</td>
                                <th style={styles.tableHeader}>Arrival</th>
                                <td style={styles.tableCell}>{flightData.arrival_airport}, {flightData.arrival_country}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Departure Time</th>
                                <td style={styles.tableCell}>{formatDate(flightData.departure_time)}</td>
                                <th style={styles.tableHeader}>Arrival Time</th>
                                <td style={styles.tableCell}>{formatDate(flightData.arrival_time)}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Duration</th>
                                <td style={styles.tableCell}>{flightData.duration}</td>
                                <th style={styles.tableHeader}>Status</th>
                                <td style={styles.tableCell}>{flightData.status}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Price</th>
                                <td style={styles.tableCell}>${flightData.price.toFixed(2)}</td>
                                <th style={styles.tableHeader}>Fuel Schedule</th>
                                <td style={styles.tableCell}>{flightData.fuelSchedule}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section style={styles.crewInfo}>
                    <h2 style={styles.sectionTitle}>Crew Information</h2>
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.tableHeader}>Pilot</th>
                                <td style={styles.tableCell}>{flightData.cruwSchedule.pilot}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Co-Pilot</th>
                                <td style={styles.tableCell}>{flightData.cruwSchedule.co_pilot}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Cabin Crew</th>
                                <td style={styles.tableCell}>{flightData.cruwSchedule.cabin_crew}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Crew Rest Period</th>
                                <td style={styles.tableCell}>{flightData.cruwSchedule.crew_rest_period}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section style={styles.groundService}>
                    <h2 style={styles.sectionTitle}>Ground Service</h2>
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.tableHeader}>Runway</th>
                                <td style={styles.tableCell}>{flightData.gruondService.runaway}</td>
                                <th style={styles.tableHeader}>Gate</th>
                                <td style={styles.tableCell}>{flightData.gruondService.gate}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Taxi</th>
                                <td style={styles.tableCell}>{flightData.gruondService.taxi}</td>
                                <th style={styles.tableHeader}>Bus</th>
                                <td style={styles.tableCell}>{flightData.gruondService.bus}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Terminal</th>
                                <td style={styles.tableCell}>{flightData.gruondService.terminal}</td>
                                <th style={styles.tableHeader}>Cargo</th>
                                <td style={styles.tableCell}>{flightData.cargoDetails}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section style={styles.restInfo}>
                    <h2 style={styles.sectionTitle}>Rest Information</h2>
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.tableHeader}>Hotel</th>
                                <td style={styles.tableCell}>{flightData.restInformation.name}</td>
                                <th style={styles.tableHeader}>Address</th>
                                <td style={styles.tableCell}>{flightData.restInformation.address}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Rooms</th>
                                <td style={styles.tableCell}>{flightData.restInformation.rooms}</td>
                                <th style={styles.tableHeader}>Amenities</th>
                                <td style={styles.tableCell}>{flightData.restInformation.amenities}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Registered Pilot</th>
                                <td style={styles.tableCell}>{flightData.restInformation.registred_pilot}</td>
                                <th style={styles.tableHeader}>Duration</th>
                                <td style={styles.tableCell}>{flightData.restInformation.duration}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Start Time</th>
                                <td style={styles.tableCell}>{formatDate(flightData.restInformation.startTime)}</td>
                                <th style={styles.tableHeader}>End Time</th>
                                <td style={styles.tableCell}>{formatDate(flightData.restInformation.endTime)}</td>
                            </tr>
                            <tr>
                                <th style={styles.tableHeader}>Managed By</th>
                                <td style={styles.tableCell}>{flightData.restInformation.managedBy}</td>
                                <th style={styles.tableHeader}>Contact</th>
                                <td style={styles.tableCell}>{flightData.restInformation.managedByContact}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
    },
    header: {
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    headerTitle: {
        margin: 0,
        fontSize: '1.5rem',
    },
    headerSubtitle: {
        fontSize: '0.9rem',
        opacity: 0.8,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: '1px solid #ecf0f1',
        color: '#ecf0f1',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        width: "unset",
    },
    logoutText: {
        marginLeft: '0.5rem',
    },
    main: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    sectionTitle: {
        color: '#2c3e50',
        borderBottom: '2px solid #3498db',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
    },
    flightSummary: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    summaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
    },
    summaryItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    summaryItemTitle: {
        margin: '0 0 0.25rem 0',
        fontSize: '0.9rem',
        color: '#7f8c8d',
    },
    summaryItemContent: {
        margin: 0,
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    flightDetails: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '1rem',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        padding: '0.75rem',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '2px solid #ddd',
    },
    tableCell: {
        padding: '0.75rem',
        borderBottom: '1px solid #ddd',
    },
    crewInfo: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    groundService: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    restInfo: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

export default Table;

