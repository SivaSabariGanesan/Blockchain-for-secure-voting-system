"use client";
import React from "react";
import Image from "next/image";
import flag from "../app/img/electionlogo.png"
import { ContainerScroll } from "../../components/container-scroll-animation";

import { ExpandableCardDemo } from "../../components/ExpandableDemoCard"; // Adjust the import path as necessary

export  default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
              <Image className="rounded-full float-left border-solid border-solid border-2 border-black"
              src={flag} // The path to your image file
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
        <button>Result</button>
      </ContainerScroll>
      
    </div>
  );
  
}
