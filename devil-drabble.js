function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

const optionalLists = {
  winter: core_formation,
  spicy: golden_core
};

// Toggle optional category buttons
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const box = document.getElementById(`${category}-box`);
    const resultDisplay = box?.querySelector(".result");
    const items = optionalLists[category];

    if (!box || !resultDisplay || !items) return;

    const nextState = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", nextState);

    if (nextState) {
      document.getElementById("idle-msg").classList.add("hidden");
      resultDisplay.textContent = pickRandom(items);
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

  document.getElementById("genre").textContent = pickRandom(foundation);
  document.getElementById("trope").textContent = pickRandom(qi_refining);

  document.getElementById("genre-box").classList.remove("hidden");
  document.getElementById("trope-box").classList.remove("hidden");

  document.querySelectorAll('.toggle-btn[aria-pressed="true"]').forEach((btn) => {
    const category = btn.dataset.category;
    const box = document.getElementById(`${category}-box`);
    const resultDisplay = box?.querySelector(".result");
    if (resultDisplay && optionalLists[category]) {
      resultDisplay.textContent = pickRandom(optionalLists[category]);
    }
  });
});
