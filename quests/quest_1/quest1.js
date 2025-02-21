document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript for Quest 1 loaded!");

  // Velger alternativ i oppdraget
  window.chooseOption = function (option) {
    const questBox = document.getElementById("questBox");
    const resultBox = document.getElementById("resultBox");
    const resultTitle = document.getElementById("resultTitle");
    const resultDescription = document.getElementById("resultDescription");
    const continueButton = document.getElementById("continueButton");

    if (option === "prepare") {
      console.log("🛡️ Spilleren valgte å forberede seg.");
      questBox.classList.add("hidden");
      resultBox.classList.remove("hidden");
      resultTitle.innerText = "✨ Klar for reisen!";
      resultDescription.innerText =
        "Du samler motet ditt og gjør deg klar for reisen. Du drar mot det ukjente!";
      continueButton.onclick = function () {
        window.location.href = "/quests/quest_2/quest2.html"; // Gå videre til Quest 2
      };
    } else if (option === "wait") {
      console.log("⏳ Spilleren valgte å vente.");
      questBox.classList.add("hidden");
      resultBox.classList.remove("hidden");
      resultTitle.innerText = "⏳ Du venter forgjeves...";
      resultDescription.innerText =
        "Du venter, men ingen kommer. Tåken tykner, og håpet svinner.";
      continueButton.onclick = function () {
        window.location.href = "/quests/quest_1/quest1.html"; // Restart quest 1 ved feil valg
      };
    }
  };

  // Funksjon for å gå videre til neste quest
  window.goToNextQuest = function () {
    window.location.href = "/quests/quest_2/quest2.html";
  };
});















