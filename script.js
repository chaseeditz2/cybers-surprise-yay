```javascript
/* =========================================================
   THE FINAL ACT
   Cyberwall's Birthday Escape Room
   WEATHER × THEATER × LOKI

   Main game controller
   ========================================================= */


/* =========================================================
   GAME STATE
   ========================================================= */

const gameState = {
    currentRoom: "start-screen",

    solved: {
        riddle1: false,
        riddle2: false,
        riddle3: false,
        riddle4: false,
        final: false
    },

    wrongAttempts: 0
};


/* =========================================================
   LETTER DATA
   ========================================================= */

/*
    IMPORTANT:

    These are temporary placeholders.

    Once you give me the 15 Escalation staff names
    and their letters, we will replace these.
*/

const letters = [
    {
        number: 1,
        name: "Escalation Staff Member #1",
        icon: "🌩️",
        text:
`Hey Cyberwall!

Happy birthday!

This is letter number one of fifteen.

Your birthday surprise has officially begun.

— Escalation Staff`
    },

    {
        number: 2,
        name: "Escalation Staff Member #2",
        icon: "🌪️",
        text:
`Happy birthday, Cyberwall!

The storm may be getting stronger,
but hopefully your birthday is even better.

Keep going...

— Escalation Staff`
    },

    {
        number: 3,
        name: "Escalation Staff Member #3",
        icon: "📡",
        text:
`Cyberwall,

The radar has found another message.

Happy birthday!

There are still more waiting for you.

— Escalation Staff`
    },

    {
        number: 4,
        name: "Escalation Staff Member #4",
        icon: "⚡",
        text:
`Happy birthday!

One storm.
One theater.
One very strange escape room.

And somehow, you are still here.

— Escalation Staff`
    },

    {
        number: 5,
        name: "Escalation Staff Member #5",
        icon: "☁️",
        text:
`Hey Cyberwall!

The clouds have cleared just enough
to let another birthday message through.

Have an amazing birthday!

— Escalation Staff`
    },

    {
        number: 6,
        name: "Escalation Staff Member #6",
        icon: "🎭",
        text:
`Welcome to the stage.

Every great performance needs an audience.

But today...

YOU are the star.

Happy birthday!

— Escalation Staff`
    },

    {
        number: 7,
        name: "Escalation Staff Member #7",
        icon: "🎟️",
        text:
`Your ticket has been accepted.

Your next destination:

The final act.

Happy birthday, Cyberwall!

— Escalation Staff`
    },

    {
        number: 8,
        name: "Escalation Staff Member #8",
        icon: "🎬",
        text:
`The cameras are rolling.

The lights are on.

And the birthday performance continues.

Happy birthday!

— Escalation Staff`
    },

    {
        number: 9,
        name: "Escalation Staff Member #9",
        icon: "🔦",
        text:
`A spotlight has found you.

Don't look away.

There are still secrets hidden backstage.

Happy birthday!

— Escalation Staff`
    },

    {
        number: 10,
        name: "Escalation Staff Member #10",
        icon: "🎼",
        text:
`Every act eventually reaches its climax.

You're getting closer.

Happy birthday, Cyberwall!

— Escalation Staff`
    },

    {
        number: 11,
        name: "Escalation Staff Member #11",
        icon: "🐍",
        text:
`Ah...

You made it to the trickster's territory.

Perhaps you are clever enough after all.

Happy birthday!

— Escalation Staff`
    },

    {
        number: 12,
        name: "Escalation Staff Member #12",
        icon: "🟢",
        text:
`The trickster has allowed another message through.

Consider yourself lucky.

Happy birthday, Cyberwall!

— Escalation Staff`
    },

    {
        number: 13,
        name: "Escalation Staff Member #13",
        icon: "🔐",
        text:
`One lock remains.

One storm remains.

One birthday remains to celebrate.

Happy birthday!

— Escalation Staff`
    },

    {
        number: 14,
        name: "Escalation Staff Member #14",
        icon: "👑",
        text:
`You have survived the theater.

You have survived the storm.

You have survived Loki.

Almost.

Happy birthday, Cyberwall!

— Escalation Staff`
    },

    {
        number: 15,
        name: "Escalation Staff Member #15",
        icon: "🎉",
        text:
`CYBERWALL!!!

YOU MADE IT!!!

Happy birthday!

Fifteen people.
Fifteen letters.
One giant surprise.

We hope you have an absolutely amazing birthday.

Thank you for everything you do for Escalation.

— Escalation Staff`
    }
];


/* =========================================================
   DOM HELPERS
   ========================================================= */

function getScreen(id) {
    return document.getElementById(id);
}


/* =========================================================
   SCREEN NAVIGATION
   ========================================================= */

function showScreen(id) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = getScreen(id);

    if (!target) {
        console.error("Screen not found:", id);
        return;
    }

    target.classList.add("active");

    gameState.currentRoom = id;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   ENTER THE THEATER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const enterButton = getScreen("enter-button");

    if (enterButton) {

        enterButton.addEventListener("click", () => {

            playThunder();

            setTimeout(() => {
                showScreen("lobby");
            }, 500);

        });

    }


    /* Close letter */

    const closeLetter = getScreen("close-letter");

    if (closeLetter) {

        closeLetter.addEventListener("click", closeLetterModal);

    }


    /* Click outside letter */

    const modal = getScreen("letter-modal");

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeLetterModal();
            }

        });

    }


    /* Escape key closes letter */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLetterModal();
        }

    });


    createLetters();

    startStorm();

});


/* =========================================================
   RIDDLE ANSWERS
   ========================================================= */

/*
    We allow several reasonable spellings/answers
    so the player doesn't get stuck because of capitalization.
*/

const answers = {

    1: [
        "radar",
        "weather radar",
        "radar screen"
    ],

    2: [
        "315",
        "315°",
        "315 degrees"
    ],

    3: [
        "loki",
        "trickster",
        "mask",
        "theater"
    ],

    4: [
        "loop",
        "circle",
        "ring",
        "ouroboros"
    ]

};


/* =========================================================
   RIDDLE CHECKER
   ========================================================= */

function checkRiddle(number) {

    const input = getScreen(`riddle-${number}`);

    const message = getScreen(`riddle-${number}-message`);

    if (!input || !message) {
        return;
    }

    const answer = normalizeAnswer(input.value);

    if (!answer) {

        showRiddleMessage(
            message,
            "Enter an answer first.",
            false
        );

        return;
    }


    const correct = answers[number].some(
        accepted => normalizeAnswer(accepted) === answer
    );


    if (correct) {

        gameState.solved[`riddle${number}`] = true;

        gameState.wrongAttempts = 0;

        showRiddleMessage(
            message,
            "✓ CORRECT — THE LOCK OPENS.",
            true
        );

        playSuccess();

        input.disabled = true;


        setTimeout(() => {

            advanceAfterRiddle(number);

        }, 900);

    }

    else {

        gameState.wrongAttempts++;

        showRiddleMessage(
            message,
            getWrongAnswerMessage(),
            false
        );

        shakeScreen();

        playThunder();

    }

}


/* =========================================================
   NORMALIZE ANSWERS
   ========================================================= */

function normalizeAnswer(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/[°]/g, "")
        .replace(/\s+/g, " ");

}


/* =========================================================
   WRONG ANSWER MESSAGES
   ========================================================= */

function getWrongAnswerMessage() {

    const messages = [

        "✕ INCORRECT — THE STORM IS WATCHING.",

        "✕ WRONG — LOOK CLOSER.",

        "✕ THAT IS NOT THE ANSWER.",

        "✕ THE TRICKSTER LAUGHS.",

        "✕ THE LOCK REMAINS CLOSED."

    ];

    const index =
        Math.min(
            gameState.wrongAttempts - 1,
            messages.length - 1
        );

    return messages[index];

}


/* =========================================================
   RIDDLE MESSAGE
   ========================================================= */

function showRiddleMessage(element, text, success) {

    element.textContent = text;

    element.classList.remove(
        "success",
        "error"
    );

    element.classList.add(
        success ? "success" : "error"
    );

}


/* =========================================================
   ADVANCE THROUGH ROOMS
   ========================================================= */

function advanceAfterRiddle(number) {

    switch (number) {

        case 1:

            showScreen("weather-room");

            break;


        case 2:

            showScreen("stage-room");

            break;


        case 3:

            showScreen("loki-room");

            break;


        case 4:

            showScreen("final-room");

            break;

    }

}


/* =========================================================
   FINAL CODE
   ========================================================= */

/*
    For now the final code is:

    1515

    Later we can make this MUCH more complicated by
    requiring the player to discover the code from clues
    hidden throughout all four acts.
*/

function checkFinalCode() {

    const input = getScreen("final-code");

    const message = getScreen("final-message");

    if (!input || !message) {
        return;
    }

    const answer = normalizeAnswer(input.value);

    if (answer === "1515") {

        gameState.solved.final = true;

        showRiddleMessage(
            message,
            "✓ THE FINAL LOCK OPENS...",
            true
        );

        playSuccess();

        setTimeout(() => {

            revealBirthday();

        }, 1400);

    }

    else {

        gameState.wrongAttempts++;

        showRiddleMessage(
            message,
            "✕ THE BOX REMAINS LOCKED.",
            false
        );

        shakeScreen();

        playThunder();

    }

}


/* =========================================================
   BIRTHDAY REVEAL
   ========================================================= */

function revealBirthday() {

    playBirthdaySequence();

    showScreen("letters-room");

    createLetters();

}


/* =========================================================
   CREATE LETTER CARDS
   ========================================================= */

function createLetters() {

    const container =
        getScreen("letters-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    letters.forEach(letter => {

        const card =
            document.createElement("div");

        card.className = "letter-card";

        card.innerHTML = `

            <div class="letter-number">
                LETTER ${String(letter.number).padStart(2, "0")}
            </div>

            <div class="letter-icon">
                ${letter.icon}
            </div>

            <h3>
                ${escapeHTML(letter.name)}
            </h3>

        `;

        card.addEventListener(
            "click",
            () => openLetter(letter)
        );

        container.appendChild(card);

    });

}


/* =========================================================
   OPEN LETTER
   ========================================================= */

function openLetter(letter) {

    const modal =
        getScreen("letter-modal");

    const title =
        getScreen("letter-title");

    const content =
        getScreen("letter-content");

    if (!modal || !title || !content) {
        return;
    }

    title.textContent =
        `LETTER ${letter.number} — ${letter.name}`;

    content.textContent =
        letter.text;

    modal.classList.add("active");

}


/* =========================================================
   CLOSE LETTER
   ========================================================= */

function closeLetterModal() {

    const modal =
        getScreen("letter-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   SCREEN SHAKE
   ========================================================= */

function shakeScreen() {

    const active =
        document.querySelector(".screen.active");

    if (!active) {
        return;
    }

    active.classList.remove("shake");

    /*
        Force browser to restart animation.
    */

    void active.offsetWidth;

    active.classList.add("shake");

}


/* =========================================================
   LIGHTNING
   ========================================================= */

function lightningFlash() {

    const lightning =
        document.querySelector(".lightning");

    if (!lightning) {
        return;
    }

    lightning.classList.remove("flash");

    void lightning.offsetWidth;

    lightning.classList.add("flash");

}


/* =========================================================
   STORM LOOP
   ========================================================= */

function startStorm() {

    function randomLightning() {

        const delay =
            5000 +
            Math.random() * 10000;

        setTimeout(() => {

            lightningFlash();

            randomLightning();

        }, delay);

    }

    randomLightning();

}


/* =========================================================
   THUNDER EFFECT
   ========================================================= */

function playThunder() {

    lightningFlash();

    shakeScreen();

}


/* =========================================================
   SUCCESS EFFECT
   ========================================================= */

function playSuccess() {

    lightningFlash();

    const active =
        document.querySelector(".screen.active");

    if (!active) {
        return;
    }

    active.style.transition =
        "box-shadow 0.4s ease";

    active.style.boxShadow =
        "inset 0 0 120px rgba(201,166,70,0.08)";

    setTimeout(() => {

        active.style.boxShadow = "";

    }, 500);

}


/* =========================================================
   BIRTHDAY SEQUENCE
   ========================================================= */

function playBirthdaySequence() {

    const lightning =
        document.querySelector(".lightning");

    if (!lightning) {
        return;
    }

    let flashes = 0;

    const interval =
        setInterval(() => {

            lightningFlash();

            flashes++;

            if (flashes >= 5) {

                clearInterval(interval);

            }

        }, 450);

}


/* =========================================================
   SECRET KEYBOARD SUPPORT
   ========================================================= */

/*
    Enter while typing an answer
    automatically submits the current riddle.
*/

document.addEventListener("keydown", event => {

    if (event.key !== "Enter") {
        return;
    }

    const active =
        document.querySelector(".screen.active");

    if (!active) {
        return;
    }

    const input =
        active.querySelector("input");

    if (!input) {
        return;
    }

    /*
        Don't interfere with buttons
        or other controls.
    */

    if (document.activeElement !== input) {
        return;
    }

    if (input.id === "riddle-1") {
        checkRiddle(1);
    }

    else if (input.id === "riddle-2") {
        checkRiddle(2);
    }

    else if (input.id === "riddle-3") {
        checkRiddle(3);
    }

    else if (input.id === "riddle-4") {
        checkRiddle(4);
    }

    else if (input.id === "final-code") {
        checkFinalCode();
    }

});


/* =========================================================
   DEBUG COMMANDS
   ========================================================= */

/*
    These are useful while building.

    Open the browser console with F12.

    You can type:

        skipToLetters()

    to jump straight to the birthday page.

    This does NOT need to be used by Cyberwall.
*/

window.skipToLetters = function() {

    gameState.solved.final = true;

    revealBirthday();

};


/* =========================================================
   END
   ========================================================= */
```
