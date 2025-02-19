import React from 'react';

const featuresData = [
  {
    id: 1,
    title: 'Session Booking',
    description: 'Easily schedule and manage your study sessions with just a few clicks.',
    icon: '📅'
  },
  {
    id: 2,
    title: 'Resource Sharing',
    description: 'Share study materials and resources securely with fellow students.',
    icon: '📂'
  },
  {
    id: 3,
    title: 'User Management',
    description: 'Admins can manage user roles and permissions efficiently.',
    icon: '👥'
  },
  {
    id: 4,
    title: 'Performance Tracking',
    description: 'Track session effectiveness and tutor ratings with detailed analytics.',
    icon: '📊'
  }
];

const FeaturesSection = () => {
  return (
    <section className="w-11/12 mx-auto mt-10 py-10">
      <h2 className="text-4xl font-bold text-center text-cyan-500 mb-8">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature) => (
          <div 
            key={feature.id} 
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
