import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Upload, AlertCircle, Volume2 } from 'lucide-react';

interface VoicePermissionHandlerProps {
  onTranscript: (text: string) => void;
  onClose: () => void;
}

const VoicePermissionHandler: React.FC<VoicePermissionHandlerProps> = ({
  onTranscript,
  onClose
}) => {
  const [permissionState, setPermissionState] = useState<'checking' | 'granted' | 'denied' | 'unavailable'>('checking');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);

  useEffect(() => {
    checkMicrophonePermission();
    initializeSpeechRecognition();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState('unavailable');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionState('granted');
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setPermissionState('denied');
    }
  };

  const initializeSpeechRecognition = () => {
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

        const fullTranscript = finalTranscript + interimTranscript;
        setTranscript(fullTranscript);
        
        if (finalTranscript) {
          onTranscript(finalTranscript);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setPermissionState('denied');
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  };

  const startListening = async () => {
    if (permissionState === 'denied') {
      // Try to request permission again
      await checkMicrophonePermission();
    }

    if (recognition && permissionState === 'granted') {
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

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      processAudioFile(file);
    }
  };

  const processAudioFile = async (file: File) => {
    setIsProcessingAudio(true);
    
    // Simulate audio processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock transcription result
    const mockTranscripts = [
      "Find iPhones under 30000",
      "Add rice to my cart",
      "Show my cart",
      "Search for laptops",
      "Find deals on groceries"
    ];
    
    const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
    setTranscript(randomTranscript);
    onTranscript(randomTranscript);
    
    setIsProcessingAudio(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionState('granted');
    } catch (error) {
      setPermissionState('denied');
    }
  };

  const renderPermissionDenied = () => (
    <div className="voice-permission-content">
      <div className="permission-icon error">
        <MicOff size={48} />
      </div>
      <h3>Microphone Access Denied</h3>
      <p>We need microphone access to use voice search. You can:</p>
      
      <div className="permission-options">
        <button 
          onClick={requestMicrophonePermission}
          className="permission-btn primary"
        >
          <Mic size={16} />
          Try Again
        </button>
        
        <div className="upload-option">
          <p>Or upload an audio file:</p>
          <label htmlFor="audio-upload" className="upload-btn">
            <Upload size={16} />
            Upload Audio
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="permission-help">
        <AlertCircle size={16} />
        <div>
          <h4>How to enable microphone:</h4>
          <ul>
            <li>Click the microphone icon in your browser's address bar</li>
            <li>Select "Allow" for microphone access</li>
            <li>Refresh the page and try again</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderVoiceInterface = () => (
    <div className="voice-interface-content">
      <div className="voice-controls">
        <button 
          onClick={isListening ? stopListening : startListening}
          className={`voice-control-btn ${isListening ? 'listening' : ''}`}
          disabled={permissionState !== 'granted'}
        >
          {isListening ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
        
        <p className="voice-status">
          {isListening ? 'Listening... Speak now' : 'Click to start voice search'}
        </p>
      </div>

      {transcript && (
        <div className="transcript">
          <Volume2 size={16} />
          <p>You said: "{transcript}"</p>
        </div>
      )}

      <div className="voice-examples">
        <h4>Try saying:</h4>
        <ul>
          <li onClick={() => onTranscript("Find iPhones under 30000")}>
            "Find iPhones under ₹30,000"
          </li>
          <li onClick={() => onTranscript("Add rice to my cart")}>
            "Add rice to my cart"
          </li>
          <li onClick={() => onTranscript("Show my cart")}>
            "Show my cart"
          </li>
          <li onClick={() => onTranscript("Search for laptops")}>
            "Search for laptops"
          </li>
        </ul>
      </div>

      <div className="upload-fallback">
        <p>Having trouble? Upload an audio file instead:</p>
        <label htmlFor="audio-upload-fallback" className="upload-btn secondary">
          <Upload size={16} />
          Upload Audio File
        </label>
        <input
          id="audio-upload-fallback"
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );

  const renderAudioProcessing = () => (
    <div className="audio-processing">
      <div className="processing-spinner"></div>
      <h3>Processing Audio...</h3>
      <p>Converting your audio to text</p>
    </div>
  );

  const renderUnavailable = () => (
    <div className="voice-unavailable">
      <div className="unavailable-icon">
        <AlertCircle size={48} />
      </div>
      <h3>Voice Search Unavailable</h3>
      <p>Your browser doesn't support voice recognition.</p>
      <p>Please try using Chrome, Edge, or Safari for the best experience.</p>
      
      <div className="upload-option">
        <p>You can still upload an audio file:</p>
        <label htmlFor="audio-upload-unavailable" className="upload-btn">
          <Upload size={16} />
          Upload Audio
        </label>
        <input
          id="audio-upload-unavailable"
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );

  return (
    <div className="voice-permission-overlay">
      <div className="voice-permission-modal">
        <div className="voice-permission-header">
          <h3>🛒 Walmart Voice Assistant</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="voice-permission-body">
          {permissionState === 'checking' && (
            <div className="checking-permission">
              <div className="loading-spinner"></div>
              <p>Checking microphone permissions...</p>
            </div>
          )}
          
          {permissionState === 'denied' && renderPermissionDenied()}
          {permissionState === 'granted' && !isProcessingAudio && renderVoiceInterface()}
          {permissionState === 'unavailable' && renderUnavailable()}
          {isProcessingAudio && renderAudioProcessing()}
        </div>
      </div>
    </div>
  );
};

export default VoicePermissionHandler;