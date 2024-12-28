import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import CreateFlightModal from './CreateFlightModal';

const FlightManager = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [flights, setFlights] = useState([]);
    const [sortColumn, setSortColumn] = useState('departure_time');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:3000/flights');
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    const formatDate = (dateString) => {
        const options = {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedFlights = [...flights].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleCreateFlight = async (flightData) => {
        try {
            const response = await axios.post('http://localhost:3000/flights', flightData);
            setFlights([...flights, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating flight:', error);
        }
    };

    const handleRowClick = (flight) => {
        navigate(`/table/${flight._id}`, { state: { flightData: flight } });
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.headerTitle}>{user ? user.name : 'Flight Manager'}</h1>
                    <span style={styles.headerSubtitle}>Flight Manager Dashboard</span>
                </div>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    <LogOut size={18} />
                    <span style={styles.logoutText}>Log out</span>
                </button>
            </header>

            <main style={styles.main}>
                <div style={styles.actionBar}>
                    <h2 style={styles.sectionTitle}>Flight Information</h2>
                    {user?.role === "Supervisor" &&
                        <button style={styles.createButton} onClick={() => setIsModalOpen(true)}>
                            <PlusCircle size={18} />
                            <span style={styles.createButtonText}>Create Flight</span>
                        </button>}
                </div>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {["N",'Flight', 'Airline', 'Departure', 'Arrival', 'Status', 'Aircraft'].map((header) => (
                                    <th
                                        key={header}
                                        style={styles.tableHeader}
                                        onClick={() => handleSort(header.toLowerCase())}
                                    >
                                        {header}
                                        {sortColumn === header.toLowerCase() && (
                                            sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFlights.map((flight, index) => (
                                <tr
                                    key={flight._id}
                                    style={{ ...styles.tableRow, ...(index % 2 === 0 ? styles.evenRow : styles.oddRow) }}
                                    onClick={() => handleRowClick(flight)}
                                >
                                    <td style={styles.tableCell}>{index+1}</td>
                                    <td style={styles.tableCell}>{flight.flight_number}</td>
                                    <td style={styles.tableCell}>{flight.airline}</td>
                                    <td style={styles.tableCell}>
                                        {flight.departure_airport}, {flight.departure_country}<br />
                                        {formatDate(flight.departure_time)}
                                    </td>
                                    <td style={styles.tableCell}>
                                        {flight.arrival_airport}, {flight.arrival_country}<br />
                                        {formatDate(flight.arrival_time)}
                                    </td>
                                    <td style={styles.tableCell}>
                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: getStatusColor(flight.status)
                                        }}>
                                            {flight.status}
                                        </span>
                                    </td>
                                    <td style={styles.tableCell}>{flight.aircraft.aircraft_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <CreateFlightModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateFlight}
            />
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Scheduled': return '#3498db';
        case 'On Time': return '#2ecc71';
        case 'Delayed': return '#e74c3c';
        case 'Boarding': return '#f39c12';
        case 'Departed': return '#9b59b6';
        default: return '#95a5a6';
    }
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
        width: "unset"
    },
    logoutText: {
        marginLeft: '0.5rem',
    },
    main: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    actionBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    sectionTitle: {
        color: '#2c3e50',
        margin: 0,
    },
    createButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
        width: "unset"
    },
    createButtonText: {
        marginLeft: '0.5rem',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        padding: '0.75rem',
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#2c3e50',
        borderBottom: '2px solid #ddd',
        cursor: 'pointer',
        userSelect: 'none',
    },
    tableCell: {
        padding: '0.75rem',
        borderBottom: '1px solid #ddd',
    },
    evenRow: {
        backgroundColor: '#f8f9fa',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    statusBadge: {
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '0.8rem',
    },
    tableRow: {
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default FlightManager;

