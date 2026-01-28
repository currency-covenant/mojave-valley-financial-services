"use client";
import HeroImage from "../../assets/Home.avif";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
export default function Hero() {
  // Animation variants for framer-motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center w-full overflow-hidden aspect-video min-h-[40vh] md:min-h-[10vh] font-dmSerifDisplay font-normal "
    >
      <picture className="absolute inset-0 w-full h-full">
        <img
          src={HeroImage}
          alt="home hero image desk"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </picture>
      {/* Black overlay – 50% opacity */}
      <div className="absolute inset-0 bg-black opacity-70 z-10" />
      {/* White box overlay – on top of the black overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* Static white‑box container (no motion) */}
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg h-4/5 xl:h-4/7 2xl:h-4/8 lg:w-3/4 xl:w-3/4 2xl:w-1/2 p-4 sm:p-6 text-center py-8 lg:py-12 xl:pb-0 flex flex-col justify-start items-center gap-4 md:gap-6 sm:gap-7 mx-4 md:mx-20 xl:mx-60">
          {/* Animated wrapper for the text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-4 md:gap-6"
          >
            <motion.h1
              variants={child}
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-[#FCB100]"
            >
              Mojave Valley Financial
            </motion.h1>
            <motion.h2
              variants={child}
              className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal"
            >
              Your Trusted Partner in
            </motion.h2>
            <motion.h2
              variants={child}
              className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal"
            >
              Tax &amp; Accounting
            </motion.h2>
            <motion.p
              variants={child}
              className="text-xl lg:text-2xl font-normal"
            >
              Get Your Taxes Done Now!
            </motion.p>
            <motion.div variants={child}>
              <Button
                className={
                  "text-lg text-black sm:text-2xl p-5 lg:p-8 font-sans bg-[#FCB100]"
                }
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
