// Import necessary libraries and components
"use client"
import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useOutsideClick } from "../components/outside-click";


// Define ExpandableCardDemo component
export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
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
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
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
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
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
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

// Define CloseIcon component
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

// Define cards data
const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Lana Del Rey, an iconic American singer-songwriter, is celebrated for
        her melancholic and cinematic music style. Born Elizabeth Woolridge
        Grant in New York City, she has captivated audiences worldwide with
        her haunting voice and introspective lyrics. <br /> <br /> Her songs
        often explore themes of tragic romance, glamour, and melancholia,
        drawing inspiration from both contemporary and vintage pop culture.
        With a career that has seen numerous critically acclaimed albums, Lana
        Del Rey has established herself as a unique and influential figure in
        the music industry, earning a dedicated fan base and numerous
        accolades.
      </p>
    ),
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Babu Maan, a legendary Punjabi singer, is renowned for his soulful
        voice and profound lyrics that resonate deeply with his audience. Born
        in the village of Khant Maanpur in Punjab, India, he has become a
        cultural icon in the Punjabi music industry. <br /> <br /> His songs
        often reflect the struggles and triumphs of everyday life, capturing
        the essence of Punjabi culture and traditions. With a career spanning
        over two decades, Babu Maan has released numerous hit albums and
        singles that have garnered him a massive fan following both in India
        and abroad.
      </p>
    ),
  },
  {
    description: "Lata Mangeshkar",
    title: "Ajeeb Dastan Hai Yeh",
    src: "https://assets.aceternity.com/demos/lata-mangeshkar.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Lata Mangeshkar, the Nightingale of India, is a revered figure in Indian
        music. With a career spanning over seven decades, her melodious voice
        has graced countless Bollywood hits. Born in Indore, India, Lata's
        remarkable versatility and ability to convey deep emotions through her
        singing have made her an enduring icon. <br /> <br /> Her
        contributions to Indian cinema and music have earned her numerous
        awards, and she remains a beloved and influential artist in the
        Indian music industry.
      </p>
    ),
  },
  {
    description: "Ravi Shankar",
    title: "Raga Jog",
    src: "https://assets.aceternity.com/demos/ravi-shankar.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Ravi Shankar was a legendary Indian sitar virtuoso and composer who
        played a pivotal role in bringing Indian classical music to the global
        stage. Born in Varanasi, India, his innovative approach and
        collaborations with Western musicians helped bridge cultural divides.
        <br /> <br /> Shankar's performances and recordings, including
        collaborations with George Harrison of The Beatles, showcased the
        intricate beauty of Indian music and earned him international acclaim.
        His contributions continue to inspire musicians and enthusiasts
        worldwide.
      </p>
    ),
  },
];

// Define ContainerScroll component
export function ContainerScroll({ children, titleComponent }: any) {
  const {scrollYProgress} = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ x }}
      >
        <div className="bg-green-500 h-[80vh] md:h-[50vh] lg:h-[60vh] -z-10" />
      </motion.div>
      <div className="relative">
        <div className="relative">
          <div className="flex items-center justify-center py-12">{titleComponent}</div>
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Define HeroScrollDemo component
export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Let's vote for Future India!<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none ">
                <span className="text-orange-500">Indian</span>{" "}
                <span>Voting</span>{" "}
                <span className="text-green-500">System</span>
              </span>
            </h1>
          </>
        }
      >
        <ExpandableCardDemo />
      </ContainerScroll>
    </div>
  );
}
