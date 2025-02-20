import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainCard from "./Maincard";
import {
  Sparkles,
  Users,
  GitBranch,
  KeyRound,
  Star,
  RefreshCw,
  FileImage,
  FileText,
  File,
} from "lucide-react";

const features = [
  {
    Icon: Sparkles,
    name: "Effortless Prompt Perfection",
    description: (
      <div className="space-y-2">
        <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-600 bg-clip-text text-transparent">
          Prompt Perfection
        </div>
        <div className="mt-6 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-blue-600" />
            <span>Craft flawless prompts, every time.</span>
            <span className="text-xs text-blue-400 font-medium"></span>
          </div>
          <div className="mt-1 text-gray-600"></div>
        </div>
      </div>
    ),
    className:
      "lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-white to-blue-50 backdrop-blur-xl border-2 border-blue-400 text-slate-800 hover:shadow-xl hover:shadow-blue-400/30 transition-all duration-300 rounded-xl p-6",
    iconClassName:
      "text-blue-600 p-3 bg-blue-100 rounded-lg shadow-md shadow-blue-300/50",
  },

  {
    Icon: Star,
    name: (
      <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
        25M+
      </div>
    ),
    description: (
      <div className="text-sm text-slate-700 font-medium">created prompts</div>
    ),
    className:
      "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-white to-indigo-50 backdrop-blur-xl border-2 border-indigo-200 text-slate-800 hover:shadow-lg hover:shadow-indigo-400/20 transition-all duration-300 rounded-xl p-6",
    iconClassName:
      "text-indigo-600 p-3 bg-indigo-100 rounded-lg shadow-md shadow-indigo-200/50",
  },

  {
    Icon: Users,
    name: (
      <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
        12K
      </div>
    ),
    description: (
      <div>
        <div className="text-sm text-slate-700 font-medium">Happy Users</div>
        <div className="flex -space-x-3 mt-4">
          <div className="w-10 h-10 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md shadow-blue-400/30"></div>
          <div className="w-10 h-10 rounded-full ring-2 ring-white bg-gradient-to-br from-indigo-400 to-blue-500 shadow-md shadow-indigo-400/30"></div>
          <div className="w-10 h-10 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-500 to-indigo-400 shadow-md shadow-blue-400/30"></div>
        </div>
      </div>
    ),
    className:
      "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-white to-blue-50 backdrop-blur-xl border border-blue-200 text-slate-800 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300 rounded-2xl p-6",
    iconClassName:
      "text-blue-600 p-3 bg-blue-100 rounded-lg shadow-md shadow-blue-300/50",
  },

  {
    Icon: GitBranch,
    name: "Branching Paths",
    description: (
      <div className="text-sm text-slate-700 font-medium">
        Explore multiple prompt directions with branching.
      </div>
    ),
    className:
      "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-white to-indigo-50 backdrop-blur-xl border border-indigo-200 text-slate-800 hover:shadow-lg hover:shadow-indigo-400/20 transition-all duration-300 rounded-2xl p-6",
    iconClassName:
      "text-indigo-600 p-3 bg-indigo-100 rounded-lg shadow-md shadow-indigo-300/50",
  },

  {
    Icon: KeyRound,
    name: "Study Mode",
    description: (
      <div>
        <div className="text-sm text-slate-700 mb-4 font-medium">
          Study mode for focused writing.
        </div>

        <span className="text-xs text-blue-400 font-medium"></span>
        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-blue-400 shadow-md shadow-blue-500/30 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
          Start Study
        </Badge>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className="bg-white hover:bg-amber-100 text-amber-700 transition-all duration-300 cursor-pointer shadow-sm shadow-amber-200/50 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border-2 border-transparent bg-clip-border border-gradient-to-r from-amber-400 to-amber-600">
            <RefreshCw className="w-4 h-4" /> Rewrite
          </Badge>
          <Badge className="bg-white hover:bg-blue-100 text-blue-700 transition-all duration-300 cursor-pointer shadow-sm shadow-blue-200/50 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border-2 border-transparent bg-clip-border border-gradient-to-r from-blue-400 to-blue-600">
            <FileImage className="w-4 h-4" /> PNG
          </Badge>
          <Badge className="bg-white hover:bg-emerald-100 text-emerald-700 transition-all duration-300 cursor-pointer shadow-sm shadow-emerald-200/50 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border-2 border-transparent bg-clip-border border-gradient-to-r from-emerald-400 to-emerald-600">
            <FileImage className="w-4 h-4" /> JPG
          </Badge>
          <Badge className="bg-white hover:bg-rose-100 text-rose-700 transition-all duration-300 cursor-pointer shadow-sm shadow-rose-200/50 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 border-2 border-transparent bg-clip-border border-gradient-to-r from-rose-400 to-rose-600">
            <FileText className="w-4 h-4" /> PDF
          </Badge>
        </div>
      </div>
    ),
    className:
      "lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl border border-blue-200 text-slate-800 shadow-lg shadow-blue-200/40 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 rounded-2xl p-5",
    iconClassName:
      "text-blue-700 p-3.5 bg-blue-100 rounded-xl shadow-lg shadow-blue-300/40 hover:bg-blue-200 transition-all duration-300",
  },
];

export default function PromptPalDashboard() {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800 min-h-screen p-6">
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
          <Button className="py-6 px-10 text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-blue-500/50 transition-all duration-300 rounded-full text-white">
            <Sparkles className="mr-2 text-white" size={20} />
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
