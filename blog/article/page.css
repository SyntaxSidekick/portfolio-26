const contactForm = document.querySelector("#contact-form");
const submitButton = contactForm?.querySelector(".contact-submit");
const statusMessage = document.querySelector("#contact-status");

const fields = [
  {
    id: "contact-name",
    validate(value) {
      if (!value.trim()) {
        return "Please enter your name.";
      }

      if (value.trim().length < 2) {
        return "Your name must contain at least two characters.";
      }

      return "";
    }
  },
  {
    id: "contact-email",
    validate(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        return "Please enter your email address.";
      }

      if (!emailPattern.test(value.trim())) {
        return "Please enter a valid email address.";
      }

      return "";
    }
  },
  {
    id: "contact-subject",
    validate(value) {
      if (!value.trim()) {
        return "Please enter a subject.";
      }

      return "";
    }
  },
  {
    id: "contact-message",
    validate(value) {
      if (!value.trim()) {
        return "Please enter a message.";
      }

      if (value.trim().length < 20) {
        return "Please provide at least 20 characters.";
      }

      return "";
    }
  }
];

function getErrorElement(fieldId) {
  return document.querySelector(`[data-error-for="${fieldId}"]`);
}

function setFieldError(field, message) {
  const formField = field.closest(".form-field");
  const errorElement = getErrorElement(field.id);

  formField?.classList.toggle("is-invalid", Boolean(message));

  field.setAttribute("aria-invalid", message ? "true" : "false");

  if (message) {
    const errorId = `${field.id}-error`;

    errorElement.id = errorId;
    errorElement.textContent = message;
    field.setAttribute("aria-describedby", errorId);
  } else {
    errorElement.textContent = "";
    field.removeAttribute("aria-describedby");
  }
}

function validateField(fieldConfig) {
  const field = document.getElementById(fieldConfig.id);
  const errorMessage = fieldConfig.validate(field.value);

  setFieldError(field, errorMessage);

  return !errorMessage;
}

function validateForm() {
  return fields.map(validateField).every(Boolean);
}

fields.forEach((fieldConfig) => {
  const field = document.getElementById(fieldConfig.id);

  field.addEventListener("blur", () => {
    validateField(fieldConfig);
  });

  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      validateField(fieldConfig);
    }

    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error");
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusMessage.textContent = "";
  statusMessage.classList.remove("is-error");

  const isValid = validateForm();

  if (!isValid) {
    const firstInvalidField = contactForm.querySelector(
      '[aria-invalid="true"]'
    );

    firstInvalidField?.focus();

    statusMessage.textContent =
      "Please correct the highlighted fields before submitting.";

    statusMessage.classList.add("is-error");
    return;
  }

  const originalButtonText =
    submitButton.querySelector("span").textContent;

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Sending...";

  try {
    /*
      Replace this demo timeout with your existing PHPMailer endpoint.

      Example:

      const formData = new FormData(contactForm);

      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }
    */

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    contactForm.reset();

    fields.forEach((fieldConfig) => {
      const field = document.getElementById(fieldConfig.id);
      setFieldError(field, "");
    });

    statusMessage.textContent =
      "Thank you. Your message has been prepared successfully.";
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong. Please try again or email me directly.";

    statusMessage.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = originalButtonText;
  }
});