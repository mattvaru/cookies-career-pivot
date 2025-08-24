import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { ScenarioInput, State, LicenseType } from "@/types";

interface LetterFormProps {
  onSubmit: (input: ScenarioInput) => void;
}

export function LetterForm({ onSubmit }: LetterFormProps) {
  const [formData, setFormData] = useState<ScenarioInput>({
    state: "CA",
    license: "LMFT",
    birthdate: new Date("2000-03-23"),
    finishSonography: new Date("2026-05-08"),
    travelMonths: 6,
    workAsSonographer: false,
    workMonths: 0,
    programLength: 24,
    hoursPerWeek: 25,
    directClientRatio: 0.6,
    allowRemoteCoursework: true,
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const InlineSelect = ({ 
    value, 
    onValueChange, 
    options, 
    className = "bg-pink-100 border-pink-300" 
  }: {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
  }) => (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`inline-flex w-auto h-auto px-3 py-1 mx-1 text-base border-2 rounded-full font-medium ${className}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const InlineSlider = ({
    value,
    onValueChange,
    min,
    max,
    className = "bg-blue-100 border-blue-300"
  }: {
    value: number;
    onValueChange: (value: number) => void;
    min: number;
    max: number;
    className?: string;
  }) => (
    <span className={`inline-flex items-center px-3 py-1 mx-1 border-2 rounded-full font-medium ${className}`}>
      <span className="mr-3 text-sm">{value}</span>
      <Slider
        value={[value]}
        onValueChange={(vals) => onValueChange(vals[0])}
        min={min}
        max={max}
        step={1}
        className="w-16"
      />
    </span>
  );

  const InlineSwitch = ({
    checked,
    onCheckedChange,
    label,
    className = "bg-yellow-100 border-yellow-300"
  }: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    className?: string;
  }) => (
    <span className={`inline-flex items-center px-3 py-1 mx-1 border-2 rounded-full font-medium ${className}`}>
      <span className="mr-2 text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Dear Cookie,
        </h1>
      </div>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
        <p>
          Let's map out your path from sonographer to therapist. I know the timeline feels overwhelming, 
          but let's see exactly when you'll be licensed and how old you'll be.
        </p>

        <p>
          First, where are you thinking of getting licensed? I'm looking at
          <InlineSelect
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value as State })}
            options={[
              { value: "CA", label: "California" },
              { value: "VA", label: "Virginia" },
              { value: "OK", label: "Oklahoma" }
            ]}
            className="bg-pink-100 border-pink-300"
          />
          and pursuing a
          <InlineSelect
            value={formData.license}
            onValueChange={(value) => setFormData({ ...formData, license: value as LicenseType })}
            options={[
              { value: "LMFT", label: "LMFT (Marriage & Family)" },
              { value: "LPC", label: "LPC (Professional Counselor)" },
              ...(formData.state === "CA" ? [{ value: "LPCC", label: "LPCC (Clinical Counselor)" }] : []),
              { value: "LCSW", label: "LCSW (Clinical Social Work)" }
            ]}
            className="bg-pink-100 border-pink-300"
          />
          license.
        </p>

        <p>
          After you finish your sonography program in May 2026, let's say you want to take
          <InlineSlider
            value={formData.travelMonths}
            onValueChange={(value) => setFormData({ ...formData, travelMonths: value })}
            min={0}
            max={24}
            className="bg-blue-100 border-blue-300"
          />
          months to travel and explore the world.
        </p>

        <p>
          Before jumping into your master's program, would you want to
          <InlineSwitch
            checked={formData.workAsSonographer}
            onCheckedChange={(checked) => setFormData({ ...formData, workAsSonographer: checked, workMonths: checked ? 6 : 0 })}
            label={formData.workAsSonographer ? "work as a sonographer" : "skip working"}
            className="bg-green-100 border-green-300"
          />
          {formData.workAsSonographer && (
            <>
              for about
              <InlineSlider
                value={formData.workMonths}
                onValueChange={(value) => setFormData({ ...formData, workMonths: value })}
                min={0}
                max={24}
                className="bg-green-100 border-green-300"
              />
              months to save money and gain experience?
            </>
          )}
          {!formData.workAsSonographer && " to focus on travel and preparation?"}
        </p>

        <p>
          For your master's program, let's plan on
          <InlineSlider
            value={formData.programLength}
            onValueChange={(value) => setFormData({ ...formData, programLength: value })}
            min={18}
            max={36}
            className="bg-purple-100 border-purple-300"
          />
          months of study. During your residency/associate period, you'll probably work around
          <InlineSlider
            value={formData.hoursPerWeek}
            onValueChange={(value) => setFormData({ ...formData, hoursPerWeek: value })}
            min={15}
            max={40}
            className="bg-orange-100 border-orange-300"
          />
          hours per week.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Show me my timeline →
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500 italic">
          P.S. — You're going to be just fine. Trust the process.
        </div>
      </div>
    </div>
  );
}