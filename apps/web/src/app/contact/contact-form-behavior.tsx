"use client";

import { useEffect } from "react";

const fieldMessages = new Map([
  ["contact-name", "Please enter your name."],
  ["contact-email", "Please enter a valid email address."],
  ["contact-subject", "Please add a subject."],
  ["contact-message", "Please add a message."]
]);

function getFieldError(field: HTMLInputElement | HTMLTextAreaElement) {
  if (field.validity.valueMissing) {
    return fieldMessages.get(field.id) ?? "This field is required.";
  }

  if (field.validity.typeMismatch) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function ContactFormBehavior() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("#contact-form");
    const status = document.querySelector<HTMLElement>("#contact-status");

    if (!form || !status) {
      return;
    }

    const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"));

    const validate = () => {
      let isValid = true;

      for (const field of fields) {
        const error = getFieldError(field);
        const errorElement = form.querySelector<HTMLElement>(`[data-error-for="${field.id}"]`);

        field.setAttribute("aria-invalid", error ? "true" : "false");

        if (errorElement) {
          errorElement.textContent = error;
        }

        if (error) {
          isValid = false;
        }
      }

      return isValid;
    };

    const handleInput = () => {
      validate();
      status.textContent = "";
    };

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      if (!validate()) {
        status.textContent = "Please fix the highlighted fields before sending.";
        return;
      }

      form.reset();
      fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
      status.textContent = "Thanks. Your message is ready for the next backend integration phase.";
    };

    form.addEventListener("submit", handleSubmit);
    fields.forEach((field) => field.addEventListener("input", handleInput));

    return () => {
      form.removeEventListener("submit", handleSubmit);
      fields.forEach((field) => field.removeEventListener("input", handleInput));
    };
  }, []);

  return null;
}
