"use client"; // Ensure this is a client-side component
//import Image from 'next/image';
import React, { useState } from 'react';
//import Link from 'next/link';
import axios from 'axios';

import { useRouter } from 'next/navigation';

//import logo from '../app/img/indian.jpg'
//import flag from '../app/img/logo.png'

export const Login: React.FC = () => {
  const [voterId, setVoterId] = useState('');
  const [nftToken, setNftToken] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  // const navigateToDashboard = () => {
  //   router.push('/dashboard');
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Clear any previous error

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        voterId,
        nftToken,
        email,
      });
      

      if (response.data.success) {
        // Navigate to the dashboard if the login is successful
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-hero bg-cover">
      {/* Left side with the image */}
      <div className="hidden md:block w-1/2 relative"></div>

      {/* Right side with the login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 drop-shadow-2xl">
        <div className="w-full max-w-md p-9 space-y-20 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-blue-500 border-solid border-2 border-sky-500">
          <h1 className="text-4xl font-bold text-center text-gray-800">Sign In</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="voterId" className="block text-sm font-medium text-white-700">Voter Id</label>
              <input
                type="text"
                id="voterId"
                name="voterId"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                placeholder="eg.WEYGTTEFGGT"
              />
            </div>
            <div>
              <label htmlFor="nftToken" className="block text-sm font-medium text-white-700">NFT TOKEN</label>
              <input
                type="text"
                id="nftToken"
                name="nftToken"
                value={nftToken}
                onChange={(e) => setNftToken(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                placeholder="eg.0xdc3752e18aA8dE0691184BB86Cb6F84AA2601bbC"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                placeholder="eg.example@gmail.com"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <button 
              type="submit"
              className="w-full py-2 px-4 border-2 my-8 border-blue-600 bg-blue-600 text-white font-semibold space-y-15 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            
          </form>

          <p className="text-center text-sm text-gray-600"></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
