"use client";

import { type FormEvent, useState } from "react";
import { Button, Icon, Input, Textarea } from "@/components/ui";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Add a short subject.";
  if (values.message.trim().length < 10)
    errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

/**
 * No mail backend is wired up yet, so submitting simulates a short send and
 * shows a confirmation. Swap the timeout for a real request when one exists.
 */
export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSending(false);
    setSent(true);
    setValues(EMPTY);
  };

  if (sent) {
    return (
      <output className="contact-form__success">
        <Icon name="circle-check" size={22} />
        <div>
          <p>
            <strong>Thanks — your message is on its way.</strong>
          </p>
          <p>We usually reply within one to two working days.</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => setSent(false)}
          >
            Send another message
          </Button>
        </div>
      </output>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <Input
        label="Your name"
        name="name"
        autoComplete="name"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={set("email")}
        error={errors.email}
      />
      <div className="contact-form__full">
        <Input
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={set("subject")}
          error={errors.subject}
        />
      </div>
      <div className="contact-form__full">
        <Textarea
          label="Message"
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={set("message")}
          error={errors.message}
        />
      </div>
      <div className="contact-form__full">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
          {!sending && <Icon name="arrow-right" size={18} />}
        </Button>
      </div>
    </form>
  );
}
