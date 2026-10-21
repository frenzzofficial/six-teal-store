import type { Metadata } from "next";
import { ContactForm } from "@/components/features/content/ContactForm";
import { ContentHero } from "@/components/features/content/ContentHero";
import { Icon } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";
import { RETURN_WINDOW_DAYS } from "@/packages/configs/commerce.config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about an order or a product? Get in touch with Six Teal.",
};

export default function ContactPage() {
  const email = appConfig.author.email;

  return (
    <>
      <ContentHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        lead="Questions about an order, a product or a return? Send us a message and we'll get back to you."
      />

      <div className="content-page">
        <div className="contact-layout">
          <ContactForm />

          <aside className="contact-aside" aria-label="Other ways to reach us">
            <div className="content-card">
              <div className="contact-aside__row">
                <span className="content-card__icon">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="contact-aside__row">
                <span className="content-card__icon">
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <h3>Response time</h3>
                  <p>We usually reply within one to two working days.</p>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="contact-aside__row">
                <span className="content-card__icon">
                  <Icon name="rotate-ccw" size={20} />
                </span>
                <div>
                  <h3>Returns</h3>
                  <p>
                    {RETURN_WINDOW_DAYS}-day easy returns. Include your order
                    number and we'll sort it out.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
