document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript for Quest 4 loaded!");
  
    // 🔄 Global variabel for å spore hvilken hendelse som kjører
    let currentEvent = "";
  
    // 🟩 Åpne portalen
    window.attemptPortal = function () {
      console.log("🌀 Forsøker å åpne portalen...");
      toggleQuestBox(false);
  
      if (heroInventory.includes("Arcane Key")) {
        console.log("✅ Arcane Key funnet. Åpner portalen!");
        removeItemFromInventory("Arcane Key");
        showEvent(
          "Portalen åpnes!",
          "Arcane Key gløder i hendene dine og portalen svever opp. Du går forsiktig inn.",
          "openPortal"
        );
      } else {
        console.log("❌ Ingen Arcane Key. Vokteren dukker opp.");
        showEvent(
          "En mektig vokter dukker opp!",
          "En vokter trår frem fra skyggene. Du må beseire den for å fortsette.",
          "guardianFight"
        );
      }
    };
  
    // 🏛️ Utforsk tårnet
    window.exploreTower = function () {
      console.log("🏛️ Spilleren utforsker tårnet...");
      takeDamage(5);
      showEvent(
        "Eldrin reagerer!",
        "Trollmannen mistenker deg for å stjele og kaster en svak magi på deg. Du mister 5 HP.",
        "exploreTowerDone"
      );
    };
  
    // 💥 Fortsett event basert på scenario
    window.continueEvent = function () {
      if (currentEvent === "openPortal") {
        window.location.href = "/quests/quest_5/quest5.html";
      } else if (currentEvent === "guardianFight") {
        fightGuardian();
      } else if (currentEvent === "exploreTowerDone") {
        toggleQuestBox(true);
        toggleEventBox(false);
      }
    };
  
    // ⚔️ Kjemp mot vokteren
    function fightGuardian() {
      console.log("⚔️ Kamp mot vokteren starter!");
      takeDamage(20);
      reduceStamina(15);
      showEvent(
        "Vokteren beseiret!",
        "Etter en intens kamp faller vokteren. Portalen åpnes foran deg.",
        "openPortal"
      );
    }
  
    // 📝 Dynamisk tekstboks
    function showEvent(title, description, nextEvent) {
      currentEvent = nextEvent;
      document.getElementById("eventTitle").innerText = title;
      document.getElementById("eventDescription").innerText = description;
      toggleEventBox(true);
    }
  
    // 🔃 Viser/skjuler eventBox
    function toggleEventBox(show) {
      document.getElementById("eventBox").classList.toggle("hidden", !show);
    }
  
    // 🎭 Viser/skjuler questBox
    function toggleQuestBox(show) {
      document.getElementById("questBox").classList.toggle("hidden", !show);
    }
  
    // 🔁 Restart spill
    window.restartGame = function () {
      console.log("🔄 Starter spillet på nytt...");
      resetGameState();
      window.location.href = "/quests/quest_1/quest1.html";
    };
  });








