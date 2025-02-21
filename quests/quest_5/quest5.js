document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript for Quest 5 loaded!");
  
    window.choosePath = function (choice) {
      console.log("Valgt:", choice);
  
      let questBox = document.getElementById("questBox");
      let popup = document.getElementById("systemPopup");
      let popupTitle = document.getElementById("popupTitle");
      let popupDesc = document.getElementById("popupDescription");
  
      if (!questBox || !popup || !popupTitle || !popupDesc) {
        console.error("🚨 En eller flere nødvendige DOM-elementer mangler.");
        return;
      }
  
      questBox.classList.add("hidden");
      popup.classList.remove("hidden");
  
      if (choice === "blessing") {
        // Spilleren ofrer helse og stamina, og får Astral Blessing
        takeDamage(10);
        reduceStamina(10);
        addItemToInventory("Astral Blessing");
        popupTitle.innerText = "✨ Astral Blessing mottatt!";
        popupDesc.innerText =
          "Du har ofret helse og stamina. En kosmisk energi omslutter deg. Du føler deg forberedt på det som venter.";
      } else if (choice === "navigate") {
        // Spilleren forsøker å navigere stjernestien (50% sjanse)
        let success = Math.random() >= 0.5;
        if (success) {
          popupTitle.innerText = "🌟 Du navigerte stjernenes sti!";
          popupDesc.innerText =
            "Med kløkt og flaks klarte du å navigere gjennom stjernestien. Du kan fortsette reisen!";
        } else {
          popupTitle.innerText = "💀 Du feilet...";
          popupDesc.innerText =
            "Stjernenes kaos var for mye. Du mister Arcane Key og må starte på nytt.";
          removeItemFromInventory("Arcane Key");
          document.getElementById("restartGameBtn").classList.remove("hidden");
        }
      }
    };
  
    // window.continueToNextQuest = function () {
    //   console.log("➡️ Går videre til Quest 6...");
    //   removeItemFromInventory("Arcane Key"); // Fjern Arcane Key ved overgang
    //   window.location.href = "/quests/quest_6/quest6.html";
    // };
  
    window.continueToNextQuest = function () {
      console.log("➡️ Går tilbake til Quest 1...");
      removeItemFromInventory("Arcane Key"); // Fjern Arcane Key ved overgang
      window.location.href = "/quests/quest_1/quest1.html";
    };
  
    window.closePopup = function () {
      document.getElementById("systemPopup").classList.add("hidden");
      document.getElementById("questBox").classList.remove("hidden");
    };
  
    window.restartGame = function () {
      console.log("🔄 Starter spillet på nytt...");
      resetGameState();
      window.location.href = "/quests/quest_1/quest1.html";
    };
  });










