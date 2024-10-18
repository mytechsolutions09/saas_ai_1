import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TextToImage from '../TextToImage';
import * as fal from '@fal-ai/serverless-client';

// Mock the fal.ai library
jest.mock('@fal-ai/serverless-client', () => ({
  config: jest.fn(),
  subscribe: jest.fn(),
  storage: {
    upload: jest.fn(),
  },
}));

// Mock the environment variable
const originalEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv, VITE_FAL_KEY: 'test-api-key' };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('TextToImage Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <TextToImage />
      </Router>
    );
    expect(screen.getByText('Generate Text to Image')).toBeInTheDocument();
  });

  it('allows text input', () => {
    render(
      <Router>
        <TextToImage />
      </Router>
    );
    const textArea = screen.getByPlaceholderText('Type or paste your text here...');
    fireEvent.change(textArea, { target: { value: 'A beautiful sunset' } });
    expect(textArea).toHaveValue('A beautiful sunset');
  });

  it('handles file upload', () => {
    render(
      <Router>
        <TextToImage />
      </Router>
    );
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload an image (optional)');
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText('File selected: test.png')).toBeInTheDocument();
  });

  it('generates image when button is clicked', async () => {
    const mockSubscribe = fal.subscribe as jest.MockedFunction<typeof fal.subscribe>;
    mockSubscribe.mockResolvedValue({
      output: {
        images: [{ url: 'https://example.com/generated-image.jpg' }],
      },
    });

    render(
      <Router>
        <TextToImage />
      </Router>
    );

    const textArea = screen.getByPlaceholderText('Type or paste your text here...');
    fireEvent.change(textArea, { target: { value: 'A beautiful sunset' } });

    const generateButton = screen.getByText('Generate Image');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Generated Image')).toBeInTheDocument();
      expect(screen.getByAltText('Generated')).toHaveAttribute('src', 'https://example.com/generated-image.jpg');
    });
  });

  it('displays error message when API call fails', async () => {
    const mockSubscribe = fal.subscribe as jest.MockedFunction<typeof fal.subscribe>;
    mockSubscribe.mockRejectedValue(new Error('API Error'));

    render(
      <Router>
        <TextToImage />
      </Router>
    );

    const generateButton = screen.getByText('Generate Image');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Error:')).toBeInTheDocument();
      expect(screen.getByText('An error occurred while generating the image. Please try again.')).toBeInTheDocument();
    });
  });
});