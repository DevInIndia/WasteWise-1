"use client";

import Header from '../components/Header';
import { AuthContextProvider } from '../context/AuthContext';

export default function ClientProviders({ children }) {
    return (
        <AuthContextProvider>
        <Header />
        {children}
        </AuthContextProvider>
    );
}