import { Navbar } from "@/components/global/navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import { createFileRoute } from "@tanstack/react-router";
import Services from "@/components/home/Services";
import ContactForm from "@/components/home/Contact";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        name: "description",
        content: " Mojave Valley financial web app",
      },
      {
        title: "Home | Mojave Valley Financial",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ContactForm />
      <CTA />
      <Footer />
    </>
  );
}

export default Index;
