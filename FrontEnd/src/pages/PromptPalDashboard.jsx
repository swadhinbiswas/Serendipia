import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Users,
  GitBranch,
  KeyRound,
  Star,
} from "lucide-react";

const features = [
  {
    Icon: Sparkles,
    name: "Effortless Prompt Perfection",
    description: (
      <div className="space-y-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Prompt
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Perfection
        </div>
        <div className="mt-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-400" />
            14 days trial
          </div>
          <div className="mt-1">after - $5/month</div>
        </div>
      </div>
    ),
    className: "lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-0 text-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300",
    iconClassName: "text-yellow-400 p-2 bg-yellow-400/10 rounded-lg",
  },
  {
    Icon: Star,
    name: (
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        25M+
      </div>
    ),
    description: (
      <div className="text-sm text-slate-400">created prompts</div>
    ),
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-0 text-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300",
    iconClassName: "text-blue-400 p-2 bg-blue-400/10 rounded-lg",
  },
  {
    Icon: Users,
    name: (
      <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        12K
      </div>
    ),
    description: (
      <div>
        <div className="text-sm text-slate-400">happy users</div>
        <div className="flex -space-x-3 mt-4">
          <div className="w-10 h-10 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-yellow-400 to-red-500"></div>
          <div className="w-10 h-10 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-blue-400 to-blue-500"></div>
          <div className="w-10 h-10 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-blue-400 to-cyan-500"></div>
        </div>
      </div>
    ),
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-0 text-white hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300",
    iconClassName: "text-yellow-400 p-2 bg-yellow-400/10 rounded-lg",
  },
  {
    Icon: GitBranch,
    name: "Branching Paths",
    description: "Explore multiple prompt directions with branching.",
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-0 text-white hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300",
    iconClassName: "text-yellow-400 p-2 bg-yellow-400/10 rounded-lg",
  },
  {
    Icon: KeyRound,
    name: "Keyword Enhancer",
    description: (
      <div>
        <div className="text-sm text-slate-400 mb-4">
          Use pre-made templates to jumpstart creativity.
        </div>
        <Badge className="bg-gradient-to-r from-yellow-400/20 to-blue-400/20 text-yellow-400 border-yellow-400/50">
          14 days trial
        </Badge>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className="bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">Rewrite</Badge>
          <Badge className="bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">PNG</Badge>
          <Badge className="bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">JPG</Badge>
          <Badge className="bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer">PDF</Badge>
        </div>
      </div>
    ),
    className: "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border-0 text-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300",
    iconClassName: "text-blue-400 p-2 bg-blue-400/10 rounded-lg",
  },
];

const MainCard = () => (
  <div className="col-span-3 lg:col-span-1 row-span-2 bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
    <div className="flex justify-between items-center mb-4">
      <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xl">
        <Sparkles className="text-white" size={20} />
      </div>
      <div className="text-lg font-semibold">Serendia</div>
    </div>
    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Your AI Prompt
    </div>
    <div className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Companion
    </div>
    
    <div className="relative mt-8 group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-yellow-500/30 rounded-full group-hover:from-blue-500/40 group-hover:to-yellow-400/40 transition-all duration-300"></div>
      <div className="relative aspect-square rounded-full bg-slate-900/60 overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-blue-500 via-blue-500 to-yellow-500 blur-xl animate-spin-slow opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function PromptPalDashboard() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MainCard />
          <div className="col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <BentoCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="py-6 px-10 text-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
            <Sparkles className="mr-2" size={20} />
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}