// Quiz Logic
function startQuiz() {
    const questions = [
        "Do you reuse passwords?",
        "Do you click links without checking?",
        "Do you enable MFA on your accounts?"
    ];
    let score = 0;

    questions.forEach((question, index) => {
        const answer = confirm(question);
        if (answer) score++;
    });

    const results = document.getElementById("quiz-results");
    if (score === 0) {
        results.innerHTML = "<p>You're a Phish Ninja! 🐟</p>";
    } else if (score <= 2) {
        results.innerHTML = "<p>You're at moderate risk. Be careful!</p>";
    } else {
        results.innerHTML = "<p>You're a Phish Magnet! 🎣</p>";
    }
}

// Shield Builder Game
const tools = document.querySelectorAll(".tool");
const shield = document.getElementById("shield");

tools.forEach(tool => {
    tool.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.tool);
    });
});

shield.addEventListener("dragover", (e) => {
    e.preventDefault();
});

shield.addEventListener("drop", (e) => {
    e.preventDefault();
    const tool = e.dataTransfer.getData("text/plain");
    shield.innerHTML = `<p>${tool.toUpperCase()} added!</p>`;
});

// PhishHunter Game
const phishHunterGameArea = document.getElementById("game-area");
const phishHunterScoreDisplay = document.getElementById("game-score");
let phishHunterScore = 0;

function createPhishHunterEmail() {
    const email = document.createElement("div");
    email.classList.add("email");
    email.textContent = "Phishing";
    email.style.left = `${Math.random() * (phishHunterGameArea.offsetWidth - 100)}px`;
    email.style.top = "0";
    phishHunterGameArea.appendChild(email);

    email.addEventListener("click", () => {
        phishHunterScore++;
        phishHunterScoreDisplay.textContent = `Score: ${phishHunterScore}`;
        phishHunterGameArea.removeChild(email);
    });

    const fall = setInterval(() => {
        const top = parseInt(email.style.top) || 0;
        if (top >= phishHunterGameArea.offsetHeight - 50) {
            clearInterval(fall);
            phishHunterGameArea.removeChild(email);
        } else {
            email.style.top = `${top + 5}px`;
        }
    }, 100);
}

setInterval(createPhishHunterEmail, 2000);
// Respond Game Logic
const respondScenarios = [
    {
        scenario: "You receive an email claiming your bank account will be locked unless you click a link. What do you do?",
        correctAction: "pause"
    },
    {
        scenario: "A colleague sends you an urgent message asking for sensitive information. What do you do?",
        correctAction: "verify"
    },
    {
        scenario: "You suspect an email is a phishing attempt. What do you do next?",
        correctAction: "report"
    }
];

let currentRespondScenario = 0;
let respondScore = 0;
const scenarioElement = document.getElementById("scenario");
const respondFeedback = document.getElementById("respond-feedback");
const respondScoreDisplay = document.getElementById("respond-score");

function loadRespondScenario() {
    scenarioElement.textContent = respondScenarios[currentRespondScenario].scenario;
    respondFeedback.textContent = "";
}

document.querySelectorAll(".respond-option").forEach(button => {
    button.addEventListener("click", () => {
        const selectedAction = button.dataset.action;
        const correctAction = respondScenarios[currentRespondScenario].correctAction;

        if (selectedAction === correctAction) {
            respondFeedback.textContent = "Correct! Great job! 🎉";
            respondFeedback.style.color = "green";
            respondScore++;
        } else {
            respondFeedback.textContent = "Oops! That's not the best action. Try again!";
            respondFeedback.style.color = "red";
        }

        respondScoreDisplay.textContent = `Score: ${respondScore}`;
        currentRespondScenario = (currentRespondScenario + 1) % respondScenarios.length;
        setTimeout(loadRespondScenario, 2000);
    });
});

loadRespondScenario();

// Recover Game Logic
const recoverScenarios = [
    {
        scenario: "You clicked a phishing link and entered your password. What's the first step to recover?",
        correctAction: "reset-passwords"
    },
    {
        scenario: "You suspect your account was compromised. What should you enable to secure it?",
        correctAction: "enable-mfa"
    },
    {
        scenario: "You're unsure how to proceed after a phishing attack. Who should you contact?",
        correctAction: "contact-support"
    }
];

let currentRecoverScenario = 0;
let recoverScore = 0;
const recoverScenarioElement = document.getElementById("recover-scenario");
const recoverFeedback = document.getElementById("recover-feedback");
const recoverScoreDisplay = document.getElementById("recover-score");

function loadRecoverScenario() {
    recoverScenarioElement.textContent = recoverScenarios[currentRecoverScenario].scenario;
    recoverFeedback.textContent = "";
}

document.querySelectorAll(".recover-option").forEach(button => {
    button.addEventListener("click", () => {
        const selectedAction = button.dataset.action;
        const correctAction = recoverScenarios[currentRecoverScenario].correctAction;

        if (selectedAction === correctAction) {
            recoverFeedback.textContent = "Correct! You're on the right track! 🎉";
            recoverFeedback.style.color = "green";
            recoverScore++;
        } else {
            recoverFeedback.textContent = "Not quite! Let's try again.";
            recoverFeedback.style.color = "red";
        }

        recoverScoreDisplay.textContent = `Score: ${recoverScore}`;
        currentRecoverScenario = (currentRecoverScenario + 1) % recoverScenarios.length;
        setTimeout(loadRecoverScenario, 2000);
    });
});

loadRecoverScenario();