import React from 'react'

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About VideoAI</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg mb-6">
            VideoAI is a cutting-edge platform that harnesses the power of artificial intelligence to revolutionize video creation. Our mission is to empower businesses and individuals to create stunning, professional-quality videos with ease.
          </p>
          <p className="text-lg mb-6">
            Founded in 2023, our team of passionate developers, designers, and AI experts have come together to build a tool that democratizes video production. We believe that everyone should have access to high-quality video content, regardless of their technical skills or budget.
          </p>
          <p className="text-lg mb-6">
            Our AI-powered technology allows users to transform text into engaging videos, customize templates, and collaborate with team members seamlessly. We're committed to continuous innovation and are constantly working to improve our platform to meet the evolving needs of our users.
          </p>
          <p className="text-lg">
            Join us on our journey to reshape the future of video creation. With VideoAI, your ideas can come to life in ways you never thought possible.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About