// src/components/ViewPage.tsx
import React from "react";
import { ArrowLeft, Lock, Unlock, Clock, Star, MessageCircle, Heart, Trash2 } from "lucide-react";
import type { ViewPageProps } from "../types";

const ViewPage: React.FC<ViewPageProps> = ({
  capsule,
  openCapsule,
  deleteCapsule,
  formatDate,
  getMoodEmoji,
  getColorClasses,
  setCurrentPage,
}) => {
  if (!capsule) return null;

  const canOpen = new Date(capsule.openDate) <= new Date();
  const isLocked = capsule.isLocked && !canOpen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentPage("home")}
            className="bg-white/10 backdrop-blur-lg rounded-full p-3 mr-4 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-4xl font-bold text-white">{capsule.title}</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getColorClasses(capsule.color)} flex items-center justify-center mx-auto mb-4`}>
              {isLocked ? <Lock className="w-10 h-10 text-white" /> : <Unlock className="w-10 h-10 text-white" />}
            </div>
            <div className="text-4xl mb-2">{getMoodEmoji(capsule.mood)}</div>
            <p className="text-pink-200">Created on {formatDate(capsule.createdAt)}</p>
            <p className="text-pink-200">{isLocked ? "Opens on" : "Opened on"} {formatDate(capsule.openDate)}</p>
          </div>

          {isLocked ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">This capsule is still sealed</h3>
              <p className="text-pink-200 text-lg mb-8">Come back on {formatDate(capsule.openDate)} to unlock your memories</p>

              {canOpen && (
                <button
                  onClick={() => openCapsule(capsule)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 mb-4"
                >
                  <Unlock className="w-6 h-6 mr-2 inline" />
                  Open Time Capsule
                </button>
              )}

              <button
                onClick={() => deleteCapsule(String(capsule.id))}
                className="mt-4 text-sm text-red-300 hover:text-red-500 flex items-center justify-center mx-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Capsule
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <Star className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message from the past</h3>
                {capsule.openedAt && <p className="text-pink-200">Opened on {formatDate(capsule.openedAt)}</p>}
              </div>

              <div className="bg-white/20 rounded-xl p-6 border border-white/30">
                <div className="flex items-start mb-4">
                  <MessageCircle className="w-6 h-6 text-pink-300 mr-3 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">{capsule.message}</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-pink-200 italic">"Every moment is a gift from yesterday to tomorrow"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
