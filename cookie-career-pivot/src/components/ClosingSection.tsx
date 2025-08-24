import { Heart, Star, Zap } from "lucide-react";

export function ClosingSection() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 text-center shadow-xl border border-purple-100">
      <div className="flex justify-center gap-3 mb-6">
        <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
        <Heart className="w-8 h-8 text-pink-500 animate-bounce" />
        <Zap className="w-8 h-8 text-purple-500 animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        You're Not Behind — You're Building Your Path
      </h2>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
        There's time for travel, work, and growth. Whether you take 6 months or 2 years to explore, 
        whether you work first or jump straight in — you'll still be young when you're licensed. 
        Your unique journey brings valuable life experience to your future practice.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-3xl mb-3">🌍</div>
          <h3 className="font-semibold text-gray-800 mb-2">Travel & Explore</h3>
          <p className="text-sm text-gray-600">Life experiences make better therapists</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-3xl mb-3">💪</div>
          <h3 className="font-semibold text-gray-800 mb-2">Work & Save</h3>
          <p className="text-sm text-gray-600">Financial cushion reduces stress</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-semibold text-gray-800 mb-2">Study & Grow</h3>
          <p className="text-sm text-gray-600">Your calling is worth the journey</p>
        </div>
      </div>
      
      <div className="mt-10 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
        <p className="text-purple-800 font-medium italic">
          "The best time to plant a tree was 20 years ago. The second best time is now."
        </p>
        <p className="text-sm text-purple-600 mt-2">— Chinese Proverb</p>
      </div>
    </div>
  );
}