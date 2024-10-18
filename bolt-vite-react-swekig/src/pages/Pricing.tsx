import React from 'react'
import { Check } from 'lucide-react'

const PricingTier = ({ name, price, features }: { name: string, price: string, features: string[] }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
    <h3 className="text-xl font-semibold mb-4">{name}</h3>
    <p className="text-3xl font-bold mb-6">{price}<span className="text-lg font-normal">/month</span></p>
    <ul className="mb-6 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
      Choose Plan
    </button>
  </div>
)

const Pricing: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingTier
            name="Basic"
            price="$29"
            features={[
              "5 videos per month",
              "Basic templates",
              "720p resolution",
              "Email support"
            ]}
          />
          <PricingTier
            name="Pro"
            price="$79"
            features={[
              "20 videos per month",
              "Advanced templates",
              "1080p resolution",
              "Priority support",
              "Custom branding"
            ]}
          />
          <PricingTier
            name="Enterprise"
            price="Custom"
            features={[
              "Unlimited videos",
              "Custom templates",
              "4K resolution",
              "Dedicated support",
              "API access",
              "Team collaboration"
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Pricing