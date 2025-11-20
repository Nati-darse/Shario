// client/src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Logo/Badge */}
          <div className="mb-8 animate-bounce">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              📚
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">Together</span>,
            <br />
            Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Forever</span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Where every shared resource becomes someone's <span className="font-semibold text-purple-600">breakthrough moment</span>. 
            Join the revolution of collaborative learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link 
              to="/resources"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden"
            >
              <span className="relative z-10">🚀 Launch Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <button className="group border-2 border-gray-800 hover:border-transparent hover:bg-gray-900 text-gray-800 hover:text-white font-bold py-5 px-12 rounded-2xl transition-all duration-500 transform hover:scale-105 flex items-center gap-3">
              <span>✨</span>
              How It Works
              <span className="group-hover:rotate-90 transition-transform duration-300">→</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '10K+', label: 'Resources Shared' },
              { number: '5K+', label: 'Active Learners' },
              { number: '200+', label: 'Skills Covered' },
              { number: '24/7', label: 'Learning Happening' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Shario</span>?
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              We're reimagining how knowledge gets shared in the digital age
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Big Feature */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 shadow-2xl">
              <div className="text-6xl mb-6">🤖</div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">AI-Powered Intelligence</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our AI doesn't just categorize - it understands context, suggests related resources, 
                and even predicts what you'll want to learn next.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Smart Tags</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Auto-Summary</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">AI Recommendations</span>
              </div>
            </div>

            {/* Right Column - Small Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Personalized Discovery',
                  description: 'Resources curated specifically for your learning path and interests',
                  color: 'from-green-400 to-blue-500'
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Find what you need in seconds with our powerful search engine',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: '🔄',
                  title: 'Always Updated',
                  description: 'Fresh content daily from a thriving community of experts',
                  color: 'from-purple-400 to-pink-500'
                },
                {
                  icon: '🌟',
                  title: 'Quality First',
                  description: 'Every resource is validated by our community of learners',
                  color: 'from-blue-400 to-cyan-500'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-28 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-transparent via-purple-500 to-transparent animate-spin-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            See <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Shario</span> in Action
          </h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Watch how one shared resource can create endless learning opportunities
          </p>

          {/* Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: '1',
                title: 'Share a Resource',
                description: 'Post a link that helped you learn something amazing',
                emoji: '📤',
                color: 'bg-blue-500'
              },
              {
                step: '2',
                title: 'AI Works Magic',
                description: 'Automatically categorized and enriched with metadata',
                emoji: '✨',
                color: 'bg-purple-500'
              },
              {
                step: '3',
                title: 'Community Benefits',
                description: 'Thousands discover and learn from your contribution',
                emoji: '👥',
                color: 'bg-green-500'
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className={`${step.color} rounded-2xl p-8 transform group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                  <div className="text-5xl mb-4">{step.emoji}</div>
                  <div className="text-3xl font-black mb-2">{step.title}</div>
                  <p className="text-blue-100">{step.description}</p>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                  {step.step}
                </div>
              </div>
            ))}
          </div>

          <Link 
            to="/resources"
            className="inline-flex items-center gap-4 bg-white text-gray-900 hover:bg-gray-100 font-black text-xl py-6 px-16 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <span>🎉</span>
            Join the Learning Revolution
            <span className="animate-pulse">🚀</span>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Level Up</span>?
          </h2>
          <p className="text-2xl text-gray-600 mb-12">
            Your next breakthrough is one shared resource away
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/resources"
              className="group relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-black py-6 px-16 rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden text-xl"
            >
              <span className="relative z-10">🌟 Start Sharing Today</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </Link>
          </div>

          <p className="text-gray-500 mt-8 text-lg">
            No account needed to explore • Join 5,000+ learners already sharing
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <div className="text-2xl font-black">Shario</div>
                <div className="text-gray-400">Learn Together, Grow Forever</div>
              </div>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <div className="text-lg mb-2">Made with 💙 for the global learning community</div>
              <div className="text-sm">© 2024 Shario. All knowledge shared here.</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom animations to index.css */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;