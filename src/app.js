/* eslint-disable */
/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  const numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const suits = ["♠", "♣", "♥", "♦"];
  let deck = []; // added a global array to hold the generated cards

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomCard() {
    const randomSuitIndex = getRandomIndex(suits.length);
    const randomNumberIndex = getRandomIndex(numbers.length);
    const suit = suits[randomSuitIndex];
    const number = numbers[randomNumberIndex];

    return { suit, number };
  }

  function generateCards() {
    deck = []; // reset the deck array
    let numCards = document.getElementById("numInput").value;
    for (let i = 0; i < numCards; i++) {
      let card = getRandomCard();
      deck.push(card); // add the card to the deck array
      displayCard(card);
    }
  }

  function displayCard(card) {
    const cardContainer = document.querySelector(".card-container");
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const suitTopElement = document.createElement("div");
    suitTopElement.classList.add("suit-top");
    const suitBottomElement = document.createElement("div");
    suitBottomElement.classList.add("suit-bottom");
    const numberElement = document.createElement("div");
    numberElement.classList.add("number");

    suitTopElement.textContent = card.suit;
    suitBottomElement.textContent = card.suit;
    numberElement.textContent = card.number;

    if (card.suit === "♥" || card.suit === "♦") {
      suitTopElement.classList.add("suit-red");
      suitBottomElement.classList.add("suit-red");
    }

    cardElement.appendChild(suitTopElement);
    cardElement.appendChild(numberElement);
    cardElement.appendChild(suitBottomElement);
    cardContainer.appendChild(cardElement);
  }

  document.getElementById("submitBtn").addEventListener("click", function() {
    let num = document.getElementById("numInput").value;
    if (num === "" || num <= 0) {
      alert("Please enter a valid number of cards.");
    } else {
      const cardContainer = document.querySelector(".card-container");
      while (cardContainer.firstChild) {
        cardContainer.firstChild.remove();
      }
      generateCards();
    }
  });

  document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("numInput").value = "";
    const cardContainer = document.querySelector(".card-container");
    while (cardContainer.firstChild) {
      cardContainer.firstChild.remove();
    }
    deck = []; // reset the deck array
  });

  document.getElementById("sortBtn").addEventListener("click", function() {
    // Selection sort
    for (let i = 0; i < deck.length; i++) {
      let min = i;
      for (let j = i + 1; j < deck.length; j++) {
        if (compareCards(deck[j], deck[min]) < 0) {
          min = j;
        }
      }
      if (min !== i) {
        let temp = deck[i];
        deck[i] = deck[min];
        deck[min] = temp;
      }
    }
    // Redraw the sorted cards
    const cardContainer = document.querySelector(".card-container");
    while (cardContainer.firstChild) {
      cardContainer.firstChild.remove();
    }
    deck.forEach(card => displayCard(card));
  });

  function compareCards(a, b) {
    // Only compare numbers
    const numberAIndex = numbers.indexOf(a.number);
    const numberBIndex = numbers.indexOf(b.number);
    if (numberAIndex < numberBIndex) return -1;
    if (numberAIndex > numberBIndex) return 1;
    return 0; // cards are the same
  }
};
