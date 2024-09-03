"use client"; // Ensure this is a client-side component
import React, { useState } from 'react';
import Link from 'next/link';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    nft_token: '',
    email: '',
    otp: '',
    original_otp: ''
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      // Send OTP
      try {
        const res = await fetch('http://localhost:5001/api/send_otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            nft_token: formData.nft_token,
            email: formData.email
          })
        });

        const data = await res.json();
        if (res.ok) {
          setFormData({ ...formData, original_otp: data.otp });
          setStep(2);
        } else {
          setError(data.error || 'Failed to send OTP. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error sending OTP. Please try again.');
      }
    } else if (step === 2) {
      // Verify OTP
      try {
        const res = await fetch('http://localhost:5001/api/verify_otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            otp: formData.otp,
            original_otp: formData.original_otp
          })
        });

        const data = await res.json();
        if (res.ok) {
          // OTP verified, redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          setError(data.error || 'Invalid OTP. Please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error verifying OTP. Please try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-hero bg-cover">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-9 space-y-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center">Sign In</h1>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">
                    Voter ID
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="e.g., wuj2264831"
                  />
                </div>

                <div>
                  <label htmlFor="nft_token" className="block text-sm font-medium">
                    NFT Token
                  </label>
                  <input
                    type="text"
                    id="nft_token"
                    name="nft_token"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    value={formData.nft_token}
                    onChange={handleInputChange}
                    placeholder="e.g., NFT_TOKEN_123"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., example@gmail.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 mt-6 bg-blue-600 text-white rounded-md"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter OTP sent to your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 mt-6 bg-blue-600 text-white rounded-md"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
