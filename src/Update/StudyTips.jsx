import React from "react";
import { FaLightbulb, FaClock, FaBookOpen, FaPenFancy, FaBrain } from "react-icons/fa";

const tips = [
  {
    icon: <FaLightbulb className="text-primary text-4xl" />,
    title: "Plan Your Study Sessions",
    description: "Create a daily schedule and stick to it to manage your time effectively.",
  },
  {
    icon: <FaClock className="text-primary text-4xl" />,
    title: "Take Regular Breaks",
    description: "Follow the Pomodoro technique: 25 minutes of study followed by a 5-minute break.",
  },
  {
    icon: <FaBookOpen className="text-primary text-4xl" />,
    title: "Active Reading",
    description: "Engage with the material by highlighting, taking notes, and asking questions.",
  },
  {
    icon: <FaPenFancy className="text-primary text-4xl" />,
    title: "Practice Recall",
    description: "Test yourself regularly to reinforce your knowledge and identify weak areas.",
  },
  {
    icon: <FaBrain className="text-primary text-4xl" />,
    title: "Mindfulness & Focus",
    description: "Practice mindfulness techniques to improve concentration during study sessions.",
  },
];

const StudyTips = () => {
  return (
    <section className="mt-10 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-500">Study Tips for Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-center">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyTips;
