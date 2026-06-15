"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAiConversation } from "@/hooks/useAiConversation";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useQuoteStore } from "@/store/useQuoteStore";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { VoiceRecorder } from "./VoiceRecorder";

const mergeDictation = (current: string, dictatedText: string): string => {
  const trimmedCurrent = current.trimEnd();
  const trimmedDictation = dictatedText.trim();

  if (!trimmedDictation) {
    return current;
  }

  return trimmedCurrent
    ? `${trimmedCurrent} ${trimmedDictation}`
    : trimmedDictation;
};

export function Composer() {
  const [text, setText] = useState("");
  const lastTranscriptRef = useRef("");
  const setLiveTranscript = useQuoteStore((state) => state.setLiveTranscript);
  const { isSending, sendMessage } = useAiConversation();
  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  } = useSpeechRecognition();

  useEffect(() => {
    const previous = lastTranscriptRef.current;

    if (transcript && transcript !== previous) {
      const nextChunk = transcript.startsWith(previous)
        ? transcript.slice(previous.length)
        : transcript;

      setText((current) => mergeDictation(current, nextChunk));
      lastTranscriptRef.current = transcript;
    }
  }, [transcript]);

  useEffect(() => {
    setLiveTranscript(interimTranscript);
  }, [interimTranscript, setLiveTranscript]);

  useEffect(
    () => () => {
      setLiveTranscript("");
    },
    [setLiveTranscript],
  );

  const submitMessage = () => {
    const content = text.trim();

    if (!content || isSending) {
      return;
    }

    stop();
    reset();
    lastTranscriptRef.current = "";
    setText("");
    setLiveTranscript("");
    void sendMessage(content);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <form className="border-t bg-white p-3" onSubmit={handleSubmit}>
      {interimTranscript ? (
        <div className="mb-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {interimTranscript}
        </div>
      ) : null}
      <div className="flex items-end gap-2">
        <VoiceRecorder
          isSupported={isSupported}
          isListening={isListening}
          error={error}
          onStart={start}
          onStop={stop}
        />
        <Textarea
          aria-label="Message"
          className="max-h-36 min-h-11 resize-none"
          placeholder="Dicter ou ecrire le chantier"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="submit"
          size="icon-lg"
          aria-label="Envoyer"
          disabled={!text.trim() || isSending}
        >
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
}
