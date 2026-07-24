import { useEffect, useRef } from "react";
import type { Theme } from "./useTheme";

function drawLineChart(canvas: HTMLCanvasElement, theme: Theme) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = 146;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const border = theme === "light" ? "#e8edf3" : "#1d252d";
  const muted = theme === "light" ? "#5d6975" : "#9aa4af";
  const primary = "#1688ff";
  const values = [620, 780, 940, 880, 1160, 1320, 1280, 1420, 1330, 900, 760, 980, 1190, 1580, 1710, 2020, 1640, 1450, 1190, 1030, 890, 1280, 1720, 1600, 1430, 1880, 2070, 2250, 2060, 1500, 1320, 1510, 1660, 1310, 980, 860, 1110, 1320, 1680, 2600, 4080, 3100, 2250, 2100, 1650, 1820, 2370, 2200, 2050];
  const pad = { l: 36, r: 10, t: 8, b: 24 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;
  const max = 4500;

  ctx.clearRect(0, 0, width, height);
  ctx.font = "9px DM Sans, sans-serif";
  [0, 1000, 2000, 3000, 4000].forEach((tick) => {
    const y = pad.t + innerH - (tick / max) * innerH;
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(width - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = muted;
    ctx.fillText(tick === 0 ? "0" : `${tick / 1000}K`, 5, y + 3);
  });

  const points = values.map((value, index) => ({
    x: pad.l + (index / (values.length - 1)) * innerW,
    y: pad.t + innerH - (value / max) * innerH,
  }));

  const gradient = ctx.createLinearGradient(0, pad.t, 0, height - pad.b);
  gradient.addColorStop(0, "rgba(22,136,255,.35)");
  gradient.addColorStop(1, "rgba(22,136,255,0)");
  ctx.beginPath();
  ctx.moveTo(points[0].x, height - pad.b);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points[points.length - 1].x, height - pad.b);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
  ctx.strokeStyle = primary;
  ctx.lineWidth = 1.7;
  ctx.stroke();
}

function drawDonutChart(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const width = 145;
  const height = 145;
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const values = [62, 18, 10, 6, 4];
  const colors = ["#137be8", "#7d3fc2", "#31ad73", "#f2b323", "#a5adb6"];
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);
  values.forEach((value, index) => {
    const angle = (value / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 61, start, start + angle);
    ctx.strokeStyle = colors[index];
    ctx.lineWidth = 22;
    ctx.stroke();
    start += angle;
  });
}

export function useAdminCharts(theme: Theme) {
  const trafficRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let frame = 0;

    const draw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (trafficRef.current) drawLineChart(trafficRef.current, theme);
        if (sourceRef.current) drawDonutChart(sourceRef.current);
      });
    };

    draw();
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", draw);
    };
  }, [theme]);

  return { trafficRef, sourceRef };
}
