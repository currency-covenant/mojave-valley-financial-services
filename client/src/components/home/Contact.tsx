"use client";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "@/hooks/useSubmitContact";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: submitContact } = useSubmitContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again later.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start h-full">
        <iframe
          src="https://calendly.com/alvin-brown-mojavevalleyfinancial/30min"
          className="w-full lg:w-1/2"
          style={{
            minWidth: "320px",
            height: "885px",
            border: "0",
          }}
          title="Calendly Booking"
        ></iframe>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl w-full lg:w-1/2 mx-auto p-4 space-y-4 flex flex-col justify-center items-center"
        >
          <h1 className="text-4xl font font-dmSerifDisplay">
            Drop Us a Message
          </h1>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FCB100] text-black font-semibold py-2 px-4 rounded hover:bg-[#e0a100] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
}
