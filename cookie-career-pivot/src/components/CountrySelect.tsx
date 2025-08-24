import { useState, useRef, useEffect } from "react";
import type { Country } from "@/types";
import { countries } from "@/data/countries";

interface CountrySelectProps {
  selectedCountries: Country[];
  onCountriesChange: (countries: Country[]) => void;
  className?: string;
}

export function CountrySelect({ selectedCountries, onCountriesChange, className = "bg-blue-100 border-blue-300" }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCountry = (country: Country) => {
    if (!selectedCountries.find(c => c.code === country.code)) {
      onCountriesChange([...selectedCountries, country]);
    }
  };

  const removeCountry = (countryCode: string) => {
    onCountriesChange(selectedCountries.filter(c => c.code !== countryCode));
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Display Selected Countries */}
      {selectedCountries.length > 0 && (
        <span className="inline-flex items-center gap-1 mr-2">
          {selectedCountries.map((country) => (
            <span
              key={country.code}
              className={`inline-flex items-center gap-1 px-2 py-1 text-sm border-2 rounded-full font-medium ${className}`}
            >
              <span className="text-base">{country.flag}</span>
              <span className="whitespace-nowrap">{country.name}</span>
              <button
                onClick={() => removeCountry(country.code)}
                className="ml-1 text-gray-500 hover:text-gray-700 text-xs"
              >
                ×
              </button>
            </span>
          ))}
        </span>
      )}

      {/* Add Countries Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-4 py-2 mx-1 border-2 rounded-full font-medium text-base ${className} hover:opacity-80`}
      >
        {selectedCountries.length === 0 ? "choose destinations" : "add more"}
        <span className="ml-1">🌍</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.slice(0, 20).map((country) => {
              const isSelected = selectedCountries.find(c => c.code === country.code);
              return (
                <button
                  key={country.code}
                  onClick={() => {
                    if (isSelected) {
                      removeCountry(country.code);
                    } else {
                      addCountry(country);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50 text-blue-900" : ""
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="font-medium">{country.name}</span>
                  {isSelected && <span className="ml-auto text-blue-600 text-sm">✓</span>}
                </button>
              );
            })}
          </div>
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}