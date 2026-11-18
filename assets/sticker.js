// Splits each .sticker into letters with the video's ink colours, tilts and staggered landing.
// Without JavaScript the plain text still shows.
(() => {
  const INKS = [
    ["#fff6e6", "#ff2986"], // cream
    ["#ff6ecc", "#ff004e"], // pink
    ["#ffd100", "#ff5600"], // orange
    ["#d7ff00", "#00ab21"], // lime
    ["#4ffaff", "#1f5aff"], // blue
    ["#f4aaff", "#b20fff"], // purple
  ];
  const TILT = [-8, -3, 4, 7, 5, -6, 3, -4];
  const LIFT = [3, 0, -2, 1, 4, -1, 2, -2];
  for (const el of document.querySelectorAll(".sticker")) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    let i = 0;
    // Letters are grouped by word so a line can only break between words.
    let word = document.createElement("span");
    word.className = "w";
    el.append(word);
    for (const ch of text) {
      if (ch === " ") {
        const gap = document.createElement("span");
        gap.className = "gap";
        el.append(gap);
        word = document.createElement("span");
        word.className = "w";
        el.append(word);
        continue;
      }
      const [face, edge] = INKS[i % INKS.length];
      const l = document.createElement("span");
      l.className = "l";
      l.setAttribute("aria-hidden", "true");
      l.style.cssText = `--face:${face};--edge:${edge};--tilt:${TILT[i % TILT.length]}deg;--lift:${LIFT[i % LIFT.length]}%;--delay:${(i * 0.055).toFixed(3)}s;--bob:${(4.6 + (i % 5) * 0.35).toFixed(2)}s`;
      for (const kind of ["rim", "edge", "face"]) {
        const s = document.createElement("span");
        s.className = kind;
        s.textContent = ch;
        l.append(s);
      }
      word.append(l);
      i++;
    }
  }
})();
