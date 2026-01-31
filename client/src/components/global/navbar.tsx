import { useState, useEffect } from "react";
import { Logo } from "./icons";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "home" | "about" | "services" | "contact"
  >("home");

  const scrollToSection = (id: string) => {
    console.log("scrollToSection:", id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "#home, #about, #services, #contact",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as
              | "home"
              | "about"
              | "services"
              | "contact";
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      {/* Main bar */}
      <section className="relative flex items-center justify-between px-4 md:px-12 lg:py-8">
        {/* Logo (always left) */}
        <div className="flex items-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:z-10">
          <Logo />
        </div>

        {/* Desktop navigation – hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/3 lg:justify-start lg:gap-8">
          <Button
            variant="blank"
            className={`
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "home" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("home")}
          >
            Home
          </Button>
          <Button
            variant="blank"
            className={`
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "about" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("about-cards")}
          >
            About
          </Button>
          <Button
            variant="blank"
            className={`
      relative
      "hover:underline hover:underline-[#FCB100
      transition-colors duration-200
      ${activeSection === "services" ? "decoration-[#FCB100] underline-offset-2" : ""}
    `}
            onClick={() => scrollToSection("services-title")}
          >
            Services
          </Button>
        </div>

        {/* Desktop CTAs – hidden on mobile */}
        <div className="hidden lg:flex flex-row justify-center items-center lg:w-1/3 lg:justify-end lg:gap-8">
          <Button
            className={"hover:underline hover:underline-[#FCB100]"}
            variant="blank"
            onClick={() =>
              window.open(
                "https://mojavevalleyfinancialcom.clientportal.com",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            Client Portal
          </Button>
          <Button variant="blank" onClick={() => scrollToSection("contact")}>
            Contact
          </Button>
        </div>

        {/* Mobile hamburger – visible only on small screens */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`
              inline-block
              transform
              transition-transform duration-300 ease-out
              ${isOpen ? "rotate-90" : "rotate-0"}
            `}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </span>
        </button>
      </section>

      {/* Mobile dropdown (appears below the bar) */}
      <div
        className={`
          lg:hidden
          overflow-hidden
          bg-white
          transition-all duration-350 ease-out
          will-change-[max-height,opacity]
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col p-4 space-y-2">
          <Button
            variant="blank"
            className={`
      w-full text-left
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "home" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("home")}
          >
            Home
          </Button>
          <Button
            variant="blank"
            className={`
      w-full text-left
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "about" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("about-cards")}
          >
            About
          </Button>
          <Button
            variant="blank"
            className={`
      w-full text-left
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "services" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("services")}
          >
            Services
          </Button>
          <Button
            variant="blank"
            className={`
      w-full text-left
      relative
      decoration-transparent
      decoration-2
      underline-offset-4
      hover:decoration-[#FCB100]
      transition-colors duration-200
      ${activeSection === "contact" ? "decoration-[#FCB100]" : ""}
    `}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};
