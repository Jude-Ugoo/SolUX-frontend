'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Smartphone, MessageSquare, Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logos/solux-beta.png';
import Image from 'next/image';
import { useRouter } from "next/navigation";



function stripUpToDoctype(str) {
  // This will remove everything before the first '<!DOCTYPE'
  return str.replace(/^[\s\S]*?(?=<!DOCTYPE)/, '');
}

const PromptBuilder = () => {
  const router = useRouter();
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
    <>
      <div className="w-full min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold text-[#00FF94]">
              {/* Logo */}
              <div onClick={() => router.push('/')} className="flex justify-center items-center cursor-pointer">
                <Image src={logo} alt="SolUX Logo" className="w-[160px] object-contain" />
              </div>
          </div>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <span>30 Prompt left</span>
            <Menu className="w-5 h-5" />
          </div>
        </div>

        {/* Prompt Card */}
        <div className="max-w-3xl mx-auto border rounded-xl p-6 flex-col">
          <h2 className="text-xl font-semibold mb-4">What are we building today, Sozy?</h2>
          <Textarea
            placeholder="Describe your idea"
            className="mb-4 min-h-[150px] bg-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-gray-300">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="bg-black text-white rounded-full text-sm px-6"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>

          {/* Generated UI Section */}
          <div className="max-w-3xl mx-auto min-h-[300px] flex items-center justify-center mt-4 mb-4 ml-4">
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

        {/* History Section */}
        <div className="max-w-3xl mx-auto mb-8 mt-8">
          <h3 className="font-semibold text-gray-800 mb-2">History</h3>
          <div className="border-b border-gray-200"></div>
        </div>

        {/* Events & Contests Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-semibold text-gray-800 mb-2">Events and contest</h3>
          <div className="border-b border-gray-200"></div>
        </div>
      </div>
    </>
  );
};

export default PromptBuilder;
