import { Icon } from "@/components/ui";
import { cn } from "@/packages/utils/cn";

const STEPS = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirmation" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

type CheckoutStepperProps = {
  current: StepKey;
};

export function CheckoutStepper({ current }: CheckoutStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="checkout-stepper">
      {STEPS.map((step, i) => {
        const status =
          i < currentIndex
            ? "done"
            : i === currentIndex
              ? "active"
              : "upcoming";
        return (
          <li
            key={step.key}
            className={cn(
              "checkout-stepper__step",
              `checkout-stepper__step--${status}`,
            )}
          >
            <span className="checkout-stepper__bubble">
              {status === "done" ? <Icon name="circle-check" /> : i + 1}
            </span>
            <span className="checkout-stepper__label">{step.label}</span>
            {i < STEPS.length - 1 && (
              <span
                className="checkout-stepper__connector"
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
