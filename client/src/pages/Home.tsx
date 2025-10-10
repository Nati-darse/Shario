import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">Shario</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Share and discover learning resources across various skills and domains. 
          Join our community of learners and experts.
        </p>
        <div className="space-x-4">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-secondary">
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;