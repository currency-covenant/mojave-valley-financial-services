import corporate from "../../assets/corporate.avif";
import personalTax from "../../assets/individual.avif";
import resolution from "../../assets/resolution.avif";
import taxes from "../../assets/taxes.webp";
import bankNote from "../../assets/banknote.jpg";
import { motion } from "framer-motion";

// -------------------------------------------------------------------
//  Data for each service – you can add/remove items here later.
// -------------------------------------------------------------------
const services = [
  {
    src: corporate,
    alt: "Corporate",
    title: "Business Tax",
    description:
      "Expert tax solutions tailored for smalle Businesses and corporations.",
  },
  {
    src: personalTax,
    alt: "Personal Tax",
    title: "Personal Tax",
    description: "Hassle-free, accurate tax filing for individuals.",
  },
  {
    src: resolution,
    alt: "Tax Resolution",
    title: "Amendments",
    description:
      "Need to fix a past return? We handle tax-amendments with ease.",
  },
  {
    src: taxes,
    alt: "Rapid Refund",
    title: "Rapid Refund",
    description: "Get your money back faster with secure e-filing.",
  },
  {
    src: bankNote,
    alt: "Maximum Returns",
    title: "Maximum Returns",
    description: "We work hard to get you the best refund possible",
  },
] as const;

// -------------------------------------------------------------------
//  Animation variants – smooth fade‑up transition
// -------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
} as const;

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 }, // a gentle stagger
  },
};

const cardItem = fadeUp;
const textItem = fadeUp;

//  Reusable card component – renders one service.
type ServiceCardProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
  /** Allows the parent to override the outer wrapper’s Tailwind classes */
  wrapperClass?: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  src,
  alt,
  title,
  description,
  wrapperClass = "relative w-full h-full lg:w-[300px] lg:h-[300px] xl:h-[350px] xl:w-[350px] lg:mx-auto rounded-2xl shadow-[-4px_4px_12px_0_rgba(255,255,255,0.2)] z-20",
}) => (
  <div className={wrapperClass}>
    <div className={`relative w-full h-full overflow-hidden rounded-2xl`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Black overlay – 50% opacity, matches the rounded corners */}
      <div className="absolute inset-0 bg-black opacity-55 rounded-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 text-white p-2 rounded-tr-md">
        <p className="text-2xl md:text-4xl">{title}</p>
        <p className="text-base md:text-2xl">{description}</p>
      </div>
    </div>
  </div>
);

export default function Services() {
  return (
    <>
      <section
        id="services"
        className="bg-neutral-900 pb-24 font-dmSerifDisplay flex flex-col justify-center items-center"
      >
        {/* Row 1 – indices 0‑2 */}
        <motion.h1
          id="services-title"
          className="scroll-mt-16 text-2xl md:text-4xl lg:text-5xl w-full flex justify-center items-center text-white py-8"
          variants={textItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          Tax Prep Service – No Money Upfront
        </motion.h1>
        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center gap-4 max-w-5xl mx-4 px-8 md:px-12 lg:px-0 md:mx-16 w-full"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          {services.slice(0, 3).map((svc, idx) => (
            <motion.div
              key={idx}
              variants={cardItem}
              style={{ willChange: "transform, opacity" }}
            >
              <ServiceCard
                src={svc.src}
                alt={svc.alt}
                title={svc.title}
                description={svc.description}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row justify-center items-center gap-4 pt-4 lg:pt-16 xl:pt-8 px-8 md:px-12  mx-4 md:mx-16 max-w-5xl lg:px-44 xl:px-40 w-full"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          {services.slice(3, 5).map((svc, idx) => (
            <motion.div
              key={idx + 3}
              variants={cardItem}
              style={{ willChange: "transform, opacity" }}
            >
              <ServiceCard
                src={svc.src}
                alt={svc.alt}
                title={svc.title}
                description={svc.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
