"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../components/outside-click";
import devs from '../app/img/devs-logo.jpg';
import edc from '../app/img/edc.png';
import leo from '../app/img/leo.jpg';
import yrc from '../app/img/yrclogo.jpg';
import yuva from '../app/img/yuva.png';
import int from '../app/img/int.png';

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex justify-center items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden flex items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 md:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col justify-between p-4">
                <div>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`button-${active.title}-${id}`}
                  href={active.ctaLink}
                  target="_blank"
                  className="mt-4 inline-block px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                >
                  {active.ctaText}
                </motion.a>
              </div>
              <div className="relative px-4 pb-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit flex flex-col gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-20 w-20 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "HURSUN",
    title: "DEVS",
    src: devs,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        A Developers Club is a student-run organization or community group focused on software development, coding, and technology. These clubs are typically found in educational institutions like universities, colleges, and even high schools, but they can also exist as independent community groups. The primary goal of a Developers Club is to bring together individuals interested in programming, technology, and software development to learn, collaborate, and innovate.
      </p>
    ),
  },
  {
    description: "Babbu Maan",
    title: "YUVA",
    src: yuva,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        A Yuva Club is typically a youth-oriented organization aimed at engaging young people in community service, personal development, and social awareness activities. The word "Yuva" means "youth" in several Indian languages, and these clubs are often established to harness the energy and potential of young individuals for constructive purposes. The exact nature of a Yuva Club can vary depending on the region or organization.
      </p>
    ),
  },
  {
    description: "Metallica",
    title: "YRC",
    src: yrc,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        The Youth Red Cross (YRC) Club is a student-led organization that operates under the larger umbrella of the International Red Cross and Red Crescent Movement. Its primary focus is on humanitarian service and community engagement, with an emphasis on the values of the Red Cross, such as voluntary service, unity, and neutrality.
      </p>
    ),
  },
  {
    description: "Led Zeppelin",
    title: "EDC",
    src: edc,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        An Entrepreneurship Development Cell (EDC), often referred to as an EDC Club, is an organization typically found in educational institutions like universities and colleges. The primary objective of an EDC is to foster the entrepreneurial spirit among students by providing them with the resources, guidance, and opportunities needed to start their own businesses or ventures.
      </p>
    ),
  },
  {
    description: "Mustafa Zahid",
    title: "LEO",
    src: leo,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        A Leo Club is a youth organization sponsored by a local Lions Club, which is part of Lions Clubs International. Leo Clubs are aimed at developing leadership skills, promoting community service, and encouraging young people to become responsible citizens. The name "Leo" stands for Leadership, Experience, and Opportunity, which are the core values that the club seeks to instill in its members.
      </p>
    ),
  },
  {
    description: "Mustafa Zahid",
    title: "INTELEXA",
    src: int,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        A INTELEXA Club is a vibrant and dynamic community where individuals interested in coding and technology come together to learn, share, and create. It plays a crucial role in helping members enhance their technical skills, build a professional network, and prepare for careers in the ever-evolving tech industry.
      </p>
    ),
  },
  {
    description: "Mustafa Zahid",
    title: "GDSC",
    src: int,
    ctaText: "vote",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        A INTELEXA Club is a vibrant and dynamic community where individuals interested in coding and technology come together to learn, share, and create. It plays a crucial role in helping members enhance their technical skills, build a professional network, and prepare for careers in the ever-evolving tech industry.
      </p>
    ),
  },
];
