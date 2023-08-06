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
  let deck = [];

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
    deck = [];
    let numCards = document.getElementById("numInput").value;

    // Create a new container for these cards
    const cardContainer = document.querySelector(".card-container");
    const newContainer = document.createElement("div");
    newContainer.classList.add("container");
    cardContainer.appendChild(newContainer);

    for (let i = 0; i < numCards; i++) {
      let card = getRandomCard();
      deck.push(card);
      displayCard(card, newContainer);
    }
  }

  function displayCard(card, containerElement) {
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
    containerElement.appendChild(cardElement);
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

  document
    .getElementById("sortBtn")
    .addEventListener("click", async function() {
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

        // Create new container for the sorted step
        const cardContainer = document.querySelector(".card-container");
        const sortedStepContainer = document.createElement("div");
        sortedStepContainer.classList.add("container");
        cardContainer.appendChild(sortedStepContainer);

        // Display the current state of deck
        deck.forEach(card => displayCard(card, sortedStepContainer));

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    });

  function compareCards(a, b) {
    const numberAIndex = numbers.indexOf(a.number);
    const numberBIndex = numbers.indexOf(b.number);
    if (numberAIndex < numberBIndex) return -1;
    if (numberAIndex > numberBIndex) return 1;
    return 0;
  }
};
