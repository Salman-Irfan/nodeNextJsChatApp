"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: null // Set the image field to null initially
    });
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Redirect to another page if the token exists
            router.push('/');
        }
    }, [router]);
    const handleInputChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', data,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the appropriate Content-Type for file upload
                },
            });
            if(response.data){
                // Redirect to the login page upon successful registration
                router.push('/pages/auth/login');
            }
            // Handle the response or perform additional actions as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error cases here
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="text-white">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-md px-4 py-2 text-white font-bold hover:from-blue-500 hover:to-blue-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
