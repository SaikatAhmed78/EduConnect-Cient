import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg mb-4 p-4 cursor-pointer transition-all duration-300"
      onClick={toggleFAQ}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{question}</h3>
        {isOpen ? (
          <FaChevronUp className="text-primary" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </div>
      {isOpen && (
        <p className="text-gray-700 mt-3 text-sm leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book a study session?",
      answer:
        "To book a study session, navigate to the 'Sessions' tab in your dashboard, select a tutor and a time slot, and confirm your booking.",
    },
    {
      question: "Can I cancel or reschedule my session?",
      answer:
        "Yes, you can cancel or reschedule a session from your dashboard under the 'My Sessions' section.",
    },
    {
      question: "Is there a fee for study materials?",
      answer:
        "No, all study materials are provided for free once you have booked your session.",
    },
    {
      question: "How do I contact a tutor?",
      answer:
        "You can contact a tutor via the messaging feature available after booking a session.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, debit cards, and online payment methods.",
    },
  ];

  return (
    <div className="w-full mt-10 mb-10 px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-cyan-500 mb-8">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
