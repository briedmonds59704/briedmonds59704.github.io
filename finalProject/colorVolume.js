// ----------------------
// VOLUME STATE
// ----------------------

let currentVolume = 50;
let currentHue = 0;

const volumeValue = document.getElementById("volume-value");
const volumeVisualBar = document.getElementById("volume-visual-bar");
const colorSchemeSelect = document.getElementById("color-scheme");

// ----------------------
// COLOR MAPPING
// ----------------------

function volumeToHSL(volume, hue) {
  const saturation = 20 + (volume / 100) * 80;
  const lightness = 80 - (volume / 100) * 35;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setVolume(vol) {
  currentVolume = Math.max(0, Math.min(100, vol));
  volumeValue.textContent = currentVolume;
  updateVolumeVisual();
}

function updateVolumeVisual() {
  const color = volumeToHSL(currentVolume, currentHue);
  volumeVisualBar.style.background = color;
}

colorSchemeSelect.addEventListener("change", (e) => {
  currentHue = parseInt(e.target.value, 10);
  updateVolumeVisual();
});

// ----------------------
// FINAL SUBMIT BUTTON
// ----------------------

document.getElementById("final-submit-button").addEventListener("click", () => {
  alert("Volume submitted: " + currentVolume);
});

// ----------------------
// HEX GUESS GAME
// ----------------------

const hexSwatch = document.getElementById("hex-color-swatch");
const hexForm = document.getElementById("hex-form");
const hexInput = document.getElementById("hex-input");
const hexFeedback = document.getElementById("hex-feedback");

let targetHex = "#ff3366";
let targetVolumeFromColor = 70;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNewHexTarget() {
  const hue = randomInt(0, 360);
  const saturation = randomInt(50, 100);
  const lightness = randomInt(35, 65);

  const rgb = hslToRgb(hue / 360, saturation / 100, lightness / 100);
  targetHex = rgbToHex(rgb[0], rgb[1], rgb[2]);

  const vibrancyScore =
    (saturation / 100) * 0.7 +
    (1 - Math.abs(lightness - 50) / 50) * 0.3;

  targetVolumeFromColor = Math.round(vibrancyScore * 100);
  hexSwatch.style.background = targetHex;
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function parseHexInput(str) {
  let s = str.trim().toLowerCase();
  if (s.startsWith("#")) s = s.slice(1);
  if (s.length === 3) {
    s = s.split("").map((ch) => ch + ch).join("");
  }
  if (!/^[0-9a-f]{6}$/.test(s)) return null;
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}

function colorDistance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

hexForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userRgb = parseHexInput(hexInput.value);
  const targetRgb = parseHexInput(targetHex);

  if (!userRgb) {
    hexFeedback.textContent = "Invalid hex format.";
    return;
  }

  const dist = colorDistance(userRgb, targetRgb);

  if (dist === 0) {
    const direction = targetVolumeFromColor >= currentVolume ? 1 : -1;
    setVolume(targetVolumeFromColor + 5 * direction);
    hexFeedback.textContent = "Perfect match! Bonus applied.";
  } else if (dist < 40) {
    setVolume(Math.round((currentVolume + targetVolumeFromColor) / 2));
    hexFeedback.textContent = "Close guess! Volume nudged.";
  } else {
    setVolume(Math.round(currentVolume * 0.8));
    hexFeedback.textContent = "Far off. Volume reduced.";
  }

  hexInput.value = "";
  generateNewHexTarget();
});

// ----------------------
// REVERSE HEX GAME
// ----------------------

const reverseHexCode = document.getElementById("reverse-hex-code");
const reverseHexOptions = document.getElementById("reverse-hex-options");
const reverseHexFeedback = document.getElementById("reverse-hex-feedback");

let reverseCorrectHex = "#000000";
let reverseCorrectVolume = 50;

function generateReverseHexGame() {
  reverseHexOptions.innerHTML = "";
  reverseHexFeedback.textContent = "";

  const hue = randomInt(0, 360);
  const sat = randomInt(50, 100);
  const light = randomInt(35, 65);

  const rgb = hslToRgb(hue / 360, sat / 100, light / 100);
  reverseCorrectHex = rgbToHex(rgb[0], rgb[1], rgb[2]);

  const vibrancyScore =
    (sat / 100) * 0.7 +
    (1 - Math.abs(light - 50) / 50) * 0.3;

  reverseCorrectVolume = Math.round(vibrancyScore * 100);

  reverseHexCode.textContent = reverseCorrectHex.toUpperCase();

  const options = [reverseCorrectHex];
  while (options.length < 4) {
    const h = randomInt(0, 360);
    const s = randomInt(20, 100);
    const l = randomInt(25, 75);
    const rgb2 = hslToRgb(h / 360, s / 100, l / 100);
    const hex = rgbToHex(rgb2[0], rgb2[1], rgb2[2]);
    if (!options.includes(hex)) options.push(hex);
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach((hex) => {
    const swatch = document.createElement("div");
    swatch.className = "reverse-hex-swatch";
    swatch.style.background = hex;

    swatch.addEventListener("click", () => {
      if (hex === reverseCorrectHex) {
        setVolume(reverseCorrectVolume + 5);
        reverseHexFeedback.textContent = "Correct! Bonus volume applied.";
      } else {
        setVolume(Math.round(currentVolume * 0.8));
        reverseHexFeedback.textContent = "Incorrect. Volume reduced.";
      }

      generateReverseHexGame();
    });

    reverseHexOptions.appendChild(swatch);
  });
}

// ----------------------
// INIT
// ----------------------

updateVolumeVisual();
generateNewHexTarget();
generateReverseHexGame();


