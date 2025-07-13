import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X } from 'lucide-react';

interface VoiceSearchProps {
  onClose: () => void;
  onCommand: (command: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onClose, onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        
        if (finalTranscript) {
          onCommand(finalTranscript);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onCommand, onClose]);

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const exampleCommands = [
    "Find iPhones under 30000",
    "Add rice to my cart",
    "Show my cart",
    "Find deals on groceries",
    "Search for laptops"
  ];

  if (!isSupported) {
    return (
      <div className="voice-search-overlay">
        <div className="voice-search-modal">
          <div className="voice-search-header">
            <h3>Voice Search</h3>
            <button onClick={onClose} className="close-button">
              <X size={20} />
            </button>
          </div>
          <div className="voice-search-content">
            <div className="voice-not-supported">
              <p>Voice recognition is not supported in your browser.</p>
              <p>Please try Chrome, Edge, or Safari for the best experience.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-search-overlay">
      <div className="voice-search-modal">
        <div className="voice-search-header">
          <h3>🛒 Walmart Voice Search</h3>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="voice-search-content">
          <div className="voice-controls">
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`voice-control-btn ${isListening ? 'listening' : ''}`}
            >
              {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
            
            <p className="voice-status">
              {isListening ? 'Listening... Speak now' : 'Click to start voice search'}
            </p>
          </div>

          {transcript && (
            <div className="transcript">
              <p>You said: "{transcript}"</p>
            </div>
          )}

          <div className="voice-examples">
            <h4>Try saying:</h4>
            <ul>
              {exampleCommands.map((command, index) => (
                <li key={index} onClick={() => onCommand(command)}>
                  "{command}"
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;