/* ==========================================
   THE FINAL ACT
   Cyberwall's Birthday Escape Room
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("THE FINAL ACT loaded successfully.");

    const enterButton = document.getElementById("enter-button");

    if (!enterButton) {
        console.error("ENTER button was not found.");
        return;
    }

    enterButton.addEventListener("click", function () {

        console.log("ENTER THE THEATER clicked.");

        const startScreen = document.getElementById("start-screen");
        const lobbyScreen = document.getElementById("lobby");

        if (!startScreen || !lobbyScreen) {
            console.error("Start screen or lobby is missing.");
            return;
        }

        startScreen.classList.remove("active");
        lobbyScreen.classList.add("active");

        console.log("Entered the theater.");

    });

});
