import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowLeft, ArrowRight, Volume2 } from "lucide-react";

const MainCard = () => {
  const voiceData = {
    selected: "vale",
    voices: [
      {
        voice: "vale",
        name: "Vale",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/vale.en.bd658fb4.m4a",
        description: "Bright and inquisitive",
        bloop_color: "808080",
      },
      {
        voice: "cove",
        name: "Cove",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/cove.en.91bb1aab.m4a",
        description: "Composed and direct",
        bloop_color: "808080",
      },
      {
        voice: "maple",
        name: "Maple",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/maple.en.abff11d0.m4a",
        description: "Cheerful and candid",
        bloop_color: "808080",
      },
      {
        voice: "ember",
        name: "Ember",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/ember.en.940365d1.m4a",
        description: "Confident and optimistic",
        bloop_color: "808080",
      },
      {
        voice: "juniper",
        name: "Juniper",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/juniper.en.23d92c7e.m4a",
        description: "Open and upbeat",
        bloop_color: "808080",
      },
      {
        voice: "orbit",
        name: "Spruce",
        gain_db: null,
        preview_url:
          "https://persistent.oaistatic.com/voice/previews/orbit.en.be588b89.m4a",
        description: "Calm and affirming",
        bloop_color: "808080",
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
  };

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [audioCache, setAudioCache] = useState({});

  const images = [
    "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female1.jpg",
    "https://source.unsplash.com/200x200/?ai,model2",
    "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female3.png",
    "https://source.unsplash.com/200x200/?ai,model4",
    "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/women4.jpg",
    "https://source.unsplash.com/200x200/?ai,model6",
    "https://source.unsplash.com/200x200/?ai,model7",
    "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/britishman.jpg",
    "https://raw.githubusercontent.com/swadhinbiswas/Serendipia/refs/heads/main/FrontEnd/src/assets/agentsphoto/female2.webp",
  ];

  const currentVoice = voiceData.voices[currentVoiceIndex];

  // Preload audio files
  useEffect(() => {
    voiceData.voices.forEach((voice) => {
      const audio = new Audio();
      audio.src = voice.preview_url;
      audio.preload = "auto";
      setAudioCache((prev) => ({ ...prev, [voice.voice]: audio }));
    });
  }, []);

  // Handle voice changes and autoplay
  useEffect(() => {
    if (audioRef.current) {
      // Stop any currently playing audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Set new source and play
      audioRef.current.src = currentVoice.preview_url;

      // Load and play the audio
      const playAudio = async () => {
        try {
          await audioRef.current.load();
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
              });
          }
        } catch (error) {
          console.log("Audio loading error:", error);
        }
      };

      playAudio();
    }
  }, [currentVoiceIndex]);

  const handlePrevVoice = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? voiceData.voices.length - 1 : prevIndex - 1,
    );
    setCurrentVoiceIndex((prevIndex) =>
      prevIndex === 0 ? voiceData.voices.length - 1 : prevIndex - 1,
    );
  };

  const handleNextVoice = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === voiceData.voices.length - 1 ? 0 : prevIndex + 1,
    );
    setCurrentVoiceIndex((prevIndex) =>
      prevIndex === voiceData.voices.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePlayVoice = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="col-span-3 lg:col-span-1 row-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
      <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

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

      <div className="relative mt-8 group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-yellow-400/40 rounded-full group-hover:from-blue-400/50 group-hover:to-yellow-300/50 transition-all duration-300"></div>

        <div className="relative aspect-square rounded-full bg-slate-900/60 overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-yellow-400 blur-xl animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <img
            src={images[currentImageIndex]}
            alt="AI Model"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="text-center mt-2 font-semibold">{currentVoice.name}</div>
      <div className="text-center mt-1 text-sm text-blue-200">
        {currentVoice.description}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePrevVoice}
          className="p-2 bg-white/10 rounded-full backdrop-blur-xl hover:bg-white/20 transition-colors duration-300"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>

        <button
          onClick={handlePlayVoice}
          className={`p-2 ${
            isPlaying ? "bg-blue-400/30" : "bg-white/10"
          } rounded-full backdrop-blur-xl hover:bg-white/20 transition-colors duration-300`}
        >
          <Volume2 className="text-white" size={20} />
        </button>

        <button
          onClick={handleNextVoice}
          className="p-2 bg-white/10 rounded-full backdrop-blur-xl hover:bg-white/20 transition-colors duration-300"
        >
          <ArrowRight className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MainCard;
