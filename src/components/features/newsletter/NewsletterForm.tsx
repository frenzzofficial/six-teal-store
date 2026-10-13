"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Icon } from "@/components/ui";
import { Input } from "@/components/ui/shadcn/input";
import { cn } from "@/packages/utils/cn";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterFormProps = {
  className?: string;
};

/**
 * The "Stay in the Loop" / "Get Exclusive Offers" / "Stay Ahead of the
 * Trends" band — same form, different heading copy, on Home, Products,
 * and Trending. No email backend exists yet, so submission is simulated
 * (see the comment below) — swap that one line out once one does; the
 * validation, states, and markup don't need to change.
 */
export function NewsletterForm({ className }: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (_values: NewsletterFormValues) => {
    // No newsletter backend yet — simulate the round trip so the form is
    // real end-to-end (loading state, success state), then clear it.
    await new Promise((resolve) => setTimeout(resolve, 400));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("newsletter-form", className)}
      noValidate
    >
      <div className="newsletter-form__row">
        <div className="newsletter-form__field">
          <Icon name="mail" className="newsletter-form__icon" />
          <Input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            className="newsletter-form__input"
            {...register("email")}
          />
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitSuccessful ? "Subscribed" : "Subscribe"}
          <Icon name="arrow-right" />
        </Button>
      </div>
      <p className="newsletter-form__hint" role="alert">
        {errors.email?.message ?? "No spam. Just good vibes."}
      </p>
    </form>
  );
}
