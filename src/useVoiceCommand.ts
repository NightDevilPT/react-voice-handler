import { useEffect, useRef } from "react";


export interface SpeechRecognitionErrorEvent extends Event {
  error: string; // Add more detailed error handling as needed
}

export interface CommandAction {
  command: string;
  action: () => void;
}

// src/langEnum.ts
export enum LangEnum {
  // English Variants
  EnglishUS = "en-US",
  EnglishUK = "en-GB",
  EnglishAustralia = "en-AU",
  EnglishCanada = "en-CA",
  EnglishIndia = "en-IN",
  EnglishIreland = "en-IE",
  EnglishNewZealand = "en-NZ",
  EnglishSouthAfrica = "en-ZA",

  // Spanish Variants
  SpanishSpain = "es-ES",
  SpanishMexico = "es-MX",
  SpanishArgentina = "es-AR",
  SpanishColombia = "es-CO",

  // French Variants
  FrenchFrance = "fr-FR",
  FrenchCanada = "fr-CA",

  // German
  GermanGermany = "de-DE",
  GermanSwitzerland = "de-CH",

  // Italian
  ItalianItaly = "it-IT",
  ItalianSwitzerland = "it-CH",

  // Portuguese Variants
  PortuguesePortugal = "pt-PT",
  PortugueseBrazil = "pt-BR",

  // Chinese Variants
  ChineseSimplified = "zh-CN",
  ChineseHongKong = "zh-HK",
  ChineseTaiwan = "zh-TW",

  // Japanese
  JapaneseJapan = "ja-JP",

  // Korean
  KoreanSouthKorea = "ko-KR",

  // Russian
  RussianRussia = "ru-RU",

  // Arabic Variants
  ArabicSaudiArabia = "ar-SA",
  ArabicEgypt = "ar-EG",
  ArabicUAE = "ar-AE",

  // Hindi
  HindiIndia = "hi-IN",

  // Dutch
  DutchNetherlands = "nl-NL",
  DutchBelgium = "nl-BE",

  // Swedish
  SwedishSweden = "sv-SE",

  // Norwegian
  NorwegianNorway = "no-NO",

  // Danish
  DanishDenmark = "da-DK",

  // Finnish
  FinnishFinland = "fi-FI",

  // Greek
  GreekGreece = "el-GR",

  // Turkish
  TurkishTurkey = "tr-TR",

  // Thai
  ThaiThailand = "th-TH",

  // Hebrew
  HebrewIsrael = "he-IL"
}


export interface VoiceCommandOptions {
  continuous?: boolean;
  onError?: (error: string) => void;
  onNoMatch?: () => void;
  lang?: LangEnum;
}

const useVoiceCommands = (
  commands: CommandAction[],
  { continuous = false, onError, onNoMatch, lang = LangEnum.EnglishUS }: VoiceCommandOptions = {}
) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const errorMsg = "Browser does not support speech recognition.";
      console.error(errorMsg);
      if (onError) onError(errorMsg);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = continuous;
    recognitionRef.current.lang = lang;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('Transcript Language Text',transcript)
      let commandMatched = false;

      commands.forEach(({ command, action }) => {
        if (transcript.includes(command.toLowerCase())) {
          action();
          commandMatched = true;
          if (!continuous) {
            recognitionRef.current?.stop();
          }
        }
      });

      if (!commandMatched && onNoMatch) {
        onNoMatch();
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      if (onError) onError(event.error);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
      }
    };
  }, [commands, continuous, onError, onNoMatch, lang]);

  return {
    startRecognition: () => recognitionRef.current?.start(),
    stopRecognition: () => recognitionRef.current?.stop(),
  };
};

export default useVoiceCommands;
