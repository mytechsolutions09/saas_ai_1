import React from 'react'
import { Video, Wand2, Zap, Users, Globe, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)

const Features: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">Text to Video in Minutes</h1>
          <p className="text-xl text-gray-700 mb-8">
            Describe your idea, optionally add details such as video length, platform, voiceover accent, and watch as the video gets generated.
          </p>
          <Link to="/signup" className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300">
            Generate a Video
          </Link>
        </div>

        <div className="flex justify-center mb-16">
          <img src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Video Generation" className="rounded-lg shadow-xl max-w-full h-auto" style={{maxWidth: '800px'}} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2">25M</h2>
            <p className="text-xl text-gray-700">Customers</p>
            <p className="text-gray-600">190 countries</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2">#1</h2>
            <p className="text-xl text-gray-700">Product of the month</p>
            <img src="https://ph-static.imgix.net/ph-logo-1.png" alt="Product Hunt" className="h-8 mx-auto mt-2" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-indigo-900 mb-2">4.8</h2>
            <p className="text-xl text-gray-700">User Rating</p>
            <div className="flex justify-center space-x-4 mt-2">
              <img src="https://seeklogo.com/images/C/capterra-logo-C1D8C5C2E9-seeklogo.com.png" alt="Capterra" className="h-6" />
              <img src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg" alt="Trustpilot" className="h-6" />
              <img src="https://www.g2.com/assets/g2-logo-ac8fbd5d0ac24d6664a0569ef9adc82b8e2cef2d8e0ab1c8ba0caa3b0e3d1ec7.svg" alt="G2" className="h-6" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Powerful Features for Video Creation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Video className="w-8 h-8 text-indigo-600" />}
            title="AI-Powered Video Generation"
            description="Transform your text into engaging videos with our advanced AI technology."
          />
          <FeatureCard
            icon={<Wand2 className="w-8 h-8 text-indigo-600" />}
            title="Customizable Templates"
            description="Choose from a wide range of templates or create your own to match your brand."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-indigo-600" />}
            title="Quick Turnaround"
            description="Generate professional-quality videos in minutes, not hours."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-indigo-600" />}
            title="Team Collaboration"
            description="Work together seamlessly with your team on video projects."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-indigo-600" />}
            title="Multi-Language Support"
            description="Create videos in multiple languages to reach a global audience."
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-indigo-600" />}
            title="Secure Cloud Storage"
            description="Store and access your videos securely from anywhere in the world."
          />
        </div>
      </div>
    </div>
  )
}

export default Features