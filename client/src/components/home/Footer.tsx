import { Logo } from "@/components/global/icons";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-neutral-800 text-white font-dmSerifDisplay px-4 py-4 flex flex-col gap-8 lg:flex-row justify-center items-start">
        <div className="flex flex-col justify-cemter items-start w-full lg:w-1/4 lg:max-w-1/6">
          <h5 className="text-xl">About Us</h5>
          <p className="text-neutral-400">
            At ALL MOJAVE VALLEY FINANCIAL SERVICES, we specialize in providing
            expert tax preparation, bookkeeping, payroll, and business advisory
            services.
          </p>
          <Logo />
        </div>
        <div className="flex flex-col justify-cemter items-start w-full lg:w-1/7">
          <h5 className="text-xl">Quick Links</h5>
          <ul className="flex flex-col gap-2 py-2 justify-center items-start text-neutral-400">
            <li>Client Portal</li>
            <li>Contact Form</li>
            <li>Upload Files</li>
          </ul>
        </div>
        <div className="flex flex-col justify-cemter items-start w-full lg:w-1/7">
          <h5 className="text-xl">Our Services</h5>
          <ul className="flex flex-col gap-2 py-2 justify-center items-start text-neutral-400">
            <li>Maximum Returns</li>
            <li>Rapid Refunds</li>
            <li>Business Tax</li>
            <li>Personal Tax</li>
            <li>Amendments</li>
          </ul>
        </div>
        <div className="flex flex-col justify-cemter items-start w-full lg:w-1/7">
          <h5 className="text-xl">Contact Us</h5>
          <ul className="flex flex-col gap-2 justify-center items-start text-neutral-400 py-2">
            <li className="flex flex-row gap-2">
              <Phone />
              <p>760-243-6200</p>
            </li>
            <li className="flex flex-row gap-2">
              <Mail />
              <p>contact@mojavevalleyfinancial.com</p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
