import { Plane } from "lucide-react";
import React from "react";
import { FaLightbulb, FaClock, FaBookOpen, FaPenFancy, FaBrain, FaUserFriends } from "react-icons/fa";

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
  {
    icon: <FaUserFriends className="text-primary text-4xl" />,
    title: "Collaborative Learning",
    description: "Study with friends to share knowledge and motivate each other.",
  },
];

const StudyTips = () => {
  return (
    <section className="mt-10 py-16">
      <div className="w-11/12 mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-10 text-cyan-500 flex items-center justify-center gap-2">
        <Plane className="text-red-500 animate-pulse" /> Study Tips for Success
      </h2>
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
