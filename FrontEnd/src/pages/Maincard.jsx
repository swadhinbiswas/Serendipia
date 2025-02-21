

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, Volume2, Sparkles } from "lucide-react";

const MainCard = () => {
  const voiceData = useMemo(
    () => ({
      voices: [
        {
          voice: "vale",
          name: "Vale",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/vale.en.bd658fb4.m4a",
          description: "Bright and inquisitive",
        },
        {
          voice: "cove",
          name: "Cove",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/cove.en.91bb1aab.m4a",
          description: "Composed and direct",
        },
        {
          voice: "maple",
          name: "Maple",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/maple.en.abff11d0.m4a",
          description: "Cheerful and candid",
        },
        {
          voice: "ember",
          name: "Ember",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/ember.en.940365d1.m4a",
          description: "Confident and optimistic",
        },
        {
          voice: "juniper",
          name: "Juniper",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/juniper.en.23d92c7e.m4a",
          description: "Open and upbeat",
        },
        {
          voice: "orbit",
          name: "Spruce",
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/orbit.en.be588b89.m4a",
          description: "Calm and affirming",
        },
        {
          voice: "breeze",
          name: "Breeze",
          gain_db: null,
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/breeze.en.5fc1dadf.m4a",
          description: "Animated and earnest",
          bloop_color: "808080",
        },
        {
          voice: "fathom",
          name: "Arbor",
          gain_db: null,
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/fathom.en.048343f4.m4a",
          description: "Easygoing and versatile",
          bloop_color: "808080",
        },
        {
          voice: "glimmer",
          name: "Sol",
          gain_db: null,
          preview_url:
            "https://persistent.oaistatic.com/voice/previews/glimmer.en.e8a6d567.m4a",
          description: "Savvy and relaxed",
          bloop_color: "808080",
        },
      ],
    }),
    [],
  );

  const images = useMemo(
    () => [
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female1.jpg",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/man2.png",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female3.png",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/male3.png",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/women4.jpg",

      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/britishman.jpg",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/boy1.png",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/man4.jpg",
      "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female2.webp",
    ],
    [],
  );

  const audioRef = useRef(new Audio());
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const currentVoice = voiceData.voices[currentVoiceIndex];

  useEffect(() => {
    audioRef.current.src = currentVoice.preview_url;
    audioRef.current.play();
  }, [currentVoice.preview_url]);

  const handlePrevVoice = () => {
    setCurrentVoiceIndex((prev) =>
      prev === 0 ? voiceData.voices.length - 1 : prev - 1,
    );
  };

  const handleNextVoice = () => {
    setCurrentVoiceIndex((prev) =>
      prev === voiceData.voices.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="col-span-3 lg:col-span-1 row-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xl hover:bg-white/20 transition-colors duration-300 cursor-pointer">
          <Sparkles className="text-white" size={20} />
        </div>
        <div className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-transparent">
          Serendipia
        </div>
      </div>

      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
        Your AI Study
      </div>
      <div className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
        Partner
      </div>

      <div className="relative mt-8">
        <img
          src={images[currentVoiceIndex]}
          alt="AI Model"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="text-center mt-2 font-semibold">{currentVoice.name}</div>
      <div className="text-center mt-1 text-sm text-blue-200">
        {currentVoice.description}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePrevVoice}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <button
          onClick={handleNextVoice}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          <ArrowRight className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MainCard;
