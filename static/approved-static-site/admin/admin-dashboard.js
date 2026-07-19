(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const searchInput = document.querySelector("#site-search");
  const sidebar = document.querySelector("#sidebar");

  const storedTheme = localStorage.getItem("riad-admin-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  }

  function updateThemeButton() {
    const light = root.dataset.theme === "light";
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-pressed", String(light));
    themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  }

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("riad-admin-theme", root.dataset.theme);
    updateThemeButton();
    drawCharts();
  });

  document.querySelectorAll(".nav-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const group = trigger.closest(".nav-group");
      const open = group.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelector("[data-collapse-sidebar]")?.addEventListener("click", () => {
    body.classList.toggle("sidebar-collapsed");
  });

  document.querySelector("[data-open-sidebar]")?.addEventListener("click", () => {
    body.classList.add("sidebar-open");
  });

  document.querySelectorAll("[data-close-sidebar]").forEach((button) => {
    button.addEventListener("click", () => body.classList.remove("sidebar-open"));
  });

  document.addEventListener("keydown", (event) => {
    const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (shortcut) {
      event.preventDefault();
      searchInput?.focus();
    }
    if (event.key === "Escape") {
      body.classList.remove("sidebar-open");
      if (document.activeElement === searchInput) searchInput.blur();
    }
  });

  searchInput?.addEventListener("input", (event) => {
    const value = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".post-row, .portfolio-panel tbody tr, .comment").forEach((item) => {
      item.hidden = value.length > 0 && !item.textContent.toLowerCase().includes(value);
    });
  });

  function setCanvasSize(canvas, height) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width: rect.width, height };
  }

  function drawLineChart() {
    const canvas = document.querySelector("#trafficChart");
    if (!canvas) return;

    const { ctx, width, height } = setCanvasSize(canvas, 146);
    const styles = getComputedStyle(root);
    const border = styles.getPropertyValue("--border-soft").trim();
    const muted = styles.getPropertyValue("--muted").trim();
    const primary = styles.getPropertyValue("--primary").trim();

    const values = [620,780,940,880,1160,1320,1280,1420,1330,900,760,980,1190,1580,1710,2020,1640,1450,1190,1030,890,1280,1720,1600,1430,1880,2070,2250,2060,1500,1320,1510,1660,1310,980,860,1110,1320,1680,2600,4080,3100,2250,2100,1650,1820,2370,2200,2050];
    const pad = { l: 36, r: 10, t: 8, b: 24 };
    const innerW = width - pad.l - pad.r;
    const innerH = height - pad.t - pad.b;
    const max = 4500;

    ctx.clearRect(0, 0, width, height);
    ctx.font = "9px DM Sans, sans-serif";
    ctx.lineWidth = 1;

    [0,1000,2000,3000,4000].forEach((tick) => {
      const y = pad.t + innerH - (tick / max) * innerH;
      ctx.strokeStyle = border;
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(width - pad.r, y);
      ctx.stroke();
      ctx.fillStyle = muted;
      ctx.fillText(tick === 0 ? "0" : `${tick/1000}K`, 5, y + 3);
    });

    const points = values.map((value, index) => ({
      x: pad.l + (index / (values.length - 1)) * innerW,
      y: pad.t + innerH - (value / max) * innerH
    }));

    const gradient = ctx.createLinearGradient(0, pad.t, 0, height - pad.b);
    gradient.addColorStop(0, "rgba(22,136,255,.35)");
    gradient.addColorStop(1, "rgba(22,136,255,0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - pad.b);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points.at(-1).x, height - pad.b);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.strokeStyle = primary;
    ctx.lineWidth = 1.7;
    ctx.stroke();

    points.filter((_, i) => i % 4 === 0).forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = primary;
      ctx.fill();
    });

    const labels = ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"];
    labels.forEach((label, index) => {
      const x = pad.l + (index / (labels.length - 1)) * innerW;
      ctx.fillStyle = muted;
      ctx.textAlign = index === 0 ? "left" : index === labels.length - 1 ? "right" : "center";
      ctx.fillText(label, x, height - 5);
    });
  }

  function drawDonutChart() {
    const canvas = document.querySelector("#sourceChart");
    if (!canvas) return;

    const { ctx, width, height } = setCanvasSize(canvas, 145);
    const values = [62,18,10,6,4];
    const colors = ["#137be8","#7d3fc2","#31ad73","#f2b323","#a5adb6"];
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * .42;
    const thickness = 22;
    let start = -Math.PI / 2;

    ctx.clearRect(0, 0, width, height);
    values.forEach((value, index) => {
      const angle = (value / 100) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + angle);
      ctx.strokeStyle = colors[index];
      ctx.lineWidth = thickness;
      ctx.lineCap = "butt";
      ctx.stroke();
      start += angle;
    });
  }

  function drawCharts() {
    window.requestAnimationFrame(() => {
      drawLineChart();
      drawDonutChart();
    });
  }

  function initializeIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawCharts, 100);
  });

  updateThemeButton();
  initializeIcons();
  drawCharts();
})();
