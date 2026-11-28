const foundation = [
  "Angst", "Fluff", "Domestic", "Action", "Adventure",
  "Pining", "Slow Burn", "Mystery", "Fluff and Porn", "Sick Fic",
  "Character Study", "Relationship Development", "Plot What Plot",
  "Romantic Comedy", "Hurt/Comfort", "Hurt/No Comfort", "Horror",
  "Psychological", "Fantasy", "Cyberpunk/Steampunk", "Dark Fic",
  "Tragedy", "Slice-of-Life", "Supernatural"
];

const qi_refining = [
  "Alpha/Beta/Omega dynamics", "Soulmates", "Androids and Robots",
  "Spies and Secret Agents", "Sentinels and Guides", "Daemons",
  "Hybrids", "Angels and Demons", "Werewolves", "Vampires",
  "Superheroes/Superpowers", "Doppelgangers",
  "Parallel Universes Switching/Colliding", "Friends to Lovers",
  "Friends With Benefits", "Enemies to Friends to Lovers", "Rivalmance",
  "Fake/Pretend Relationship", "Marriage (arranged, undercover, etc)",
  "Pornstars", "Secret Identity", "Music Industry (idols, dancers, etc)",
  "Entertainment (actors, models, etc)", "Office", "Found Family",
  "Aliens", "Ghost/Spirits", "Fairy Tale", "Royalty", "Canon",
  "Canon-Divergent", "Road Trip", "Domestic", "Coffee Shop",
  "Flower Shop", "School (high school, university, etc)", "Reincarnation"
];

const core_formation = [
  "Secret Santa", "Mistletoe", "Snow Angels/Snowmen", "Ice Skating",
  "Holiday Markets", "Frost on Windows", "Blizzard", "Cabin in the Snow",
  "Snow Globe", "Crowded Malls and Streets", "Puff of Breath",
  "Snow-kissed Cheeks and Nose", "Crackling Fireplace",
  "Marshmallows and Hot Chocolate", "Winter Solstice",
  "Vacation and Traveling", "Decorating Around the House", "Presents",
  "Christmas Tree", "Christmas Cookies", "Gingerbread Houses",
  "Silent Night", "Jingle Bells", "Winter Olympics",
  "Starry Winter Night", "Footprints in the Snow", "Long, Dark Evenings"
];

const golden_core = [
  "Rimming", "Knotting", "Dirty Talk", "Panties", "Public Sex",
  "Comeplay", "Simultaneous orgasm", "Orgasm Delay/Denial",
  "Handcuffs/ Restraints", "Rope Bondage", "Exhibitionism",
  "Deepthroating", "Multiple Orgasms", "Blindfolds",
  "Hand fetishization (big strong hands; steady hands; rough knuckles; calluses; fists clenching in sheets)",
  "Neck fetishization (nape of the neck, throat, hickeys, etc)",
  "Nipple play",
  "Noise (screaming or yelling during sex; whimpering or sobbing; purring, growling; slurping or moaning enthusiastically during blow-jobs)",
  "Cockrings", "Dildos", "Vibrators", "Spanking",
  "Taste as an erotic element", "Wet dreams or erotic dreams", "Praise",
  "Striking with implements (whips, belts, riding crops, canes, paddles, etc)",
  "Undressing (undressing in front of someone for the first time; one character undressing another; fumbling clumsily to get undressed, striptease)",
  "Waxplay", "Verbal Domination",
  "Toys and devices (feathers, ice cubes, hot wax, etc)",
  "Well-fucked (being fucked out; fuck-dazed; sated and sleepy; wrecked; softened and debauched)",
  "Verbal seduction; sweet talking; reciting poetry; talking someone to orgasm",
  "Slow and/or prolonged sex",
  "Sex outdoors/outside (in a field; in a rainstorm; with snow falling; on the beach; in a graveyard; in an alley)",
  "Gags (ball-gags, scarves, mouth bits, etc)", "Rough sex",
  "Oral fixation or fetishization (lips, tongue, or whole mouth; french-kissing; licking; oral displays using food or beer bottles; smoking cigarettes, cigars, or pipes; biting or chewing one's lip(s))",
  "Masturbating for your partner",
  "Masturbation (solitary or as performance)",
  "Messiness and markers of arousal (mussed hair; flushed cheeks; swollen mouth; displaying bite marks or hickeys; clothes in disarray; sprawling; come-spattered skin)",
  "Delayed gratification", "Come-marking", "Coming quickly",
  "Coming without being touched",
  "Anal/butt plugs (during sex; worn under clothes in public)",
  "Fantasies", "Fingerfucking"
];

const allLists = {
  genre: foundation,
  trope: qi_refining,
  winter: core_formation,
  spicy: golden_core
};

// Track remaining unshown prompts and last drawn prompt per category
const decks = {};
const lastDrawn = {};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function drawFromDeck(category) {
  const source = allLists[category];
  if (!source || source.length === 0) return "";

  if (!decks[category] || decks[category].length === 0) {
    decks[category] = shuffle(source);
    if (decks[category].length > 1 && decks[category][decks[category].length - 1] === lastDrawn[category]) {
      const first = decks[category].shift();
      decks[category].push(first);
    }
  }

  const nextItem = decks[category].pop();
  lastDrawn[category] = nextItem;
  return nextItem;
}

// Toggle optional category buttons ON/OFF
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const box = document.getElementById(`${category}-box`);
    const resultDisplay = box?.querySelector(".result");

    if (!box || !resultDisplay || !allLists[category]) return;

    const nextState = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", nextState);

    if (nextState) {
      document.getElementById("idle-msg").classList.add("hidden");
      resultDisplay.textContent = drawFromDeck(category);
      box.classList.remove("hidden");
    } else {
      box.classList.add("hidden");
      resultDisplay.textContent = "";
    }
  });
});

// Generate main drabble + reroll active optional categories
document.getElementById("generate-btn").addEventListener("click", () => {
  document.getElementById("idle-msg").classList.add("hidden");

  document.getElementById("genre").textContent = drawFromDeck("genre");
  document.getElementById("trope").textContent = drawFromDeck("trope");

  document.getElementById("genre-box").classList.remove("hidden");
  document.getElementById("trope-box").classList.remove("hidden");

  document.querySelectorAll('.toggle-btn[aria-pressed="true"]').forEach((btn) => {
    const category = btn.dataset.category;
    const box = document.getElementById(`${category}-box`);
    const resultDisplay = box?.querySelector(".result");
    if (resultDisplay && allLists[category]) {
      resultDisplay.textContent = drawFromDeck(category);
    }
  });
});

// Reroll an individual card without changing the others
document.querySelectorAll(".reroll-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.reroll;
    const card = btn.closest(".result-box");
    const resultDisplay = card?.querySelector(".result");

    if (!resultDisplay || !allLists[category]) return;

    resultDisplay.textContent = drawFromDeck(category);
  });
});



/* winding the music box and releasing the wind chimes, snowflakes fluttering by the window -------- */

// --- Synthesized Guqin Music Box: TGCF Themes ---
let audioCtx = null;
let isPlaying = false;
let melodyTimer = null;
let stepIndex = 0;
let currentMelodyKey = "wuBie";

const tgcfMelodies = {
  wuBie: {
    name: "no separation",
    notes: [
      // Phrase 1: 情丝挥剑断了纠缠
      { freq: 329.63, dur: 0.45 }, // E4
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 587.33, dur: 0.65 }, // D5
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.90 }, // G4
      { freq: 0,      dur: 0.25 },

      // Phrase 2: 旧相念有谁怜
      { freq: 329.63, dur: 0.45 }, // E4
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 440.00, dur: 0.65 }, // A4
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 329.63, dur: 1.10 }, // E4
      { freq: 0,      dur: 0.30 },

      // Phrase 3: 灭了明灯对残月
      { freq: 329.63, dur: 0.45 }, // E4
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 587.33, dur: 0.65 }, // D5
      { freq: 659.25, dur: 0.65 }, // E5
      { freq: 587.33, dur: 0.45 }, // D5
      { freq: 493.88, dur: 0.95 }, // B4
      { freq: 0,      dur: 0.25 },

      // Phrase 4: 往事化蝶略过花丛又离别
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 587.33, dur: 0.65 }, // D5
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 493.88, dur: 1.15 }, // B4
      { freq: 0,      dur: 0.35 },

      // Phrase 5: 忍着泪等待重逢的喜悦
      { freq: 392.00, dur: 0.45 }, // G4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 587.33, dur: 0.45 }, // D5
      { freq: 659.25, dur: 0.85 }, // E5
      { freq: 587.33, dur: 0.45 }, // D5
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.65 }, // G4
      { freq: 329.63, dur: 1.60 }, // E4
      { freq: 0,      dur: 1.10 }
    ]
  },

  oneFlowerOneSword: {
    name: "one flower, one sword",
    notes: [
      // Phrase 1: 一花一剑一世长安 (G4 A4 B4 D5 E5 D5 B4 A4)
      { freq: 392.00, dur: 0.50 }, // G4
      { freq: 440.00, dur: 0.50 }, // A4
      { freq: 493.88, dur: 0.75 }, // B4
      { freq: 587.33, dur: 0.50 }, // D5
      { freq: 659.25, dur: 0.85 }, // E5
      { freq: 587.33, dur: 0.45 }, // D5
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 440.00, dur: 0.95 }, // A4
      { freq: 0,      dur: 0.30 },

      // Phrase 2: 春风十里不如你眉眼 (G4 A4 B4 D5 B4 A4 G4 E4)
      { freq: 392.00, dur: 0.50 }, // G4
      { freq: 440.00, dur: 0.50 }, // A4
      { freq: 493.88, dur: 0.70 }, // B4
      { freq: 587.33, dur: 0.50 }, // D5
      { freq: 493.88, dur: 0.45 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.50 }, // G4
      { freq: 329.63, dur: 1.10 }, // E4
      { freq: 0,      dur: 0.35 },

      // Phrase 3: 红尘万丈偏逢君 (D4 E4 G4 A4 B4 D5 E5)
      { freq: 293.66, dur: 0.50 }, // D4
      { freq: 329.63, dur: 0.50 }, // E4
      { freq: 392.00, dur: 0.65 }, // G4
      { freq: 440.00, dur: 0.50 }, // A4
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 587.33, dur: 0.50 }, // D5
      { freq: 659.25, dur: 1.05 }, // E5
      { freq: 0,      dur: 0.30 },

      // Phrase 4: 天官赐福百无禁忌 (G5 E5 D5 B4 A4 G4 A4 G4)
      { freq: 783.99, dur: 0.65 }, // G5
      { freq: 659.25, dur: 0.50 }, // E5
      { freq: 587.33, dur: 0.50 }, // D5
      { freq: 493.88, dur: 0.65 }, // B4
      { freq: 440.00, dur: 0.45 }, // A4
      { freq: 392.00, dur: 0.50 }, // G4
      { freq: 440.00, dur: 0.60 }, // A4
      { freq: 392.00, dur: 1.75 }, // G4
      { freq: 0,      dur: 1.10 }
    ]
  }
};

const melodyKeys = Object.keys(tgcfMelodies);

function playGuqinMusicBoxNote(freq) {
  if (!audioCtx || freq === 0) return;

  const now = audioCtx.currentTime;

  // Warm plucked silk-string body (triangle) + crystalline music box tine chime (sine octave)
  const stringOsc = audioCtx.createOscillator();
  const chimeOsc = audioCtx.createOscillator();

  const mainGain = audioCtx.createGain();
  const chimeGain = audioCtx.createGain();

  stringOsc.type = "triangle";
  stringOsc.frequency.setValueAtTime(freq, now);
  // Subtle guqin finger-slide vibrato
  stringOsc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + 0.16);
  stringOsc.frequency.exponentialRampToValueAtTime(freq, now + 0.50);

  chimeOsc.type = "sine";
  chimeOsc.frequency.setValueAtTime(freq * 2, now);

  // Gentle pluck envelope with 3.2s cavern decay
  mainGain.gain.setValueAtTime(0.0001, now);
  mainGain.gain.exponentialRampToValueAtTime(0.12, now + 0.018);
  mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

  chimeGain.gain.setValueAtTime(0.0001, now);
  chimeGain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  // Soft cavern echo delay
  const delay = audioCtx.createDelay();
  delay.delayTime.value = 0.40;
  const feedback = audioCtx.createGain();
  feedback.gain.value = 0.28;

  stringOsc.connect(mainGain);
  chimeOsc.connect(chimeGain);
  chimeGain.connect(mainGain);

  mainGain.connect(audioCtx.destination);
  mainGain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(audioCtx.destination);

  stringOsc.start(now);
  chimeOsc.start(now);
  stringOsc.stop(now + 3.3);
  chimeOsc.stop(now + 1.2);
}

function scheduleNextNote() {
  if (!isPlaying) return;

  const activeMelody = tgcfMelodies[currentMelodyKey];
  const note = activeMelody.notes[stepIndex];
  playGuqinMusicBoxNote(note.freq);

  stepIndex = (stepIndex + 1) % activeMelody.notes.length;
  melodyTimer = setTimeout(scheduleNextNote, note.dur * 1000);
}

const musicToggleBtn = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const melodyCycleBtn = document.getElementById("melody-cycle");

if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;
    musicToggleBtn.setAttribute("aria-pressed", isPlaying);

    if (isPlaying) {
      musicLabel.textContent = "guqin box playing...";
      scheduleNextNote();
    } else {
      musicLabel.textContent = "heaven's guqin box";
      clearTimeout(melodyTimer);
    }
  });
}

if (melodyCycleBtn) {
  melodyCycleBtn.addEventListener("click", () => {
    const nextIdx = (melodyKeys.indexOf(currentMelodyKey) + 1) % melodyKeys.length;
    currentMelodyKey = melodyKeys[nextIdx];
    stepIndex = 0;

    melodyCycleBtn.textContent = `${tgcfMelodies[currentMelodyKey].name} ↻`;

    // If currently playing, immediately switch to the newly selected song
    if (isPlaying) {
      clearTimeout(melodyTimer);
      scheduleNextNote();
    }
  });
}
