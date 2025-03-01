import React, { useState, useRef } from 'react';
import { Volume2, AlertCircle, Info, Camera, Mic, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

// Mock data



export const SignLanguageConverter: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [mode, setMode] = useState<'sign-to-text' | 'text-to-sign'>('sign-to-text');
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  const mockSignDetection = () => {
    const possiblePhrases = [
      'Hello, how are you?',
      'I need water please',
      'Thank you for your help',
      'I am feeling better today',
      'Can you help me?',
      'I need my medication',
      'Please call the doctor',
      'I would like to rest now',
    ];

    setIsLoading(true);
    setTimeout(() => {
      const randomPhrase = possiblePhrases[Math.floor(Math.random() * possiblePhrases.length)];
      setDetectedText(randomPhrase);
      setIsLoading(false);
    }, 2000);
  };

  const startCapturing = () => {
    setIsCapturing(true);
    setDetectedText('');
    mockSignDetection();
  };

  const stopCapturing = () => {
    setIsCapturing(false);
  };

  const handleTextToSignConversion = () => {
    if (!textInput.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log('Converting to sign language:', textInput);
      setIsLoading(false);
    }, 1500);
  };

  const handleSpeechToText = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTextInput('Hello, I need assistance with the patient.');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Home className="mr-2" size={20} />
        Return to Home
      </button>
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Sign Language Converter</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white-900">Sign Language Converter</h1>
          <p className="text-white-600">Break communication barriers with our sign language tool</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                mode === 'sign-to-text'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setMode('sign-to-text')}
            >
              Sign Language to Text
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                mode === 'text-to-sign'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setMode('text-to-sign')}
            >
              Text to Sign Language
            </button>
          </div>

          {mode === 'sign-to-text' ? (
            <div className="p-4">
              {showInfo && (
                <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Position yourself in front of the camera and use sign language gestures. 
                        The system will attempt to recognize and convert them to text.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowInfo(false)}
                      className="ml-auto text-blue-500 hover:text-blue-700"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 640,
                    height: 400,
                    facingMode: "user"
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-white text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                      <p>Processing sign language...</p>
                    </div>
                  </div>
                )}

                {!isCapturing && !isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button
                      onClick={startCapturing}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                    >
                      <Camera className="mr-2" size={20} />
                      Start Capture
                    </button>
                  </div>
                )}
              </div>

              {isCapturing && !isLoading && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={stopCapturing}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Stop Capture
                  </button>
                </div>
              )}

              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Detected Text</h3>
                {detectedText ? (
                  <p className="text-gray-800">{detectedText}</p>
                ) : (
                  <p className="text-gray-500 italic">No text detected yet. Start capturing to detect sign language.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="textInput" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter text or use speech input
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="textInput"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type text to convert to sign language..."
                  />
                  <button
                    onClick={handleSpeechToText}
                    className="px-3 py-2 bg-gray-200 text-gray-700 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300"
                  >
                    <Mic size={20} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <button
                  onClick={handleTextToSignConversion}
                  disabled={!textInput.trim() || isLoading}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center ${
                    !textInput.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Volume2 className="mr-2" size={20} />
                  {isLoading ? 'Converting...' : 'Convert to Sign Language'}
                </button>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50 text-center" style={{ height: '300px' }}>
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-gray-500">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                      <p>Generating sign language animation...</p>
                    </div>
                  </div>
                ) : textInput ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-5xl">👋</span>
                      </div>
                      <p className="text-gray-700">
                        Sign language animation would appear here.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-gray-500 flex items-center">
                      <AlertCircle className="mr-2" size={20} />
                      Enter text to see sign language animation
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">How to Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Sign Language to Text</h3>
              <ol className="list-decimal list-inside text-gray-600 ml-4 mt-2 space-y-1">
                <li>Position yourself in front of the camera</li>
                <li>Click "Start Capture" to begin</li>
                <li>Use clear sign language gestures</li>
                <li>The system will convert your signs to text</li>
                <li>Click "Stop Capture" when finished</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Text to Sign Language</h3>
              <ol className="list-decimal list-inside text-gray-600 ml-4 mt-2 space-y-1">
                <li>Type text in the input field or use speech input</li>
                <li>Click "Convert to Sign Language"</li>
                <li>Watch the animated sign language representation</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This is a demonstration version with simulated responses. In a production environment, 
                  this would use TensorFlow.js and MediaPipe for real-time sign language recognition.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Home className="mr-2" size={20} />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};