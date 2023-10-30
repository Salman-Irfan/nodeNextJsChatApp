"use client"
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

const HomeView = () => {
    const router = useRouter();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/pages/auth/login'); // Redirect to the login page if token is missing
        }
    }, [router]);
    return (
        <>
            <main>
                <h1>Show Logged in User Name here</h1>
            </main>
        </>
    )
}

export default HomeView