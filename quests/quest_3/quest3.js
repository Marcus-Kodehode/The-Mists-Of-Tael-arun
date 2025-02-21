document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript for Quest 3 loaded!");

  const questBox = document.getElementById("questBox");
  const resultBox = document.getElementById("resultBox");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");
  const continueButton = document.getElementById("continueButton");

  window.chooseOption = function (choice) {
    questBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    if (choice === "magic") {
      console.log("🪄 Spilleren valgte magi (garantert seier med kostnad).");
      takeDamage(10);
      reduceStamina(10);
      resultTitle.innerText = "⚡ Magi brukt med suksess!";
      resultDescription.innerText =
        "Du beseirer bandittene med kraftig magi, men mister 10 helse og 10 stamina. Ancient Tome forblir i din besittelse.";
      continueButton.onclick = function () {
        window.location.href = "/quests/quest_4/quest4.html";
      };
    } else if (choice === "trick") {
      console.log("🎲 Spilleren prøver list (50/50 sjanse).");
      let success = Math.random() > 0.5;
      if (success) {
        console.log("✅ Lurt bandittene, Ancient Tome beholdt!");
        resultTitle.innerText = "🎉 Suksess!";
        resultDescription.innerText =
          "Du lurte bandittene og beholdt Ancient Tome. Du fortsetter reisen.";
        continueButton.onclick = function () {
          window.location.href = "/quests/quest_4/quest4.html";
        };
      } else {
        console.log("❌ Feilet med listen. Ancient Tome tapt.");
        removeItemFromInventory("Ancient Tome");
        resultTitle.innerText = "💀 Feilslått forsøk!";
        resultDescription.innerText =
          "Bandittene tok Ancient Tome. Du må starte reisen på nytt!";
        continueButton.onclick = function () {
          window.location.href = "/quests/quest_1/quest1.html";
        };
      }
    }
  };
});
