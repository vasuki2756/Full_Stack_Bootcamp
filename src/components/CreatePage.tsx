// src/components/CreatePage.tsx
import React from "react";
import { ArrowLeft, Send } from "lucide-react";
import type { CreatePageProps } from "../types";

const CreatePage: React.FC<CreatePageProps> = ({
  newCapsule,
  setNewCapsule,
  createCapsule,
  getMoodEmoji,
  getColorClasses,
  setCurrentPage,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentPage("home")}
            className="bg-white/10 backdrop-blur-lg rounded-full p-3 mr-4 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-4xl font-bold text-white">Create Your Time Capsule</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-3">Give your capsule a title</label>
            <input
              type="text"
              value={newCapsule.title}
              onChange={(e) => setNewCapsule({ ...newCapsule, title: e.target.value })}
              placeholder="My hopes for 2026..."
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-3">Your message to the future</label>
            <textarea
              value={newCapsule.message}
              onChange={(e) => setNewCapsule({ ...newCapsule, message: e.target.value })}
              placeholder="Dear future me..."
              rows={6}
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-3">When should this open?</label>
            <input
              type="date"
              value={newCapsule.openDate}
              onChange={(e) => setNewCapsule({ ...newCapsule, openDate: e.target.value })}
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-lg font-semibold mb-3">How are you feeling?</label>
            <div className="grid grid-cols-5 gap-3">
              {["hopeful", "grateful", "excited", "nostalgic", "dreamy", "happy", "sad"].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setNewCapsule({ ...newCapsule, mood: mood as any })}
                  className={`p-3 rounded-xl text-center transition-all duration-300 ${
                    newCapsule.mood === mood
                      ? "bg-white/30 border-2 border-cyan-400"
                      : "bg-white/10 border border-white/20 hover:bg-white/20"
                  }`}
                >
                  <div className="text-2xl mb-1">{getMoodEmoji(mood as any)}</div>
                  <div className="text-white text-sm capitalize">{mood}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">Choose a color</label>
            <div className="flex gap-3">
              {["blue", "pink", "green", "orange", "purple"].map((color) => (
                <button
                  key={color}
                  onClick={() => setNewCapsule({ ...newCapsule, color: color as any })}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(color as any)} border-4 transition-all duration-300 ${
                    newCapsule.color === color ? "border-white scale-110" : "border-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={createCapsule}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-xl text-xl font-semibold hover:from-cyan-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <Send className="w-6 h-6 mr-2" />
            Seal Time Capsule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
