"use client";

import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../context/AuthContext';

export default function ClientProviders({ children }) {
    return (
        <AuthContextProvider>
        <Navbar />
        {children}
        </AuthContextProvider>
    );
}