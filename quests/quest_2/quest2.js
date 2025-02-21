document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript for Quest 2 loaded!");

  const questBox = document.getElementById("questBox");
  const resultBox = document.getElementById("resultBox");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const continueButton = document.getElementById("continueButton");

  window.chooseOption = function (choice) {
    questBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    if (choice === "forest") {
      console.log("🌲 Spilleren valgte Whispering Forest (trygg vei).");
      window.addItemToInventory("Ancient Tome");
      resultTitle.innerText = "🌿 En skjult sti funnet!";
      resultDescription.innerText =
        "Du finner en skjult sti i Whispering Forest som leder deg trygt til Echoing Caves. Du slipper kampen med hulens vokter og finner Ancient Tome!";
      continueButton.onclick = function () {
        window.location.href = "/quests/quest_3/quest3.html";
      };
    } else if (choice === "caves") {
      console.log("🐻 Spilleren valgte Echoing Caves direkte (fare).");
      takeDamage(10);
      reduceStamina(10);
      resultTitle.innerText = "⚔️ Angrepet av en bjørn!";
      resultDescription.innerText =
        "En bjørn som vokter hulen angriper deg! Du mister 10 helse og 10 stamina før du til slutt finner Ancient Tome.";
      window.addItemToInventory("Ancient Tome");
      continueButton.onclick = function () {
        window.location.href = "/quests/quest_3/quest3.html";
      };
    }
  };
});