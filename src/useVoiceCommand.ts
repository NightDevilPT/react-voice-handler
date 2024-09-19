import { useEffect, useRef } from "react";

export interface CommandAction {
  command: string;
  action: () => void;
}

const useVoiceCommands = (commands: CommandAction[], continuous: boolean = false) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Browser does not support speech recognition.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      commands.forEach(({ command, action }) => {
        if (transcript.includes(command.toLowerCase())) {
          action();
          if (!continuous) {
            recognitionRef.current?.stop();
          }
        }
      });
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
      }
    };
  }, [commands, continuous]);

  return {
    startRecognition: () => recognitionRef.current?.start(),
    stopRecognition: () => recognitionRef.current?.stop(),
  };
};

export default useVoiceCommands;
