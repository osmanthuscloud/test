/*
built off of this:
Random Name Generator for Javascript by Thomas Konings
https://gist.github.com/tkon99/4c98af713acc73bed74c
*/

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

const types = ["human", "alchemist", "witch", "mage", "angel", "demon", "golem", "godlike being", "incubus", "succubus", "glutton", "cyclops", "ghost", "zombie", "dog", "wolf", "fox", "cat", "mouse", "rabbit", "chinchilla", "bear", "sheep", "lamb", "moth", "spider", "bunny", "kitty", "puppy", "jackal", "frog", "chicken", "owl", "canary", "rat", "snow leopard", "lion", "husky", "deer", "goat", "otter", "seal", "mermaid", "hamster", "squirrel", "horse", "unicorn"];

//for hair and eyes
const colors = ["black", "silver", "light gray", "dark grey", "white", "red", "orange", "green", "blue", "indigo", "violet", "pink", "purple", "magenta", "golden", "rainbow", "dark", "glowing", "shiny", "lime green", "light blue", "bright red", "bright pink", "dark brown", "light brown", "normal-looking", "anime"];

let a_descriptors = ["happy-go-lucky", "laid-back", "cheerful", "quiet", "shy", "bookish", "loud", "crazed", "silly", "comically evil", "stoic", "rejected", "delightful", "lazy", "sad", "lonely", "youthful", "childish", "elderly", "wise beyond their years", "rambunctious", "flirty", "cunning", "mischevious", "sly", "scheming", "teary", "crybaby", "stubborn", "hot-headed", "grumpy", "tsundere", "yandere", "jealous", "nefarious", "hyperactive", "personable", "rizzless", "lucky", "cursed", "socialite", "transmasc", "transfemme", "nonbinary", "bigender", "genderless", "lesbian", "gay", "straight", "polyamorous", "demisexual", "demigender", "plural", "bipolar", "mentally ill", "small town", "big city", "cannibal", "royal", "filthy stinkin' rich", "smelly", "doomed", "hot", "sexy", "widowed", "childless", "doll-like", "immortal", "chronically ill", "disabled", "bisexual", "pansexual", "depressed", "demanding"];

let an_descriptors = ["agender", "asexual", "aromantic", "angry", "adorable", "overbearing", "overzealous", "unserious", "anxious", "academically-gifted", "ill-fated", "androgynous", "autistic", "antisocial", "attractive", "orphan", "unlucky", "old", "intersex"];

let eyeadj = colors.concat(["hazel", "googly", "wide", "sparkling", "listless", "lazy", "sad", "heart", "pale blue", "deep blue", "'has seen too much'", "all-seeing", "a mask over their", "soulless", "soulful", "a twinkle in their", "dark circles under their", "sunken", "beautiful", "you wouldn't believe their", "magical", "bedroom", "a bandage over one of their", "shifty", "secretive"]);
let hairadj = colors.concat(["two-tone", "multicolored", "fluffy", "messy", "curly", "straight", "no", "unkempt", "barely any", "too much", "incredible", "stylish", "blonde", "jet-black", "long", "short", "super-short", "excessively long", "tied-back", "braided", "loosely braided", "perfect", "amazing", "extremely thick", "half-shaved", "frizzy", "lots of body", "almost no body", "flames for", "spiky", "bugs in their", "leaves in their", "so many barrettes in their"]);

const foods = ["apples", "bananas", "oranges", "kiwis", "mangos", "candy", "chocolate", "pasta", "spaghetti", "meat", "hamburgers", "bugs", "rocks", "the tears of their enemies", "cereal", "pudding", "desserts", "pastries", "potatoes", "zucchini", "cookies", "doughnuts", "lima beans", "anything spicy", "nuts. any nut.", "eggs", "tomatoes", "chips", "movie theater snacks", "popcorn", "pizza", "junk food", "mom's cooking", "doesn't need to eat", "souls of the damned", "the emotions of others", "bread", "leeks", "french bread", "sandwiches", "curry", "dim sum", "fast food", "ice", "slushies", "ice cream", "takoyaki", "[insert regional dish here]", "fried chicken", "steak", "cucumbers", "eggplants", "peaches", "raspberries", "strawberries", "blueberries", "blackberries", "anything they don't have to cook", "microwave burritos", "tacos", "fish tacos", "salmon", "sushi", "sardines", "soup", "salad", "lettuce", "sunflower seeds", "pumpkin seeds", "pumpkin pie", "pie", "cake", "watermelon", "grapes", "clementines", "omelets", "rice", "deviled eggs", "potato salad", "pancakes", "waffles", "ummm i dunno", "steamed hams"];

const faves = ["love", "MURDER", "trans rights", "hiking", "camping", "drawing", "painting", "surfing", "sports", "esports", "board games", "card games", "chess", "checkers", "that's a secret ;)", "alone time", "sexy times", "cuddles", "making out", "flirting", "crying at parties", "websurfing", "magic!", "archaeology", "studying", "learning new things", "coding", "smooching", "their family", "fighting", "beatboxing", "breakdancing", "ballroom dancing", "dancing", "partying", "breaking hearts", "rock climbing", "skateboarding", "money", "get-rich-quick schemes", "prank calls", "ding dong ditch", "girls", "boys", "corny jokes", "dad jokes", "awful puns", "making their friends laugh", "capitalism", "traveling", "fishing", "acting", "theater", "singing songs", "voice acting", "oh, you know, nerd stuff", "video games", "random number generators", "speedrunning", "memes", "playing crane games at the arcade", "running marathons", "cooking", "acting cool", "being single", "building robots", "reading novels", "swearing", "weddings", "rainy days", "snow", "long walks on the beach", "funerals", "listening to music", "2-hour-long video essays", "gardening", "egg", "cool glitches", "waxing nostalgic about websites that no longer exist", "anime", "manga", "webcomics", "romance", "flowers", "being a librarian", "parenthood", "not being an orphan", "laughter and joy", "nihilism", "philosophy", "older men", "older women", "moms", "your mom", "dads", "bad endings", "tragedy", "happily ever afters", "rainbows", "glitter", "gel pens", "coloring books", "figure collecting", "having obscure hobbies", "a band you've never heard of", "a game you've never played", "picture books", "visual novels", "having sooo many hobbies", "knitting", "sewing", "arts and crafts", "when no one knows what they're talking about", "eating at classy restaurants", "spellcheck", "bones", "the occult", "halloween", "christmas", "vacation", "work", "their job", "being smarter than you", "watching tv"];

generateStory();

function newDesc(){
    let all_desc = a_descriptors.concat(an_descriptors);
    let desc =  all_desc[getRandomInt(0, all_desc.length)];
    
//thank you to Jasan on pillowfort for helping me realize i can do this lol
    let prefix = "a";
    if (an_descriptors.includes(desc)){
        prefix = "an";
    }
    
    document.getElementById("desc").innerHTML = `${prefix} 
    <button onclick="newDesc()">${desc}</button>`;   
}
function newPerson(){
    let person = types[getRandomInt(0, types.length)];
    
    document.getElementById("person").innerHTML = `
    <button onclick="newPerson()">${person}</button>`;   
}
function newHair(){
    let hairtype = hairadj[getRandomInt(0, hairadj.length)];
    
    document.getElementById("hair").innerHTML = `
    with <button onclick="newHair()">${hairtype}</button> hair`;   
}
function newEyes(){
    let eyetype = eyeadj[getRandomInt(0, eyeadj.length)];
    
    document.getElementById("eyes").innerHTML = `
    and <button onclick="newEyes()">${eyetype}</button> eyes.`;   
}
function newFood(){
    let favefood = foods[getRandomInt(0, foods.length)];
    
    document.getElementById("food").innerHTML = `
    favorite food: <button onclick="newFood()">${favefood}</button>`; 
}
function newThing(){
    let favething = faves[getRandomInt(0, faves.length)];
    
    document.getElementById("thing").innerHTML = `
    favorite thing: <button onclick="newThing()">${favething}</button>`;   
}

function generateStory(){
    newDesc();
    newPerson();
    newHair();
    newEyes();
    newFood();
    newThing();
}

