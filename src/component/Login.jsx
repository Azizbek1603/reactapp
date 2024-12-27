import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/pilots/login', { login, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Login Successful")
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data));
            navigateUser(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    const navigateUser = (data) => {
        if(data.role == "Pilot"){
            navigate("/pilot")
        } else if(data.role == "Flight Maneger"){
            navigate("/manager")
        }
    }

    return (
        <>
            <div className="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            LOGIN
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Login
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="input-field appearance-none rounded-none relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="input-field appearance-none rounded-none relative block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="button"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            Do not have an account?{" "}
                            <a href="/register" className="underline">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
