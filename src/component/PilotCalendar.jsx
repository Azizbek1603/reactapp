import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import './PilotCalendar.css';

const PilotCalendar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const changeMonth = (increment) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + increment);
            return newDate;
        });
    };

    const events = {
        3: 'LH881 - Delayed (GRU to HND)',
        5: 'AI465 - Cancelled (SYD to DXB)',
        8: 'BA108 - Delayed (CDG to GRU)',
        12: 'UA910 - Scheduled (GRU to LHR)',
        14: 'LH386 - Delayed (DXB to HND)',
        16: 'DL416 - Scheduled (SYD to JFK)',
        23: 'AI670 - Scheduled (DXB to LHR)',
        27: 'UA565 - Cancelled (LHR to FRA)',
        30: 'LH584 - Scheduled (DXB to CDG)'
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

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
        <div style={styles.calendarContainer}>
            <div style={styles.header}>
                <strong style={styles.userName}>{user ? user.name : 'Pilot Name'}</strong>
                <span style={styles.userRole}>Pilot</span>
                <div style={styles.userInfo}>
                    <div style={styles.logOut} onClick={handleLogout}>Log out</div>
                </div>
            </div>
            <div style={styles.calendar}>
                <div style={styles.monthYearHeader}>
                    <ChevronLeft style={styles.arrow} onClick={() => changeMonth(-1)} />
                    <h2 style={styles.monthYear}>
                        {currentDate.toLocaleString('default', { month: 'long' })} {year}
                    </h2>
                    <ChevronRight style={styles.arrow} onClick={() => changeMonth(1)} />
                </div>
                <div style={styles.calendarHeader}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} style={styles.dayLabel}>{day}</div>
                    ))}
                </div>
                <div style={styles.calendarGrid}>
                    {emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} style={styles.emptyDay}></div>
                    ))}
                    {days.map(day => (
                        <div
                            key={day}
                            style={{
                                ...styles.calendarDay,
                                ...(day === today && month === currentMonth && year === currentYear ? styles.highlight : {})
                            }}
                        >
                            <span style={styles.dayNumber}>{day}</span>
                            {events[day] && (
                                <div
                                    style={styles.event}
                                    onClick={() => navigate("/table")}
                                >
                                    {events[day]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const styles = {
    calendarContainer: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#4a90e2',
        color: 'white',
        borderRadius: '10px',
    },
    userName: {
        fontSize: '24px',
    },
    userRole: {
        fontSize: '16px',
        opacity: '0.8',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    logOut: {
        cursor: 'pointer',
        padding: '5px 10px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    calendar: {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    },
    monthYearHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#4a90e2',
        color: 'white',
    },
    monthYear: {
        margin: '0',
        fontSize: '24px',
    },
    arrow: {
        cursor: 'pointer',
        fontSize: '24px',
        transition: 'transform 0.2s',
    },
    calendarHeader: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        backgroundColor: '#e6f2ff',
        padding: '10px 0',
    },
    dayLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4a90e2',
    },
    calendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        backgroundColor: '#e6e6e6',
    },
    calendarDay: {
        minHeight: '100px',
        padding: '10px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s',
    },
    emptyDay: {
        backgroundColor: '#f9f9f9',
    },
    dayNumber: {
        alignSelf: 'flex-end',
        fontSize: '14px',
        color: '#666',
    },
    highlight: {
        backgroundColor: '#fffacd',
        fontWeight: 'bold',
    },
    event: {
        marginTop: '5px',
        padding: '5px',
        backgroundColor: '#4a90e2',
        color: 'white',
        borderRadius: '3px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};


export default PilotCalendar;