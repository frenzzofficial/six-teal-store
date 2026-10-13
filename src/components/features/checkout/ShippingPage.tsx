"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";
import { CheckoutStepper } from "@/components/features/checkout/CheckoutStepper";
import { Button, Icon } from "@/components/ui";
import { Input } from "@/components/ui/shadcn/input";
import { useCartStore } from "@/packages/store/cart.store";
import { useCheckoutStore } from "@/packages/store/checkout.store";
import type { ShippingAddress } from "@/types/order";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  line1: z.string().min(4, "Enter your street address"),
  line2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Enter your state"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  country: z.string().min(2),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const FIELDS: {
  name: keyof ShippingFormValues;
  label: string;
  span?: "full";
}[] = [
  { name: "fullName", label: "Full name", span: "full" },
  { name: "phone", label: "Phone number" },
  { name: "line1", label: "Address line 1", span: "full" },
  { name: "line2", label: "Address line 2 (optional)", span: "full" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "pincode", label: "Pincode" },
  { name: "country", label: "Country" },
];

export function ShippingPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totals = useCartStore((s) => s.totals());
  const savedAddress = useCheckoutStore((s) => s.shippingAddress);
  const setShippingAddress = useCheckoutStore((s) => s.setShippingAddress);

  // Can't ship an empty cart — send people back rather than showing a
  // checkout flow with nothing in it.
  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items.length, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: savedAddress ?? { country: "India" },
  });

  const onSubmit = (values: ShippingFormValues) => {
    setShippingAddress(values as ShippingAddress);
    router.push("/checkout/payment");
  };

  if (items.length === 0) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-page__inner section-bleed__inner">
        <Link href="/cart" className="checkout-page__back">
          <Icon name="chevron-right" className="checkout-page__back-icon" />
          Back to Cart
        </Link>

        <CheckoutStepper current="shipping" />

        <div className="checkout-page__layout">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="checkout-panel"
            noValidate
          >
            <h1 className="checkout-panel__title">Shipping Address</h1>
            <div className="checkout-form-grid">
              {FIELDS.map((field) => (
                <label
                  key={field.name}
                  htmlFor={field.name}
                  className={
                    field.span === "full"
                      ? "checkout-field checkout-field--full"
                      : "checkout-field"
                  }
                >
                  <span className="checkout-field__label">{field.label}</span>
                  <Input
                    id={field.name}
                    {...register(field.name)}
                    aria-invalid={!!errors[field.name]}
                  />
                  {errors[field.name] && (
                    <span className="checkout-field__error" role="alert">
                      {errors[field.name]?.message}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <Button type="submit" variant="primary" size="lg">
              Continue to Payment
              <Icon name="arrow-right" />
            </Button>
          </form>

          <div className="checkout-page__summary">
            <OrderSummaryCard totals={totals} showCheckoutCta={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
