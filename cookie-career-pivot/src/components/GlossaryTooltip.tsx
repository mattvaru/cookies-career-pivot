import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { glossary } from "@/data/glossary";
import { HelpCircle } from "lucide-react";

interface GlossaryTooltipProps {
  term: string;
  children?: ReactNode;
  showIcon?: boolean;
}

export function GlossaryTooltip({ term, children, showIcon = false }: GlossaryTooltipProps) {
  const definition = glossary[term];
  
  if (!definition) {
    return <>{children || term}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted decoration-purple-400 cursor-help inline-flex items-center gap-1">
            {children || term}
            {showIcon && <HelpCircle className="w-3 h-3 text-purple-500" />}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-purple-900 text-white border-purple-700">
          <p className="text-sm">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function enrichTextWithTooltips(text: string): ReactNode {
  const terms = Object.keys(glossary);
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    const upperPart = part.toUpperCase();
    if (terms.some(term => term.toUpperCase() === upperPart)) {
      const matchingTerm = terms.find(term => term.toUpperCase() === upperPart);
      return <GlossaryTooltip key={index} term={matchingTerm || part}>{part}</GlossaryTooltip>;
    }
    return part;
  });
}