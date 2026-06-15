"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionResultListLike = {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
  message?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const resolveSpeechRecognition = (): SpeechRecognitionConstructor | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as WindowWithSpeechRecognition;

  return (
    browserWindow.SpeechRecognition ??
    browserWindow.webkitSpeechRecognition ??
    null
  );
};

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supportCheckId = window.setTimeout(() => {
      setIsSupported(Boolean(resolveSpeechRecognition()));
    }, 0);

    return () => {
      window.clearTimeout(supportCheckId);
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const reset = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setIsListening(false);
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const start = useCallback(() => {
    const Recognition = resolveSpeechRecognition();

    if (!Recognition) {
      setIsSupported(false);
      setError("Micro indisponible sur ce navigateur.");
      return;
    }

    recognitionRef.current?.abort();

    const recognition = new Recognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const resultText = result[0]?.transcript ?? "";

        if (result.isFinal) {
          finalText += resultText;
        } else {
          interimText += resultText;
        }
      }

      if (finalText.trim()) {
        setTranscript((current) => `${current} ${finalText}`.trim());
      }

      setInterimTranscript(interimText.trim());
    };
    recognition.onerror = (event) => {
      setError(
        event.error === "not-allowed"
          ? "Acces micro refuse."
          : event.message || "Dictee interrompue.",
      );
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    setIsListening(true);

    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setError("Impossible de demarrer le micro.");
    }
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  };
}
