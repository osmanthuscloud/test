/*
built off of this:
Random Name Generator for Javascript by Thomas Konings
https://gist.github.com/tkon99/4c98af713acc73bed74c
*/

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

//genres
const genres = ["slice-of-life", "romance", "horror", "supernatural"];

//genres
const aus = ["a/b/o", "university", "office life", "canon", "canon-divergent"];

//quotes and dialogue




generateStory();
  
function newSetting(){
    let setting = genres[getRandomInt(0, genres.length)];
    
    document.getElementById("setting").innerHTML = `
    <button onclick="newSetting()">${setting}</button>`;   
}

function newTrope(){
    let trope = aus[getRandomInt(0, aus.length)];
    
    document.getElementById("trope").innerHTML = `
    <button onclick="newTrope()">${trope}</button>`;   
}

function generateStory(){
    newSetting();
    newTrope();
}
