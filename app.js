"use strict";
const containerPlayersElement = document.getElementById("players__container");
const labelPlayerCounter = document.getElementById("players__counter-label");
const labelTotalPoints = document.getElementById("total-points__label");
const labelPlayerName = document.querySelector(".player-name__label");
const labelCounter = document.querySelector(".counter__label");
const inputPlayerName = document.getElementById("playername__input");
const btnAddPlayer = document.getElementById("add--players__btn");
class Players {
    constructor(id, playerName) {
        this.id = id;
        this.playerName = playerName;
        this.counter = 0;
        this.max = false;
    }
}
const players = [];
function displayTotal() {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    const totalPoints = players.reduce((accumulater, item) => accumulater + item.counter, 0);
    console.log(totalPoints);
    labelPlayerCounter.textContent = players.length;
    labelTotalPoints.textContent = totalPoints;
}
function checkMax() {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    const counters = players.map((item) => item.counter);
    const max = counters.reduce((a, b) => Math.max(a, b), -Infinity);
    players.forEach((item) => {
        if (item.counter !== 0 && item.counter === max) {
            item.max = true;
        }
        else {
            item.max = false;
        }
    });
    localStorage.setItem("playersData", JSON.stringify(players));
}
function alertNoPlayer() {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    if (players.length === 0) {
        alert("There is no player left");
    }
}
function displayPlayer() {
    containerPlayersElement.textContent = "";
    checkMax();
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    displayTotal();
    alertNoPlayer();
    players.forEach((item) => {
        const html = `<section class="player__container">
    <ion-icon name="close-outline" onclick="deletePlayer(${item.id})"></ion-icon>
    <ion-icon name="trophy" class="trophy-icon ${item.max ? "winner" : ""}"></ion-icon>
    <strong class="player-name__label">${item.playerName}</strong>
    <div class="control__container">
      <div class="counter__increase" onclick="increaseCounter(${item.id})"><ion-icon name="add-outline"></ion-icon></div>
      <div class="counter__label">${item.counter}</div>
      <div class="counter__decrease" onclick="decreaseCounter(${item.id})"><ion-icon name="remove-outline"></ion-icon></div>
    </div>
  </section>`;
        containerPlayersElement.insertAdjacentHTML("beforeend", html);
    });
}
displayPlayer();
btnAddPlayer.addEventListener("click", function (e) {
    e.preventDefault();
    const id = new Date().getTime();
    if (inputPlayerName.value) {
        const player = new Players(id, inputPlayerName.value);
        if ((players.length = 0)) {
            players.push(player);
            localStorage.setItem("playersData", JSON.stringify(players));
            displayPlayer();
        }
        else {
            const players = JSON.parse(localStorage.getItem("playersData") || "[]");
            players.push(player);
            localStorage.setItem("playersData", JSON.stringify(players));
            displayPlayer();
        }
    }
    else {
        alert("You have to type in player's name");
    }
    inputPlayerName.value = "";
});
function deletePlayer(id) {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    const filteredPlayers = players.filter((item) => item.id !== id);
    localStorage.setItem("playersData", JSON.stringify(filteredPlayers));
    displayPlayer();
}
function increaseCounter(id) {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    players.forEach(function (item) {
        if (item.id === id) {
            item.counter++;
            localStorage.setItem("playersData", JSON.stringify(players));
            displayPlayer();
        }
    });
}
function decreaseCounter(id) {
    const players = JSON.parse(localStorage.getItem("playersData") || "[]");
    players.forEach(function (item) {
        if (item.id === id && item.counter > 0) {
            item.counter--;
            localStorage.setItem("playersData", JSON.stringify(players));
            displayPlayer();
        }
    });
}
