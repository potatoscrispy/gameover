const dataUI = document.getElementById("data");
const mmorpg = document.getElementById("mmorpg");
const shooter = document.getElementById("shooter");
const sailing = document.getElementById("sailing");
const permadeath = document.getElementById("permadeath");
const superhero = document.getElementById("superhero");
const pixel = document.getElementById("pixel");
const firstSection = document.getElementById("section1");
const secondSection = document.getElementById("section2");
const loader = document.getElementById("loader");
const photo = document.querySelector("#section2 img");
const gameTitle = document.getElementById("gameTitle");
const gameCategory = document.getElementById("gameCategory");
const gamePlatform = document.getElementById("gamePlatform");
const gameStatus = document.getElementById("gameStatus");
const gameDetails = document.getElementById("gameDetails");
const gameBtn = document.getElementById("gameBtn");

mmorpg.addEventListener("click", async function () {
  let display = new Display("mmorpg");
  let data = await display.getGamesData();
  presentFirstSection(data);
});
shooter.addEventListener("click", async function () {
  let display = new Display("shooter");
  let data = await display.getGamesData();
  presentFirstSection(data);
});
sailing.addEventListener("click", async function () {
  let display = new Display("sailing");
  let data = await display.getGamesData();
  presentFirstSection(data);
});
permadeath.addEventListener("click", async function () {
  let display = new Display("permadeath");
  let data = await display.getGamesData();
  presentFirstSection(data);
});
superhero.addEventListener("click", async function () {
  let display = new Display("superhero");
  let data = await display.getGamesData();
  presentFirstSection(data);
});
pixel.addEventListener("click", async function () {
  let display = new Display("pixel");
  let data = await display.getGamesData();
  presentFirstSection(data);
});

async function start() {
  let mainCat = "mmorpg";
  let myDisplay = new Display(mainCat);
  let data = await myDisplay.getGamesData();
  presentFirstSection(data);
}

function presentFirstSection(result) {
  dataUI.innerHTML = "";
  dataUI.innerHTML += result
    .map(
      (e) => `
    <div class="col" onclick="presentSecondSection(${e.id})">
    <div class="card bg-color2 text-white">
    <img class="card-img-top p-3" src="${e.thumbnail}" alt="Card image cap">
    <div class="card-body">
    <div class="d-flex justify-content-between">
    <h6 class="card-title">${e.title}</h6>
    <h5 class="badge bg-primary align-self-end fs-s fw-normal">Free</h5>
    </div>
    <p class="card-text text-center text-white-50 fs-ss">
    ${e.short_description}
    </p>
    </div>
    <div class="card-footer d-flex flex-row justify-content-between align-items-center">
    <div class="badge bg-color4">${e.genre}</div>
    ${
      e.platform.includes(",")
        ? `<div class="d-flex flex-column">` +
          e.platform
            .split(",")
            .map((x, i) =>
              i == 0
                ? `<div
      class="badge bg-color4 mb-2">${x}</div>`
                : `<div
      class="badge bg-color4">${x}</div>`
            )
            .join("") +
          "</div>"
        : `
    <span class="badge bg-color4">${e.platform}</span>
    `
    }
  </div>
  </div>
  </div>
  `
    )
    .join("");
  // console.log(result);
}

// ----------------------- Desplay Class ------------------------ //
class Display {
  constructor(category) {
    this.category = category;
  }
  getApi() {
    return `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
  }
  async getGamesData() {
    let options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2b6a5a7d8emshaeb417bce53f6bbp1e4b3ejsn5ec8186af357",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    console.log("start getGamesData");
    loader.classList.remove("d-none");
    let res = await fetch(this.getApi(), options);
    let result = await res.json();
    loader.classList.add("d-none");
    console.log("getGamesData done");
    return result;
  }
}
// browser starting
start();

// navbar stick to the top when scrolling
window.onscroll = function () {
  myFunction();
};
var navbar = document.getElementById("nav-container");
var sticky = navbar.offsetTop - 5;
function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.remove("offset");
  } else {
    navbar.classList.add("offset");
  }
}
// ....................................

function presentSectionOne() {
  secondSection.classList.add("d-none");
  firstSection.classList.remove("d-none");
}

// ---------------details section ---------------------------------//

async function presentSecondSection(index) {
  // eventInfo.preventDefault();
  firstSection.classList.add("d-none");
  let game = new Game(index);
  let data = await game.getGame();
  secondSection.classList.remove("d-none");
  console.log(data);
  console.log(data.thumbnail);

  photo.setAttribute("src", data.thumbnail);
  gameTitle.innerHTML = `Title: ${data.title}`;
  gameCategory.innerHTML = data.genre;
  gamePlatform.innerHTML = data.platform;
  gameStatus.innerHTML = data.status;
  gameDetails.innerHTML = data.description;
  gameBtn.setAttribute("href", data.game_url);
}

class Game {
  constructor(gameID) {
    this.gameID = gameID;
  }
  getApi() {
    return `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.gameID}`;
  }
  async getGame() {
    let options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "2b6a5a7d8emshaeb417bce53f6bbp1e4b3ejsn5ec8186af357",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    loader.classList.remove("d-none");
    let res = await fetch(this.getApi(), options);
    let result = await res.json();
    loader.classList.add("d-none");
    console.log("getGame done");
    return result;
  }
}
