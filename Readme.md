<!DOCTYPE html>
<html lang="en">
<body>

  <h1>React Voice Handler</h1>
  <p>
    <strong>React Voice Handler</strong> is a lightweight custom hook for recognizing voice commands using the Web Speech API in React applications. It allows you to trigger actions based on voice input, making your applications more interactive.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Supports custom voice commands.</li>
    <li>Triggers actions based on recognized speech.</li>
    <li>Works with the Web Speech API (supports both Chrome and Edge with <code>webkitSpeechRecognition</code> fallback).</li>
    <li>Handles both continuous and non-continuous recognition modes.</li>
    <li>Supports multiple languages and dialects, with a wide selection of languages through the <code>LangEnum</code>.</li>
  </ul>

  <h2>Installation</h2>
  <p>To install this package in your project, run the following command:</p>
  <pre><code>npm install react-voice-handler</code></pre>

  <h2>Usage</h2>
  <p>Here’s an example of how to use <code>useVoiceCommands</code> in your React application:</p>
  <code><pre>
import React from 'react';
import { useVoiceCommands, LangEnum } from 'react-voice-handler';

const App: React.FC = () => {
const commands = [
{ command: 'hello', action: () => alert('Hello there!') },
{ command: '안녕하세요', action: () => alert('hello') },
{ command: 'goodbye', action: () => alert('Goodbye!') },
];

const { startRecognition, stopRecognition } = useVoiceCommands(commands, { continuous: true, lang: LangEnum.EnglishUS });

return (
&lt;div&gt;
&lt;h1&gt;Voice Command App&lt;/h1&gt;
&lt;button onClick={startRecognition}&gt;Start Listening&lt;/button&gt;
&lt;button onClick={stopRecognition}&gt;Stop Listening&lt;/button&gt;
&lt;/div&gt;
);
};

export default App;

  </pre></code>

  <h2>Language Support</h2>
  <p>The <code>useVoiceCommands</code> hook supports a wide range of languages and dialects through the <code>LangEnum</code>. By default, it uses <code>LangEnum.EnglishUS</code>, but you can customize the language by passing the <code>lang</code> option in the configuration object.</p>
  <p>For example, to use Spanish (Spain):</p>
  <pre><code>
const { startRecognition, stopRecognition } = useVoiceCommands(commands, { lang: LangEnum.SpanishSpain });
  </code></pre>

  <h3>Available Languages</h3>
  <p>Here are some of the available languages in the <code>LangEnum</code>:</p>
  <ul>
    <li>English (US) - <code>LangEnum.EnglishUS</code></li>
    <li>English (UK) - <code>LangEnum.EnglishUK</code></li>
    <li>Spanish (Spain) - <code>LangEnum.SpanishSpain</code></li>
    <li>French (France) - <code>LangEnum.FrenchFrance</code></li>
    <li>German (Germany) - <code>LangEnum.GermanGermany</code></li>
    <li>Chinese (Simplified) - <code>LangEnum.ChineseSimplified</code></li>
    <li>Japanese (Japan) - <code>LangEnum.JapaneseJapan</code></li>
    <li>Russian (Russia) - <code>LangEnum.RussianRussia</code></li>
    <!-- List other languages as needed -->
  </ul>

  <h2>Continuous vs Non-Continuous Modes</h2>
  <p><strong>Continuous Mode</strong> allows the voice recognition to keep listening after recognizing a command. Use this mode if you expect multiple commands over time without manually restarting the recognition.</p>
  <pre><code>
const { startRecognition, stopRecognition } = useVoiceCommands(commands, { continuous: true });
  </code></pre>

  <p><strong>Non-Continuous Mode</strong> stops the voice recognition after recognizing a command. Use this mode if you only expect a single command and want to manually restart recognition.</p>
  <pre><code>
const { startRecognition, stopRecognition } = useVoiceCommands(commands, { continuous: false });
  </code></pre>

  <h2>Hook API</h2>
  <p>The hook accepts the following parameters:</p>
  <ul>
    <li>
      <code>commands</code>: An array of objects where each object contains a command string and an action function. Example:
      <pre><code>
const commands = [
{ command: 'hello', action: () => alert('Hello there!') },
{ command: '안녕하세요', action: () => alert('hello') },
{ command: 'goodbye', action: () => alert('Goodbye!') },
];
      </code></pre>
    </li>
    <li>
      <code>continuous</code> (optional): A boolean indicating if the recognition should continue after recognizing a command. Default is <code>false</code>.
    </li>
    <li>
      <code>lang</code> (optional): A language variant from the <code>LangEnum</code> enum. Example: <code>LangEnum.EnglishUS</code>. Default is <code>LangEnum.EnglishUS</code>.
    </li>
  </ul>

  <h2>Error Handling</h2>
  <p>The hook allows error handling by passing a custom <code>onError</code> function in the options. For example:</p>
  <pre><code>
const handleError = (error) => {
  console.error('Speech recognition error:', error);
};

const { startRecognition, stopRecognition } = useVoiceCommands(commands, { onError: handleError });
</code></pre>

</body>
</html>
