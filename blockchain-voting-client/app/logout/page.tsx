"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("auth");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-2xl">
      <h1>Thanks for Voting</h1>
      <p>Return to landing page in 3 seconds...</p>
    </div>
  );
};

export default Logout;
