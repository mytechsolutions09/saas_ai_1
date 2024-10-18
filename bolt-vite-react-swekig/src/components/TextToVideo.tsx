import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Type, Play, Download, Settings, Info, Menu, X } from 'lucide-react'
import * as fal from '@fal-ai/serverless-client'

interface VideoResult {
  url: string;
}

const TextToVideo: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [generatedVideo, setGeneratedVideo] = useState<VideoResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const falKey = import.meta.env.VITE_FAL_KEY;
    if (falKey) {
      fal.config({
        credentials: falKey,
      });
    } else {
      console.error('VITE_FAL_KEY is not set in the environment variables');
      setError('API key is not configured. Please contact support.');
    }
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fal.subscribe("fal-ai/cogvideox-5b", {
        input: {
          prompt: inputText,
          video_size: {
            height: 480,
            width: 720
          },
          negative_prompt: "Distorted, discontinuous, Ugly, blurry, low resolution, motionless, static, disfigured, disconnected limbs, Ugly faces, incomplete arms",
          num_inference_steps: 50,
          guidance_scale: 7,
          use_rife: true,
          export_fps: 16
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      
      if (result && result.output && result.output.video && result.output.video.url) {
        setGeneratedVideo({ url: result.output.video.url });
      } else {
        throw new Error('Invalid response from the API');
      }
    } catch (err) {
      console.error('Error generating video:', err);
      setError('An error occurred while generating the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50">
          <Menu size={24} />
        </button>
      </div>
      <aside className={`bg-white shadow-md ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out' : 'hidden md:block w-64'}`}>
        <nav className="p-4">
          {isSidebarOpen && (
            <button onClick={toggleSidebar} className="mb-4">
              <X size={24} />
            </button>
          )}
          <ul className="space-y-2">
            <li><Link to="/customer-panel" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"><Type size={20} /><span>Dashboard</span></Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-3xl font-semibold mb-6">Generate Text to Video</h1>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="mb-6">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              id="inputText"
              rows={5}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Type className="mr-2" />
            {isLoading ? 'Generating...' : 'Generate Video'}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {generatedVideo && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Video</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <video controls className="w-full h-full rounded-lg">
                <source src={generatedVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <a
                href={generatedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
              >
                <Play className="mr-2" />
                Play in New Tab
              </a>
              <a
                href={generatedVideo.url}
                download="generated_video.mp4"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <Download className="mr-2" />
                Download
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default TextToVideo