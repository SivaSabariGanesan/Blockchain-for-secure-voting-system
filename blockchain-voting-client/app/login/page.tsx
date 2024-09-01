"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from 'axios';
import { ContainerScroll } from "../../components/container-scroll-animation";
import { ExpandableCardDemo } from "../../components/ExpandableDemoCard";

export default function HeroScrollDemo() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [nftToken, setNftToken] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [originalOtp, setOriginalOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/send_otp', {
        username,
        nft_token: nftToken,
        email,
      });
      if (response.status === 200) {
        setOtp(response.data.otp);
        setOriginalOtp(response.data.otp);
        setStep(2);
      }
    } catch (error) {
      setError('Invalid Username or NFT Token');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/verify_otp', {
        otp,
        original_otp: originalOtp,
        username,
      });
      if (response.status === 200) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <Image
              className="rounded-full float-left border-solid border-2 border-black"
              src="/images/flag.png"
              alt="Description of the image"
              width={200}
              height={100}
            />
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Let's vote for Future India!<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                <span className="text-orange-500">Indian</span> <span>Voting</span> <span className="text-green-500">System</span>
              </span>
            </h1>
          </>
        }
      >
        {step === 1 ? (
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nftToken" className="block text-sm font-medium text-white">NFT Token</label>
                <input
                  type="text"
                  id="nftToken"
                  value={nftToken}
                  onChange={(e) => setNftToken(e.target.value)}
                  className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                Send OTP
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-blue-500 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-white">OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                Verify OTP
              </button>
            </form>
          </div>
        )}
        <ExpandableCardDemo />
        <button className="mt-4 py-2 px-4 bg-green-600 text-white rounded-md">
          Result
        </button>
      </ContainerScroll>
    </div>
  );
}
