"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const predefinedPrompts = [
  "How can I manage my time better?",
  "Can you suggest some productivity hacks?",
  "What are some productivity tools you recommend?",
  "How do I set effective goals?",
  "Can you help me create a daily schedule?",
  "How can I improve my focus at work?",
];

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: "api/chat",
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handlePromptClick = (prompt: string) => {
    const event = {
      target: { value: prompt },
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>;

    handleInputChange(event);
    handleSubmit();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div className="relative flex flex-col h-[80vh] w-full max-w-[672px] mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-auto p-4 pb-[6rem]">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'assistant' ? 'items-start' : 'justify-end'}`}
            >
              {message.role === 'assistant' ? (
                <>
                  <div className="p-2 bg-gray-200 rounded-full">
                    <Image src="/ai1.png" alt="AI" width={24} height={24} />
                  </div>
                  <div className="message-bubble assistant-bubble">
                    <Markdown className="text-sm">{message.content}</Markdown>
                  </div>
                </>
              ) : (
                <div className="message-bubble user-bubble">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full mb-16">
            <Image src="/ai.png" alt="AI" width={300} height={300} />
            <p className="text-xl font-semibold text-gray-500 mt-4">Welcome to the Productivity Coach Chatbot!</p>
          </div>
        )}
      </div>
      <div className="bg-gray-100 px-4 py-3 border-t border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Textarea
              placeholder="Type your message..."
              className="rounded-lg pr-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              rows={1}
              value={input}
              onChange={handleInputChange}
              onFocus={() => setIsTextAreaFocused(true)}
              onBlur={() => setIsTextAreaFocused(false)}
            />
            {!isLoading ? (
              <Button
                type="submit"
                size="icon"
                disabled={!input || isLoading}
                className={`absolute bottom-3 right-3 ${isTextAreaFocused ? 'bg-[#ffc642]' : 'bg-[#484848]'} hover:${isTextAreaFocused ? 'bg-[#e5a623]' : 'bg-[#383838]'} text-white`}
                aria-label="Send"
              >
                <SendIcon className="w-6 h-6" />
                <span className="sr-only">Send</span>
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                disabled={!isLoading}
                onClick={stop}
                className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-600 text-white"
                aria-label="Stop"
              >
                <SquareIcon className="w-6 h-6" />
                <span className="sr-only">Stop</span>
              </Button>
            )}
          </div>
        </form>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full text-gray-700 hover:bg-gray-100"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            {showSuggestions ? (
              <>
                <ChevronUpIcon className="w-5 h-5 mr-2" />
                Hide Suggestions
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-5 h-5 mr-2" />
                Show Suggestions
              </>
            )}
          </Button>
          {showSuggestions && (
            <div className="flex flex-wrap gap-2 w-full mt-2">
              {predefinedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  className="bg-white text-gray-700 hover:bg-gray-100"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
