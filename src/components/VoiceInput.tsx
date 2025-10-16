"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onVoiceResult: (text: string) => void;
  isSupported?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onstart = () => {
          setIsListening(true);
        };

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onVoiceResult(transcript);
          setIsListening(false);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onVoiceResult]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      size="sm"
      onClick={isListening ? stopListening : startListening}
      className="flex-shrink-0"
      title={isListening ? "Stop listening" : "Start voice input"}
    >
      {isListening ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="hidden sm:inline ml-1">Stop</span>
        </>
      ) : (
        <>
          <Mic className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Voice</span>
        </>
      )}
    </Button>
  );
};

export default VoiceInput;
