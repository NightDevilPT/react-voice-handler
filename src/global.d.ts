// global.d.ts

// Extend the Window interface to include the Web Speech API
interface Window {
	SpeechRecognition: typeof SpeechRecognition;
	webkitSpeechRecognition: typeof SpeechRecognition;
}

// Declare the SpeechRecognition class and its types
declare class SpeechRecognition {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	onresult: (event: SpeechRecognitionEvent) => void;
	start(): void;
	stop(): void;
	onerror: (event: SpeechRecognitionErrorEvent) => void; // Add this line
}

interface SpeechRecognitionEvent {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	length: number;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	isFinal: boolean;
	length: number;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}
