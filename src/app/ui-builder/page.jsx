"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Smartphone, MessageSquare, Menu } from "lucide-react";

const PromptBuilder = () => {
  return (
    <div className="w-full min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold text-[#00FF94]">BETA</div>
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          <span>30 Prompt left</span>
          <Menu className="w-5 h-5" />
        </div>
      </div>

      {/* Prompt Card */}
      <div className="max-w-3xl mx-auto border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          What are we building today, Sozy?
        </h2>
        <Textarea
          placeholder="Describe your idea"
          className="mb-4 min-h-[150px] bg-white"
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
          <Button className="bg-black text-white rounded-full text-sm px-6">
            Generate
          </Button>
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-3xl mx-auto mb-8">
        <h3 className="font-semibold text-gray-800 mb-2">History</h3>
        <div className="border-b border-gray-200"></div>
      </div>

      {/* Events & Contests Section */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-semibold text-gray-800 mb-2">Events and contest</h3>
        <div className="border-b border-gray-200"></div>
      </div>
    </div>
  );
};

export default PromptBuilder;
