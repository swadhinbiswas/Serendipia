import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export function TerminalDemo() {
  return (
    <Terminal className="border border-opacity-30 border-white bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-2xl p-6 overflow-hidden">
      <div className="relative">
        <TypingAnimation className="text-green-300 font-mono text-lg">
          &gt; pip3 install Serendipia
        </TypingAnimation>

        <AnimatedSpan delay={1500} className="text-yellow-400 font-mono">
          <span>📂 Loading......</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2000} className="text-green-400 font-mono">
          <span>✔ Verifying framework. Found 🐍.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={6000} className="text-cyan-400 font-mono">
          <span>ℹ Updated 7356 files:</span>
          <span className="pl-2">- ╰┈➤ Comming Soon............. </span>
        </AnimatedSpan>

        <TypingAnimation delay={8000} className="text-purple-400 font-mono">
          Happy Coding! 🚀
        </TypingAnimation>
      </div>
    </Terminal>
  );
}