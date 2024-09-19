<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Voice Handler - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    code {
      padding: 4px;
      border-radius: 4px;
      font-family: monospace;
    }
    pre {
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    ul {
      padding-left: 20px;
    }
    button {
      margin: 5px 0;
    }
  </style>
</head>
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
  </ul>

  <h2>Installation</h2>
  <p>To install this package in your project, run the following command:</p>
  <pre><code>npm install react-voice-handler</code></pre>

  <h2>Usage</h2>
  <p>Here’s an example of how to use <code>useVoiceCommands</code> in your React application:</p>
  <pre><code>
import React from 'react';
import { useVoiceCommands } from 'react-voice-handler';

const App: React.FC = () => {
  const commands = [
    { command: 'hello', action: () => alert('Hello there!') },
    { command: 'goodbye', action: () => alert('Goodbye!') },
  ];

  const { startRecognition, stopRecognition } = useVoiceCommands(commands, true); // Continuous mode

  return (
    &lt;div&gt;
      &lt;h1&gt;Voice Command App&lt;/h1&gt;
      &lt;button onClick={startRecognition}&gt;Start Listening&lt;/button&gt;
      &lt;button onClick={stopRecognition}&gt;Stop Listening&lt;/button&gt;
    &lt;/div&gt;
  );
};

export default App;
  </code></pre>

  <h2>Continuous vs Non-Continuous Modes</h2>
  <p><strong>Continuous Mode</strong> allows the voice recognition to keep listening after recognizing a command. Use this mode if you expect multiple commands over time without manually restarting the recognition.</p>
  <pre><code>
const { startRecognition, stopRecognition } = useVoiceCommands(commands, true); // Continuous mode
  </code></pre>

  <p><strong>Non-Continuous Mode</strong> stops the voice recognition after recognizing a command. Use this mode if you only expect a single command and want to manually restart recognition.</p>
  <pre><code>
const { startRecognition, stopRecognition } = useVoiceCommands(commands, false); // Non-continuous mode
  </code></pre>

  <h2>Hook API</h2>
  <p>The hook accepts the following parameters:</p>
  <ul>
    <li>
      <code>commands</code>: An array of objects where each object contains a command string and an action function. Example:
      <pre><code>
const commands = [
  { command: 'hello', action: () => alert('Hello there!') },
  { command: 'goodbye', action: () => alert('Goodbye!') },
];
      </code></pre>
    </li>
    <li>
      <code>continuous</code> (optional): A boolean indicating if the recognition should continue after recognizing a command. Default is <code>false</code>.
    </li>
  </ul>

</body>
</html>
