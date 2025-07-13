import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';

interface VoiceModalProps {
  onClose: () => void;
  onCommand: (command: string) => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({ onClose, onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
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

        setTranscript(finalTranscript + interimTranscript);
        
        if (finalTranscript) {
          onCommand(finalTranscript);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const exampleCommands = [
    "Find iPhones under ₹30,000",
    "Add rice to my cart",
    "Show my cart",
    "Find deals on groceries",
    "Search for laptops"
  ];

  return (
    <div className="voice-modal-overlay">
      <div className="voice-modal">
        <div className="voice-modal-header">
          <h3>🛒 Walmart Voice Assistant</h3>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="voice-modal-content">
          <div className="voice-controls">
            <button 
              onClick={isListening ? stopListening : startListening}
              className={`voice-control-btn ${isListening ? 'listening' : ''}`}
            >
              {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
            
            <p className="voice-status">
              {isListening ? 'Listening...' : 'Click to start voice search'}
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

          {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
            <div className="voice-not-supported">
              <p>Voice recognition is not supported in your browser.</p>
              <p>Please try Chrome or Edge for the best experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceModal;