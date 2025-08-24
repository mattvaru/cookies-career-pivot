import { Sparkles, Heart, Compass } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
            <Heart className="w-8 h-8 text-pink-300 absolute -top-2 -right-2 animate-bounce" />
            <Compass className="w-8 h-8 text-blue-300 absolute -bottom-2 -left-2 animate-spin-slow" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
          Cookie's Career Pivot Guide
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-purple-100">
          From Sonography ➜ Therapist (with travel + breathing room)
        </p>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-white/90 leading-relaxed">
            Explore different paths to your therapy license. See how travel breaks, work experience, 
            and program choices affect your timeline. You have more time than you think! 🌟
          </p>
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2">
            📍 Choose your state
          </div>
          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2">
            ✈️ Plan your travel
          </div>
          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2">
            📚 Pick your program
          </div>
          <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2">
            🎯 See your timeline
          </div>
        </div>
      </div>
    </div>
  );
}