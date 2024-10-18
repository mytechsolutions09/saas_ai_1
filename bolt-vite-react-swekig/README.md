# VideoAI - Text to Video/Image Generation

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your fal.ai API key and MongoDB connection string:
     ```
     VITE_FAL_KEY=YOUR_FAL_KEY_HERE
     MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
     ```
   Replace `YOUR_FAL_KEY_HERE` with your actual fal.ai API key and `YOUR_MONGODB_CONNECTION_STRING_HERE` with your MongoDB connection string.

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Text to Video generation
- Text to Image generation
- User authentication with MongoDB
- Dashboard for managing projects

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- fal.ai API for AI-powered video and image generation
- MongoDB for data storage

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.