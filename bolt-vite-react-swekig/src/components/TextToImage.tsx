import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Type, Image as ImageIcon, Download, Upload, Settings, Info, Menu, X } from 'lucide-react';
import * as fal from '@fal-ai/serverless-client';

interface ImageResult {
  url: string;
}

const TextToImage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState<ImageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      let imageInput = null;
      if (uploadedImage) {
        imageInput = await fal.storage.upload(uploadedImage);
      }

      const result = await fal.subscribe("fal-ai/flux/dev", {
        input: {
          prompt: inputText,
          ...(imageInput && { image: imageInput }),
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      
      if (result && result.output && result.output.images && result.output.images[0]) {
        setGeneratedImage({ url: result.output.images[0].url });
      } else {
        throw new Error('Invalid response from the API');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        <h1 className="text-3xl font-semibold mb-6">Generate Text to Image</h1>
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an image (optional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button
              onClick={triggerFileInput}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center"
            >
              <Upload className="mr-2" />
              {uploadedImage ? 'Change Image' : 'Upload Image'}
            </button>
            {uploadedImage && (
              <p className="mt-2 text-sm text-gray-600">
                File selected: {uploadedImage.name}
              </p>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ImageIcon className="mr-2" />
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {generatedImage && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
            <div className="mb-4">
              <img src={generatedImage.url} alt="Generated" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <a
                href={generatedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
              >
                <ImageIcon className="mr-2" />
                View Full Size
              </a>
              <a
                href={generatedImage.url}
                download="generated_image.jpg"
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
  );
};

export default TextToImage;