import { ImFolderUpload } from "react-icons/im";
import { FaUserLarge } from "react-icons/fa6";
import { motion } from "framer-motion";

// Variants for the cards container (staggered children)
const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }, // light stagger between the two cards
  },
};

// Variant for each individual card
const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Variant for the text block (single fade‑up)
const textItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-12 bg-gray-50 flex flex-col justify-center items-center w-full"
    >
      <div className="w-full xl:w-2/3 px-4 sm:px-6 md:px-12">
        {/* 1 column on small & medium screens, 2 columns on large+ */}
        {/* Negative top margin makes the cards overlay the Hero bottom border */}
        <motion.div
          id="about-cards"
          className="scroll-mt-44 -mt-8 sm:-mt-12 md:mt-0 lg:-mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 – Contact */}
          <motion.div
            className="z-20 bg-white rounded-lg p-4 sm:p-6 cursor-pointer flex flex-col items-center shadow-[0_4px_8px_rgba(252,177,0,0.5)] max-w-sm lg:max-w-md w-full mx-auto group hover:shadow-[0_0_20px_rgba(252,177,0,0.9)] transition-all duration-500 ease-out hover:-translate-y-1"
            variants={cardItem}
          >
            <div className="border-2 border-dashed border-[#FCB100] rounded-full p-8 flex items-center justify-center mb-4 bg-transparent group-hover:bg-black transition-colors duration-300">
              <ImFolderUpload className="w-12 h-12 md:w-14 md:h-14 text-[#FCB100] transition-transform duration-500 ease-out group-hover:scale-125 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-light font-dmSerifDisplay text-center">
              Book Appointment
            </h3>
            <p className="text-lg lg:text-xl text-center font-dmSerifDisplay font-light">
              Schedule a consultation with us.
            </p>
          </motion.div>

          {/* Card 2 – Client Portal */}
          <motion.div
            className="z-20 bg-white rounded-lg p-4 sm:p-6 cursor-pointer flex flex-col items-center shadow-[0_4px_8px_rgba(252,177,0,0.5)] max-w-sm lg:max-w-md w-full mx-auto group hover:shadow-[0_0_20px_rgba(252,177,0,0.9)] transition-all duration-500 ease-out hover:-translate-y-1"
            variants={cardItem}
          >
            <div className="border-2 border-dashed border-[#FCB100] rounded-full p-8 flex items-center justify-center mb-4 bg-transparent group-hover:bg-black transition-colors duration-300">
              <FaUserLarge className="w-12 h-12 md:w-14 md:h-14 text-[#FCB100] transition-transform duration-500 ease-out group-hover:scale-125 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-light font-dmSerifDisplay text-center">
              Client Portal
            </h3>
            <p className="text-lg lg:text-xl text-center font-dmSerifDisplay font-light">
              Access resources through the client portal.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Text block – separate trigger */}
      <motion.div
        className="font-dmSerifDisplay mt-28 text-center max-w-6xl flex flex-col gap-4"
        variants={textItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-5xl ">About Us</h2>
        <p className="text-xl">
          At Mojave Valley Financial Services, we specialize in delivering
          comprehensive tax preparation, bookkeeping, payroll, and business
          advisory solutions. Our mission is to help individuals and businesses
          confidently manage their financial and tax obligations while
          maximizing opportunities and minimizing risk. We take a client-focused
          approach, providing personalized, efficient services designed to
          support your unique financial goals.
        </p>
        <p className="text-xl">
          Our experienced financial and tax professionals are dedicated to
          preparing and filing your taxes accurately and on time. Whether you’re
          an individual or a business owner, we offer expert guidance to help
          maximize refunds, reduce tax liabilities, and ensure full compliance
          with current tax regulations.
        </p>
      </motion.div>
    </section>
  );
}
