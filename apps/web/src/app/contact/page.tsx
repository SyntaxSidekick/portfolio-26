import type { Metadata } from "next";
import "@/styles/pages/contact.css";
import { ContactFormBehavior } from "@/components/contact/contact-form-behavior";

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
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16v12H4z"></path>
                  <path d="m4 7 8 6 8-6"></path>
                </svg>
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
                <svg viewBox="0 0 24 24">
                  <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"></path>
                  <circle cx="12" cy="10" r="2.2"></circle>
                </svg>
              </span>

              <span className="contact-info-card__content">
                <span className="contact-info-card__label">Location</span>
                <span className="contact-info-card__value">Orlando, Florida, USA</span>
                <span className="contact-info-card__meta">Available Worldwide</span>
              </span>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8"></circle>
                  <path d="M12 8v4l3 2"></path>
                </svg>
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
              <a
                href="#"
                className="contact-social-link"
                aria-label="Visit LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.5 8.5V18"></path>
                  <path d="M6.5 5.5v.1"></path>
                  <path d="M10.5 18v-5.4c0-2.3 3-2.5 3 0V18"></path>
                  <path d="M13.5 12.6c.2-2.1 4-2.6 4 1V18"></path>
                </svg>
              </a>

              <a
                href="#"
                className="contact-social-link"
                aria-label="Visit GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 19c-4 .8-4-2-5-2.5"></path>
                  <path d="M14 22v-3.1a2.7 2.7 0 0 0-.7-2.1c2.4-.3 4.9-1.2 4.9-5.3A4.1 4.1 0 0 0 17.1 8a3.8 3.8 0 0 0-.1-3.5S16 4.2 13.5 5.8a12 12 0 0 0-7 0C4 4.2 3 4.5 3 4.5A3.8 3.8 0 0 0 2.9 8a4.1 4.1 0 0 0-1.1 3.5c0 4.1 2.5 5 4.9 5.3A2.7 2.7 0 0 0 6 18.9V22"></path>
                </svg>
              </a>

              <a
                href="#"
                className="contact-social-link"
                aria-label="Visit CodePen"
                title="CodePen"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3 9 6-9 6-9-6 9-6Z"></path>
                  <path d="m3 15 9 6 9-6"></path>
                  <path d="M3 9v6"></path>
                  <path d="M21 9v6"></path>
                  <path d="M12 15v6"></path>
                  <path d="M12 3v6"></path>
                </svg>
              </a>

              <a
                href="#"
                className="contact-social-link"
                aria-label="Visit X"
                title="X"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m5 4 14 16"></path>
                  <path d="M19 4 5 20"></path>
                </svg>
              </a>
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

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m3 11 18-8-8 18-2-7-8-3Z"></path>
                <path d="m11 14 4-4"></path>
              </svg>
            </button>

            <p className="contact-form__privacy">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="10" width="12" height="10" rx="1.5"></rect>
                <path d="M9 10V7a3 3 0 0 1 6 0v3"></path>
              </svg>

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
            <svg viewBox="0 0 24 24">
              <path d="M14.5 5.5c1.6-1.6 4.1-2.3 5.5-2.5-.2 1.4-.9 3.9-2.5 5.5l-5 5-4-4 6-4Z"></path>
              <path d="m8.5 9.5-3 .5-2 2 4 1"></path>
              <path d="m12.5 13.5-.5 3-2 2-1-4"></path>
              <circle cx="15.5" cy="7.5" r="1"></circle>
              <path d="M6.5 16.5 3 21l4.5-3.5"></path>
            </svg>
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
