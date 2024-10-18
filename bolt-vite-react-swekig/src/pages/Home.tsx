import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Text to Video in Minutes</h1>
          <p className="text-xl text-gray-600 mb-8">
            Describe your idea, optionally add details such as video length, platform, voiceover accent, and watch as the video gets generated.
          </p>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Generate a Video
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <img
            src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Video Generation Process"
            className="w-full h-auto rounded-lg mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">25M</h3>
              <p className="text-gray-600">Customers</p>
              <p className="text-sm text-gray-500">190 countries</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">#1</h3>
              <p className="text-gray-600">Product of the month</p>
              <p className="text-sm text-gray-500">Product Hunt</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">4.8</h3>
              <p className="text-gray-600">User Rating</p>
              <p className="text-sm text-gray-500">Trustpilot</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Describe Your Idea</h3>
              <p className="text-gray-600">Enter your video concept and any specific details you want to include.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. AI Generation</h3>
              <p className="text-gray-600">Our advanced AI processes your input and creates a custom video.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Download & Share</h3>
              <p className="text-gray-600">Get your finished video in minutes, ready to use and share.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;