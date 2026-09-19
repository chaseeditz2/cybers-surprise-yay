/* ==========================================
   THE FINAL ACT
   Cyberwall's Birthday Escape Room
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("THE FINAL ACT: JavaScript loaded.");

    const enterButton = document.getElementById("enter-button");

    if (!enterButton) {
        console.error("ERROR: #enter-button was not found.");
        return;
    }

    enterButton.addEventListener("click", () => {
        console.log("ENTER THE THEATER clicked!");

        const startScreen = document.getElementById("start-screen");
        const lobbyScreen = document.getElementById("lobby");

        if (!startScreen || !lobbyScreen) {
            console.error("ERROR: Start screen or lobby not found.");
            return;
        }

        startScreen.classList.remove("active");
        lobbyScreen.classList.add("active");

        // Small visual effect
        document.body.classList.add("theater-enter");

        setTimeout(() => {
            document.body.classList.remove("theater-enter");
        }, 1000);
    });
});
