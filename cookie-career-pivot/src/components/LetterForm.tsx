import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountrySelect } from "@/components/CountrySelect";
import { stateNames } from "@/data/states";
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
    travelCountries: [],
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
      <SelectTrigger className={`inline-flex w-auto h-auto px-4 py-2 mx-1 text-base border-2 rounded-full font-medium ${className}`}>
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

  const InlineNumber = ({
    value,
    onValueChange,
    min,
    max,
    suffix = "",
    className = "bg-blue-100 border-blue-300"
  }: {
    value: number;
    onValueChange: (value: number) => void;
    min: number;
    max: number;
    suffix?: string;
    className?: string;
  }) => (
    <span className={`inline-flex items-center px-4 py-2 mx-1 border-2 rounded-full font-medium ${className}`}>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Math.max(min, Math.min(max, parseInt(e.target.value) || 0));
          onValueChange(newValue);
        }}
        min={min}
        max={max}
        className="w-10 bg-transparent border-none outline-none text-center font-medium"
      />
      {suffix && <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>}
    </span>
  );


  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Dear Cookie,
        </h1>
      </div>

      <div className="max-w-none text-gray-800 leading-relaxed space-y-6">
        <p>
          Let's map out your path from sonographer to therapist. I know the timeline feels overwhelming, 
          but let's see exactly when you'll be licensed and how old you'll be.
        </p>

        <div className="text-lg">
          First, where are you thinking of getting licensed? I'm looking at{" "}
          <InlineSelect
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value as State })}
            options={[
              { value: "CA", label: stateNames.CA },
              { value: "VA", label: stateNames.VA },
              { value: "OK", label: stateNames.OK }
            ]}
            className="bg-pink-100 border-pink-300"
          />
          {" "}and pursuing a{" "}
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
          {" "}license.
        </div>

        <div className="text-lg">
          After you finish your sonography program in May 2026, let's say you want to take{" "}
          <InlineNumber
            value={formData.travelMonths}
            onValueChange={(value) => setFormData({ ...formData, travelMonths: value })}
            min={0}
            max={24}
            suffix="months"
            className="bg-blue-100 border-blue-300"
          />
          {" "}to travel and explore places like{" "}
          <CountrySelect
            selectedCountries={formData.travelCountries}
            onCountriesChange={(countries) => setFormData({ ...formData, travelCountries: countries })}
            className="bg-blue-100 border-blue-300"
          />.
        </div>

        <div className="text-lg">
          Before jumping into your master's program, would you want to{" "}
          <InlineSelect
            value={formData.workAsSonographer ? "work" : "skip"}
            onValueChange={(value) => {
              const shouldWork = value === "work";
              setFormData({ ...formData, workAsSonographer: shouldWork, workMonths: shouldWork ? 6 : 0 });
            }}
            options={[
              { value: "skip", label: "skip working" },
              { value: "work", label: "work as a sonographer" }
            ]}
            className="bg-green-100 border-green-300"
          />
          {formData.workAsSonographer && (
            <>
              {" "}for about{" "}
              <InlineNumber
                value={formData.workMonths}
                onValueChange={(value) => setFormData({ ...formData, workMonths: value })}
                min={0}
                max={24}
                suffix="months"
                className="bg-green-100 border-green-300"
              />
              {" "}to save money and gain experience?
            </>
          )}
          {!formData.workAsSonographer && " to focus on travel and preparation?"}
        </div>

        <div className="text-lg">
          For your master's program, let's plan on{" "}
          <InlineNumber
            value={formData.programLength}
            onValueChange={(value) => setFormData({ ...formData, programLength: value })}
            min={18}
            max={36}
            suffix="months"
            className="bg-purple-100 border-purple-300"
          />
          {" "}of study. During your residency/associate period, you'll probably work around{" "}
          <InlineNumber
            value={formData.hoursPerWeek}
            onValueChange={(value) => setFormData({ ...formData, hoursPerWeek: value })}
            min={15}
            max={40}
            suffix="hrs/week"
            className="bg-orange-100 border-orange-300"
          />.
        </div>

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