////////////////////////////////////
// 1) LocalStorage-hjelpefunksjoner
////////////////////////////////////

/**
 * Laster heroInventory fra localStorage (hvis tilgjengelig).
 */
function loadInventoryFromStorage() {
  let data = localStorage.getItem("heroInventory");
  return data ? JSON.parse(data) : null;
}

/**
 * Lagrer heroInventory til localStorage.
 */
function saveInventoryToStorage() {
  localStorage.setItem("heroInventory", JSON.stringify(heroInventory));
}

/**
 * Lagrer helse og stamina til localStorage.
 */
function saveStatusToStorage() {
  localStorage.setItem("health", JSON.stringify(health));
  localStorage.setItem("stamina", JSON.stringify(stamina));
}

/**
 * Laster helse og stamina fra localStorage.
 */
function loadStatusFromStorage() {
  let storedHealth = localStorage.getItem("health");
  let storedStamina = localStorage.getItem("stamina");
  health = storedHealth ? JSON.parse(storedHealth) : 100;
  stamina = storedStamina ? JSON.parse(storedStamina) : 100;
}

////////////////////////////////////
// 2) Oppstart: heroInventory & Status
////////////////////////////////////

const STARTING_ITEMS = ["Wood Staff", "Cloth Robes", "Health Potion"];
let storedInventory = loadInventoryFromStorage();
let heroInventory = storedInventory || [...STARTING_ITEMS];

let health = 100;
let stamina = 100;
loadStatusFromStorage(); // Laster status før UI genereres

////////////////////////////////////
// 3) Dynamisk generering av felles UI
////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  let sharedContainer = document.getElementById("sharedElements");

  sharedContainer.innerHTML = `
        <!-- Health & Stamina Bars -->
        <div id="statusContainer">
            <div class="status-bar">
                <img id="healthIcon" src="/images/health.webp" alt="Health">
                <progress id="healthBar" value="${health}" max="100"></progress>
                <span id="healthText">${health}</span>
            </div>
            <div class="status-bar">
                <img id="staminaIcon" src="/images/stamina.webp" alt="Stamina">
                <progress id="staminaBar" value="${stamina}" max="100"></progress>
                <span id="staminaText">${stamina}</span>
            </div>
        </div>

        <!-- Inventory-knapp -->
        <button id="inventoryButton">
            <img src="/images/inventory.webp" alt="Inventory">
        </button>

        <!-- Restart-knapp -->
        <button id="restartButton">🔄 Restart Game</button>

        <!-- Inventory-popup (Starter skjult) -->
        <div id="inventoryContainer">
            <h2>Inventory</h2>
            <div id="inventory"></div>
            <input type="text" id="itemInput" placeholder="Enter item">
            <button id="addItemBtn">Add Item</button>
            <button id="removeItemBtn">Remove Item</button>
        </div>

        <!-- Lokasjonsliste -->
        <div id="locationContainer">
            <h3>Explore Locations</h3>
            <ul id="locationList"></ul>
        </div>
    `;

  // Koble funksjoner til knappene
  document
    .getElementById("inventoryButton")
    .addEventListener("click", toggleInventory);
  document.getElementById("addItemBtn").addEventListener("click", addItem);
  document
    .getElementById("removeItemBtn")
    .addEventListener("click", removeItem);
  document
    .getElementById("restartButton")
    .addEventListener("click", restartGame); // ✅ Restart-spill-knapp

  generateLocationList();
  displayInventory();
  updateStatusBars();
});

////////////////////////////////////
// 4) Inventory-funksjoner (Global scope)
////////////////////////////////////

function displayInventory() {
  let inventoryElement = document.getElementById("inventory");
  if (inventoryElement) {
    inventoryElement.innerText =
      heroInventory.length > 0
        ? "Items: " + heroInventory.join(", ")
        : "Items: Empty";
  }
  saveInventoryToStorage();
}

function addItemToInventory(item) {
  if (!heroInventory.includes(item)) {
    heroInventory.push(item);
    displayInventory();
  }
}

function removeItemFromInventory(item) {
  let index = heroInventory.indexOf(item);
  if (index > -1) {
    heroInventory.splice(index, 1);
    displayInventory();
  }
}

function addItem() {
  let itemInput = document.getElementById("itemInput").value.trim();
  if (itemInput === "") {
    alert("Please enter an item name.");
    return;
  }
  if (!heroInventory.includes(itemInput)) {
    heroInventory.push(itemInput);
    displayInventory();
  } else {
    alert("Item already in inventory!");
  }
}

function removeItem() {
  let itemInput = document.getElementById("itemInput").value.trim();
  let index = heroInventory.indexOf(itemInput);
  if (index > -1) {
    heroInventory.splice(index, 1);
    displayInventory();
  } else {
    alert("Item not found in inventory!");
  }
}

////////////////////////////////////
// 5) Lokasjonsliste
////////////////////////////////////

function generateLocationList() {
  let locationList = document.getElementById("locationList");
  locationList.innerHTML = "";

  let locations = {
    "Whispering Forest": "whisperingForest",
    "Echoing Caves": "echoingCaves",
    "Shimmering Riverside": "shimmeringRiverside",
    "Crumbling Tower": "crumblingTower",
  };

  Object.keys(locations).forEach((location) => {
    let li = document.createElement("li");
    li.innerText = location;
    li.id = locations[location];
    li.onclick = () => exploreLocation(location);
    locationList.appendChild(li);
  });
}

function exploreLocation(location) {
  let messageContainer = document.getElementById("messageContainer");
  if (messageContainer) {
    messageContainer.innerHTML = `<p>You are exploring <strong>${location}</strong>...</p>`;
  }
}

////////////////////////////////////
// 6) Health & Stamina-funksjoner
////////////////////////////////////

function updateStatusBars() {
  let healthBar = document.getElementById("healthBar");
  let healthText = document.getElementById("healthText");
  let staminaBar = document.getElementById("staminaBar");
  let staminaText = document.getElementById("staminaText");

  if (healthBar && healthText && staminaBar && staminaText) {
    healthBar.value = health;
    healthText.innerText = health;
    staminaBar.value = stamina;
    staminaText.innerText = stamina;
  }
  saveStatusToStorage();
}

function takeDamage(amount) {
  health = Math.max(0, health - amount);
  updateStatusBars();

  if (health <= 0) {
    alert("Du har besvimt! Spillet starter på nytt.");
    restartGame();
  }
}

function reduceStamina(amount) {
  stamina = Math.max(0, stamina - amount);
  updateStatusBars();
}
// 🩸 Sjekker helsen etter skade og spør om spilleren vil bruke Health Potion
function checkHealthAndPrompt() {
  if (health < 50) {
    if (heroInventory.includes("Health Potion")) {
      let usePotion = confirm(
        "⚠️ Helsen din er lav (" +
          health +
          " HP). Vil du bruke en Health Potion for å gjenopprette full helse?"
      );
      if (usePotion) {
        health = 100;
        removeItemFromInventory("Health Potion");
        alert(
          "🩹 Health Potion brukt! Helsen din er nå fullstendig gjenopprettet."
        );
        updateStatusBars();
        displayInventory();
      }
    } else {
      alert("⚠️ Helsen din er lav, men du har ingen Health Potion!");
    }
  }
}

// 💥 Oppdatert takeDamage-funksjon som kaller sjekken
window.takeDamage = function (amount) {
  console.log(`💔 Du mister ${amount} HP`);
  health = Math.max(health - amount, 0);
  updateStatusBars();
  checkHealthAndPrompt(); // 🩸 Sjekker helse etter skade
};

// ⚡ Oppdatert reduceStamina for lik struktur (valgfritt)
window.reduceStamina = function (amount) {
  console.log(`💨 Du mister ${amount} stamina`);
  stamina = Math.max(stamina - amount, 0);
  updateStatusBars();
};

////////////////////////////////////
// 7) Restart-funksjon (Global Scope)
////////////////////////////////////

/**
 * 🔄 Fullstendig restart av spillet:
 * - Reset helse og stamina til 100.
 * - Inventory til start-items.
 * - Sender spilleren til Quest-1.
 */
function restartGame() {
  if (
    confirm(
      "Er du sikker på at du vil starte på nytt? Alt vil bli tilbakestilt."
    )
  ) {
    health = 100;
    stamina = 100;
    heroInventory = [...STARTING_ITEMS];
    saveStatusToStorage();
    saveInventoryToStorage();
    window.location.href = "/quests/quest_1/quest1.html";
  }
}

////////////////////////////////////
// 8) Inventory-toggle (popup)
////////////////////////////////////

function toggleInventory() {
  let container = document.getElementById("inventoryContainer");
  if (container) {
    container.classList.toggle("visible");
  }
}
// ✅ Fjerner Astral Blessing automatisk i Quest 6
// if (window.location.href.includes("Quest-6")) {
//   window.removeItemFromInventory("Astral Blessing");
// }






  














