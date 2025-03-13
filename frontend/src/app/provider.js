"use client"

import { SessionProvider } from "next-auth/react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export function Providers({children}){
    return<SessionProvider>
        <Header/>
        {children}
        <Footer/>
    </SessionProvider>
}