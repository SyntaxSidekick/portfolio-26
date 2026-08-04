import type { Metadata } from "next";
import "@/styles/pages/contact/index.css";
import { ContactFormBehavior } from "@/components/contact/contact-form-behavior";
import { Clock3, LockKeyhole, Mail, MapPin, Rocket, Send } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export const metadata: Metadata = {
  title: "Contact Riad Kilani",
  description: "Contact Riad Kilani about front-end engineering, UX engineering, design systems, freelance work, or full-time opportunities."
};

function ContactPageContent() {
  return (

<main id="contact-page" className="page contact">
  <section className="contact-hero" aria-labelledby="contact-title">
    <div className="contact-container">
      <span className="contact-hero__decoration contact-hero__decoration--left" aria-hidden="true"></span>
      <span className="contact-hero__decoration contact-hero__decoration--right" aria-hidden="true"></span>

      <div className="contact-hero__content">
        <p className="contact-eyebrow">Contact</p>

        <h1 id="contact-title">Let’s Connect</h1>

        <p>
          Have a project in mind or want to collaborate? I’d love to hear from you.
        </p>
      </div>
    </div>
  </section>

  <section className="contact-main" aria-label="Contact information and message form">
    <div className="contact-container">
      <div className="contact-layout">
        <aside className="contact-panel contact-details" aria-labelledby="contact-details-title">
          <div className="contact-panel__intro">
            <p className="contact-section-label">Let’s Build Something Great</p>

            <h2 id="contact-details-title" className="sr-only">
              Contact details
            </h2>

            <p>
              I’m currently open to new freelance projects, full-time opportunities,
              and collaborations. Whether you have a question or just want to say
              hello, I’ll get back to you as soon as possible.
            </p>
          </div>

          <div className="contact-info-list">
            <a
              className="contact-info-card"
              href="mailto:hello@riadkilani.com"
              aria-label="Email Riad Kilani"
            >
              <span className="contact-info-card__icon" aria-hidden="true">
                <Mail />
              </span>

              <span className="contact-info-card__content">
                <span className="contact-info-card__label">Email</span>
                <span className="contact-info-card__value">
                  hello@riadkilani.com
                </span>
              </span>
            </a>

            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">
                <MapPin />
              </span>

              <span className="contact-info-card__content">
                <span className="contact-info-card__label">Location</span>
                <span className="contact-info-card__value">Orlando, Florida, USA</span>
                <span className="contact-info-card__meta">Available Worldwide</span>
              </span>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">
                <Clock3 />
              </span>

              <span className="contact-info-card__content">
                <span className="contact-info-card__label">Response Time</span>
                <span className="contact-info-card__value">
                  Usually within 1–2 business days
                </span>
              </span>
            </div>
          </div>

          <div className="contact-socials">
            <p className="contact-socials__label">Connect With Me</p>

            <div className="contact-socials__list">
              <SocialMediaLinks variant="contact" />
            </div>
          </div>
        </aside>

        <section className="contact-panel contact-form-panel" aria-labelledby="contact-form-title">
          <p className="contact-section-label">Send a Message</p>

          <h2 id="contact-form-title" className="sr-only">
            Send a message
          </h2>

          <form id="contact-form" className="contact-form" noValidate>
            <div className="contact-form__row">
              <div className="form-field">
                <label htmlFor="contact-name">Your Name</label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  required />

                <p className="form-field__error" data-error-for="contact-name"></p>
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  required />

                <p className="form-field__error" data-error-for="contact-email"></p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>

              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Subject"
                required />

              <p className="form-field__error" data-error-for="contact-subject"></p>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Message</label>

              <textarea
                id="contact-message"
                name="message"
                rows={8}
                placeholder="Tell me about your project, role, timeline, or challenge..."
                required
              ></textarea>

              <p className="form-field__error" data-error-for="contact-message"></p>
            </div>

            <button className="contact-submit" type="submit">
              <span>Send Message</span>

              <Send aria-hidden="true" />
            </button>

            <p className="contact-form__privacy">
              <LockKeyhole aria-hidden="true" />

              <span>Your information is safe. I’ll never share your details.</span>
            </p>

            <div
              id="contact-status"
              className="contact-form__status"
              role="status"
              aria-live="polite"
            ></div>
          </form>
        </section>
      </div>

      <aside className="contact-cta" aria-label="Portfolio call to action">
        <div className="contact-cta__icon" aria-hidden="true">
          <span className="contact-cta__icon-ring">
            <Rocket />
          </span>
        </div>

        <div className="contact-cta__content">
          <p className="contact-cta__title">Have a Project in Mind?</p>

          <p>
            I help businesses and teams design and build digital experiences
            that are fast, accessible, and built to convert.
          </p>
        </div>

        <a href="#" className="contact-cta__link">
          <span>View Portfolio</span>
          <span aria-hidden="true">→</span>
        </a>
      </aside>
    </div>
  </section>
</main>

  );
}

export default function Page() {
  return (
    <>
      <ContactPageContent />
      <ContactFormBehavior />
    </>
  );
}
