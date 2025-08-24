import type { Milestone } from "@/types";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Book, GraduationCap } from "lucide-react";

interface MilestoneCardsProps {
  milestones: Milestone[];
  ageAtLicense: number;
}

export function MilestoneCards({ milestones, ageAtLicense }: MilestoneCardsProps) {

  const keyMilestones = milestones.filter(m => 
    m.label.includes("Graduate") || 
    m.label.includes("Licensed") || 
    m.label.includes("Start Master")
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {keyMilestones.map((milestone, index) => (
          <Card 
            key={index} 
            className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {milestone.label.includes("Licensed") ? (
                    <Trophy className="w-5 h-5 text-purple-600" />
                  ) : milestone.label.includes("Graduate") ? (
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Book className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-700">
                    {Math.floor(milestone.age)}
                  </div>
                  <div className="text-xs text-gray-500">years old</div>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-1">{milestone.label}</h4>
              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{format(milestone.date, "MMMM yyyy")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-300 shadow-xl">
        <CardContent className="p-8 text-center">
          <Trophy className="w-12 h-12 text-rose-600 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            Licensed by Age {Math.floor(ageAtLicense)}
          </h3>
          <p className="text-gray-600">
            You'll have decades of fulfilling practice ahead of you! 🌟
          </p>
        </CardContent>
      </Card>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          All Milestones
        </h3>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-2xl">{milestone.icon || "📍"}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{milestone.label}</div>
                <div className="text-sm text-gray-500">{milestone.description}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-purple-600">Age {Math.floor(milestone.age)}</div>
                <div className="text-xs text-gray-500">{format(milestone.date, "MMM yyyy")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

