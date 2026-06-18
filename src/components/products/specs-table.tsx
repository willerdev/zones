import type { ProductSpec } from "@/lib/product-types";
import { cn } from "@/lib/utils";

interface SpecsTableProps {
  specs: ProductSpec[];
  description?: string;
  className?: string;
}

export function SpecsTable({ specs, description, className }: SpecsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-white/10 bg-[#1a1f2e] text-white",
        className
      )}
    >
      {description && (
        <p className="border-b border-white/10 px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm leading-relaxed text-white/80">
          {description}
        </p>
      )}
      <div className="divide-y divide-white/10">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="grid grid-cols-2 divide-x divide-white/10"
          >
            <div className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium">{spec.label}</div>
            <div className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-white/90">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
