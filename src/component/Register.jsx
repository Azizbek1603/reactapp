import { useState } from 'react';
import axios from 'axios';
import "./register.css";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const airlineAddresses = {
        "Uzbekistan Airways": "Tashkent International Airport",
        "Air Astana": "Almaty and Nur-Sultan Airports",
        "Somon Air": "Dushanbe International Airport",
        "SCAT Airlines": "Shymkent and other regional airports",
        "Avia Traffic Company": "Bishkek Manas International Airport",
        "Turkmenistan Airlines": "Ashgabat International Airport",
    };
    const notify = (text) => toast(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        // pauseOnHover: true,
        // draggable: true,
        theme: "light",
    });

    const [selectedAirline, setSelectedAirline] = useState('');
    const [airportAddress, setAirportAddress] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        role: '',
        phone: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
    });

    const handleAirlineChange = (e) => {
        const airline = e.target.value;
        setSelectedAirline(airline);
        setAirportAddress(airlineAddresses[airline] || '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, birthday, role, phone, email, login, password, confirmPassword } = formData;

        if (!name || !birthday || !role || !phone || !email || !login || !password || !confirmPassword) {
            toast.warn('Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            notify('Passwords do not match.');
            return;
        }

        const dataToSend = {
            name,
            age: new Date().getFullYear() - new Date(birthday).getFullYear(),
            role,
            airwaysName: selectedAirline,
            airwaysAddress: airportAddress,
            phone,
            email,
            login,
            password
        };

        try {
            const response = await axios.post('http://localhost:3000/pilots', dataToSend);
            toast.success("Successfully Registered")
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.errorResponse.errmsg)
            console.log(error)
        }
    };

    return (<>
        <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Register</h1>
            </div>
            <form className="mt-8 space-y-6 form-wrap" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input id="name" name="name" type="text" required className="input-field" placeholder="Name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="birthday" className="sr-only">Birthday</label>
                        <input id="birthday" name="birthday" type="date" required className="input-field" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="role" className="sr-only">Role</label>
                        <select id="role" name="role" required className="input-field" onChange={handleChange}>
                            <option hidden defaultValue>Select Role</option>
                            <option>Pilot</option>
                            <option>ATC Manager</option>
                            <option>Flight Maneger</option>
                            <option>Airport Supervisor</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="airline" className="sr-only">Airline</label>
                        <select
                            id="airline"
                            className="input-field"
                            value={selectedAirline}
                            onChange={handleAirlineChange}
                        >
                            <option hidden defaultValue>Select Airline</option>
                            {Object.keys(airlineAddresses).map((airline) => (
                                <option key={airline} value={airline}>
                                    {airline}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="address" className="sr-only">Airport Address</label>
                        <input
                            type="text"
                            id="address"
                            className="input-field"
                            value={airportAddress}
                            readOnly
                            placeholder="Airport Address"
                        />
                    </div>
                </div>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="phone" className="sr-only">Phone</label>
                        <input id="phone" name="phone" type="tel" required className="input-field" placeholder="Phone" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input id="email" name="email" type="email" required className="input-field" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="login" className="sr-only">Login</label>
                        <input id="login" name="login" type="text" required className="input-field" placeholder="Login" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="input-field" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="conf-pass" className="sr-only">Confirm Password</label>
                        <input id="conf-pass" name="confirmPassword" type="password" required className="input-field" placeholder="Confirm Password" onChange={handleChange} />
                    </div>
                </div>
            </form>
                <button type="submit" className="button" onClick={handleSubmit}>Register</button>
        </div>
        <ToastContainer />
    </>
    );
}

export default Register;
