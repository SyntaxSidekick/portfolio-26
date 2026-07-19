const roleButtons = Array.from(document.querySelectorAll(".role-item"));

let activeRoleIndex = roleButtons.findIndex((button) =>
  button.classList.contains("is-active")
);

let roleRotationTimer;

function activateRole(index) {
  roleButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeRoleIndex = index;
}

function showNextRole() {
  const nextIndex = (activeRoleIndex + 1) % roleButtons.length;
  activateRole(nextIndex);
}

function startRoleRotation() {
  window.clearInterval(roleRotationTimer);

  roleRotationTimer = window.setInterval(showNextRole, 3500);
}

roleButtons.forEach((button, index) => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("is-active"))
  );

  button.addEventListener("click", () => {
    activateRole(index);
    startRoleRotation();
  });
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && roleButtons.length > 1) {
  startRoleRotation();
}