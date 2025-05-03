import { FaMapMarkerAlt, FaBook, FaChalkboardTeacher, FaClipboardList, FaLaptopCode, FaGraduationCap, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const roadmapData = [
  { icon: <FaMapMarkerAlt />, title: "Set Learning Goals", desc: "Define your academic and personal goals for the semester." },
  { icon: <FaBook />, title: "Build Your Study Plan", desc: "Craft a personalized, realistic weekly study routine." },
  { icon: <FaChalkboardTeacher />, title: "Join Live Sessions", desc: "Engage with tutors and group sessions." },
  { icon: <FaClipboardList />, title: "Practice & Reflect", desc: "Take notes, solve problems, reflect regularly." },
  { icon: <FaLaptopCode />, title: "Explore Resources", desc: "Use videos, docs, and interactive tools effectively." },
  { icon: <FaGraduationCap />, title: "Seek Feedback", desc: "Get guidance and suggestions from peers or mentors." },
  { icon: <FaRocket />, title: "Celebrate Progress", desc: "Acknowledge your growth and keep pushing forward!" },
];

const StudyRoadmap = () => {
  return (
    <section className="py-20 px-4 duration-500">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-500">
        🚀 Study Roadmap
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="border-l-4 border-primary dark:border-green-400 absolute h-full left-1/2 transform -translate-x-1/2 z-0"></div>

        <div className="space-y-16 relative z-10">
          {roadmapData.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  md:w-1/2 w-full px-6 py-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-[#0f172a] relative group
                  ${isLeft ? "ml-auto text-left" : "mr-auto text-right"}
                `}
              >
                <div
                  className={`absolute top-6 text-primary dark:text-green-400 text-3xl transform 
                    -translate-y-1/2 bg-white dark:bg-[#0f172a] p-3 rounded-full shadow-md
                    ${isLeft ? "-left-10" : "-right-10"} group-hover:scale-125 transition`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudyRoadmap;
