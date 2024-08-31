"use client"; // Ensure this is a client-side component
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logo from '../app/img/indian.jpg';
import flag from '../app/img/logo.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [nftToken, setNftToken] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/', {
        username,
        nft_token: nftToken,
        email,
      });

      if (res.data.step === 2) {
        setStep(2);
        setOtp(res.data.otp);
        setInfo('');
      } else {
        setInfo(res.data.info || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setInfo('An error occurred during login.');
    }
  };

  const handleOtpVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/verify_otp', {
        otp,
        original_otp: otp,
        username,
        email,
      });

      if (res.data.success) {
        router.push('/dashboard');
      } else {
        setInfo('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      setInfo('An error occurred during OTP verification.');
    }
  };

  return (
    <div className="flex min-h-screen bg-hero bg-cover">
      {/* Right side with the login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 drop-shadow-2xl">
        <div className="w-full max-w-md p-9 space-y-20 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-blue-500 border-solid border-2 border-sky-500">
          <h1 className="text-4xl font-bold text-center text-white">Sign In</h1>
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white-700">Voter ID</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                  placeholder="e.g., WEYGTTEFGGT"
                />
              </div>
              <div>
                <label htmlFor="nftToken" className="block text-sm font-medium text-white-700">NFT TOKEN</label>
                <input
                  type="text"
                  id="nftToken"
                  value={nftToken}
                  onChange={(e) => setNftToken(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                  placeholder="e.g., 0xdc3752e18aA8dE0691184BB86Cb6F84AA2601bbC"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                  placeholder="e.g., example@gmail.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border-2 my-8 border-blue-600 bg-blue-600 text-white font-semibold rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </button>
              {info && <p className="text-center text-sm text-white">{info}</p>}
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleOtpVerification}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-white-700">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border-2 my-8 border-blue-600 bg-blue-600 text-white font-semibold rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
              {info && <p className="text-center text-sm text-white">{info}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;