import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Auth/Login';
import OAS_Lead from './OAS_Lead';

export default function OAS_Lead_Route() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const { exp } = JSON.parse(atob(token.split('.')[1]));
                if (exp * 1000 > Date.now()) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setLoggedIn(true);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        delete axios.defaults.headers.common['Authorization'];
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={loggedIn ? <Navigate to="/" replace /> : <Login setLoggedIn={setLoggedIn} />} />
            <Route path="/" element={loggedIn ? <OAS_Lead handleLogout={handleLogout} /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} replace />} />
        </Routes>
    );
}
