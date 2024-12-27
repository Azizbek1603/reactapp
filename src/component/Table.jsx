// import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

const Table = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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
        <div>
            <div className="header">
                <strong>{user ? user.name : 'NAME'}</strong>
                <div className="user-details">
                    <span>Flight Information</span>
                </div>
                <div className="user-info">
                    <div className="log-out" onClick={handleLogout}>Log out</div>
                    {/* <div className="log-out">Create flight</div> */}
                </div>
            </div>

            <div className="section-title">Flight Information</div>
            <table className="table">
                <tbody>
                    <tr><td>Flight Number:</td></tr>
                    <tr><td>Departure Airport:</td></tr>
                    <tr><td>Departure Country:</td></tr>
                    <tr><td>Arrival Country:</td></tr>
                    <tr><td>Airline:</td></tr>
                    <tr><td>Duration:</td></tr>
                    <tr><td>Arrival Airport:</td></tr>
                    <tr><td>Scheduled Departure Time:</td></tr>
                    <tr><td>Scheduled Arrival Time:</td></tr>
                    <tr><td>Status:</td></tr>
                    <tr><td>Flight Route:</td></tr>
                </tbody>
            </table>

            <div className="section-title">Crew Scheduling</div>
            <table className="table">
                <tbody>
                    <tr><td>Pilot Name:</td></tr>
                    <tr><td>Co-Pilot Name:</td></tr>
                    <tr><td>Cabin Crew:</td></tr>
                    <tr><td>Crew Rest Periods: [Checkbox]</td></tr>
                </tbody>
            </table>

            <div className="section-title">Ground Services</div>
            <table className="table">
                <tbody>
                    <tr><td>Runaway:</td></tr>
                    <tr><td>Gate:</td></tr>
                    <tr><td>Taxi:</td></tr>
                    <tr><td>Bus:</td></tr>
                    <tr><td>Terminal:</td></tr>
                </tbody>
            </table>

            <div className="section-title">Flight Information</div>
            <table className="table">
                <tbody>
                    <tr><td>Check-in Desk:</td></tr>
                    <tr><td>Security Screening: [Checkbox]</td></tr>
                    <tr><td>Baggage Handling: [Checkbox]</td></tr>
                    <tr><td>Fueling Scheduled:</td></tr>
                    <tr><td>Catering Scheduled: [Checkbox]</td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
