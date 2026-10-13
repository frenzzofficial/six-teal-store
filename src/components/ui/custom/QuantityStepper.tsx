"use client";

import { cn } from "@/packages/utils/cn";
import IconsLibrary from "../icon/IconsLibrary";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn("quantity-stepper", className)}>
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <IconsLibrary name="Minus" />
      </button>
      <span className="quantity-stepper__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <IconsLibrary name="Plus" />
      </button>
    </div>
  );
}
