"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  ChevronRight,
  ChevronLeft,
  Globe,
  Linkedin,
  Calendar,
} from "lucide-react";
import { Message } from "@/app/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { format } from "date-fns";
import { Profile } from "@/app/types/profile";

interface ChatInterfaceProps {
  profile: Profile;
}

export function ChatInterface({ profile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi! I'm ${profile.user.first_name}'s AI clone. How can I help you today?`,
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm an AI clone still in development. I'll be able to provide more meaningful responses soon!",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[600px] px-4">
      <Collapsible className="relative">
        <Card
          className={`flex flex-col h-full bg-orbit-dark/50 border-orbit-primary/20 ${
            isProfileOpen ? "rounded-l-none" : ""
          }`}
        >
          <div className="p-4 border-b border-orbit-primary/20">
            <h2 className="text-lg font-semibold">
              Chat with {profile.user.first_name}'s AI Clone
            </h2>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-orbit-primary text-white"
                        : "bg-orbit-dark/70 border border-orbit-primary/20"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-orbit-dark/70 border border-orbit-primary/20">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-orbit-secondary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-orbit-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-orbit-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-orbit-primary/20">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-orbit-dark/30 border border-orbit-primary/20 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-orbit-primary min-h-[44px] max-h-[120px]"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-orbit-primary hover:bg-orbit-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Collapsible>
    </div>
  );
}
