"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../../components/container-scroll-animation";
import { ExpandableCardDemo } from "../../components/ExpandableDemoCard";
import { useRouter } from 'next/navigation';
import VideoFeed from "../VideoFeed/page";

export default function HeroScrollDemo() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/logout");
  };

  return (
    <div className="flex flex-col overflow-hidden">
    <VideoFeed />
      <ContainerScroll
        titleComponent={
          <>
            <Image 
              className="rounded-full float-left border-solid border-2 border-black"
              src={"/images/flag.png"}
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
        <div className="flex flex-col bg-blue-500">
          <ExpandableCardDemo />
        </div>
      </ContainerScroll>
      <button onClick={handleLogout} className="mt-4 py-2 px-4 border-2 border-red-600 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700">
          Logout
        </button>
    </div>
    
  );
}
