// src/components/HomePage.tsx
import React from "react";
import { Clock, Plus, Lock, Unlock, Calendar, Sparkles } from "lucide-react";
import type { HomePageProps } from "../types";

const HomePage: React.FC<HomePageProps> = ({
  capsules,
  setSelectedCapsule,
  setCurrentPage,
  getMoodEmoji,
  getColorClasses,
  formatDate,
  deleteCapsule,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Clock className="w-12 h-12 text-yellow-300 mr-3" />
          <h1 className="text-5xl font-bold text-white">Time Capsule</h1>
        </div>
        <p className="text-xl text-purple-200">Preserve your memories for tomorrow</p>
      </div>

      <div className="text-center mb-12">
        <button
          onClick={() => setCurrentPage("create")}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center mx-auto"
        >
          <Plus className="w-6 h-6 mr-2" />
          Create Time Capsule
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule) => (
          <div
            key={capsule.id}
            className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105`}
            onClick={() => {
              setSelectedCapsule(capsule);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(capsule.color)} flex items-center justify-center`}>
                {capsule.isLocked ? <Lock className="w-6 h-6 text-white" /> : <Unlock className="w-6 h-6 text-white" />}
              </div>
              <span className="text-2xl">{getMoodEmoji(capsule.mood)}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{capsule.title}</h3>
            <p className="text-purple-200 text-sm mb-4">
              {capsule.isLocked ? "Opens on" : "Opened on"}: {formatDate(capsule.openDate)}
            </p>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                capsule.isLocked 
                  ? "bg-yellow-500/20 text-yellow-300" 
                  : "bg-green-500/20 text-green-300"
              }`}>
                {capsule.isLocked ? "Sealed" : "Opened"}
              </span>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-300" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCapsule(String(capsule.id));
                  }}
                  className="text-sm text-red-300 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {capsules.length === 0 && (
        <div className="text-center py-20">
          <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Your journey begins here</h3>
          <p className="text-purple-200 text-lg">Create your first time capsule and preserve this moment forever</p>
        </div>
      )}
    </div>
  </div>
);

export default HomePage;
