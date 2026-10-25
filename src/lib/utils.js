export const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const range = (value, start, end) =>
  clamp((value - start) / (end - start || 1));

export const smoothstep = (value, start, end) => {
  const t = range(value, start, end);
  return t * t * (3 - 2 * t);
};

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const lerp = (a, b, t) => a + (b - a) * t;

export const damp = (current, target, lambda, delta) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));

export function splitChars(text) {
  return Array.from(text);
}
