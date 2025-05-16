'use client';

import { useState } from 'react';

function extractHtmlFromMarkdown(str) {
  const match = str.match(/```html\\s*([\\s\\S]*?)```/i);
  return match ? match[1].trim() : '';
}

function extractAllNonHtmlFromMarkdown(str) {
  return str.replace(/```html[\s\S]*?```/gi, '').trim();
}

function stripUpToDoctype(str) {
  // This will remove everything before the first '<!DOCTYPE'
  return str.replace(/^[\s\S]*?(?=<!DOCTYPE)/, '');
}

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages((currentMessages) => [...currentMessages, { role: 'user', content: input }]);
    setIsLoading(true);
    const response = await fetch('/api/generate-ai', {
      method: 'POST',
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: input }],
      }),
    });

    const { messages: newMessages } = await response.json();

    console.log('newMessages: ', newMessages);
    setHtml(stripUpToDoctype(newMessages[newMessages.length - 1].content).replace(/```/g, ''));
    setIsLoading(false);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  message.role === 'user' ? 'bg-gray-100 text-right self-end' : 'bg-primary-100 text-black self-start'
                }`}
              >
                {message.role === 'user' ? 'You: ' : 'AI: '}
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
              name="prompt"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-100"
              placeholder="prompt your design here..."
              autoComplete="off"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-100 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-200 transition-colors flex items-center justify-center min-w-[90px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
        <div className="w-full min-h-[300px] flex items-center justify-center mt-4 ml-4">
          {html && (
            <iframe
              srcDoc={html}
              title="Generated UI"
              className="w-full h-[600px] rounded-lg border border-gray-200 dark:border-[#5C5A5A] shadow-md bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}
