// Quiz Logic
const questions = [
    "Do you reuse passwords?", // Risky behavior
    "Do you click links without checking?", // Risky behavior
    "Do you enable MFA on your accounts?" // Safe behavior
];

let currentQuestionIndex = 0;
let score = 0;

const quizQuestion = document.getElementById("quiz-question");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const quizFeedback = document.getElementById("quiz-feedback");
const quizResults = document.getElementById("quiz-results");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        quizQuestion.textContent = questions[currentQuestionIndex];
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    } else {
        showResults();
    }
}

function handleAnswer(answer) {
    // Check if the current question is about enabling MFA
    const isMFAQuestion = questions[currentQuestionIndex].includes("enable MFA");

    // Update score based on the question
    if (isMFAQuestion) {
        // For MFA question, "Yes" is safe (add to score), "No" is risky (do not add)
        if (answer) score++;
    } else {
        // For other questions, "No" is safe (add to score), "Yes" is risky (do not add)
        if (!answer) score++;
    }

    currentQuestionIndex++;
    quizFeedback.textContent = answer === isMFAQuestion ? "Correct! 🎉" : "Oops! Be careful. 😅";
    quizFeedback.style.color = answer === isMFAQuestion ? "green" : "red";
    setTimeout(() => {
        quizFeedback.textContent = "";
        loadQuestion();
    }, 1000);
}

yesButton.addEventListener("click", () => handleAnswer(true)); // "Yes" for MFA is safe
noButton.addEventListener("click", () => handleAnswer(false)); // "No" for MFA is risky

function showResults() {
    let resultText;
    if (score === questions.length) {
        resultText = "<p>You're a Phish Ninja! 🐟</p><p>You have excellent basic phishing awareness!</p>";
    } else if (score >= 1) {
        resultText = "<p>You're at moderate risk. Be careful!</p><p>Review your online habits to stay safe.</p>";
    } else {
        resultText = "<p>You're a Phish Magnet! 🎣</p><p>Take steps to improve your phishing awareness.</p>";
    }
    quizResults.innerHTML = resultText;
    quizQuestion.textContent = "Quiz Complete!";
    yesButton.style.display = "none";
    noButton.style.display = "none";
}

// Start the quiz
loadQuestion();

// Shield Builder Game Logic
const tools = document.querySelectorAll(".tool");
const shield = document.getElementById("shield");
const progressBar1 = document.getElementById("progress-bar");
const shieldFeedback = document.getElementById("shield-feedback");

let toolsAdded = 0;
const totalTools = tools.length;

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
    toolsAdded++;

    // Update progress bar
    progressBar1.style.width = `${(toolsAdded / totalTools) * 100}%`;

    // Provide feedback
    switch (tool) {
        case "mfa":
            shieldFeedback.textContent = "MFA added! This helps secure your accounts.";
            break;
        case "password-manager":
            shieldFeedback.textContent = "Password Manager added! Now you can create strong passwords.";
            break;
        case "antivirus":
            shieldFeedback.textContent = "Antivirus added! Your devices are now protected from malware.";
            break;
    }

    // Check if all tools are added
    if (toolsAdded === totalTools) {
        shieldFeedback.textContent = "Congratulations! Your Phish Shield is complete. 🎉";
        shieldFeedback.style.color = "green";
    }
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

// Phish Detective Game Logic spot red flag
const emailDisplay = document.getElementById("email-display");
const detectiveScoreDisplay = document.getElementById("detective-score");
const detectiveFeedback = document.getElementById("detective-feedback");
let detectiveScore = 0;

const emails = [
    {
        content: `Dear Customer,<br>
                  Your account will be locked unless you <span class="red-flag">verify your details</span> immediately.<br>
                  Click <span class="red-flag">here</span> to avoid account suspension.<br>
                  Sincerely,<br>
                  <span class="red-flag">Support Team</span>`,
        redFlags: ["verify your details", "here", "Support Team"]
    },
    {
        content: `Hello,<br>
                  You've won a $1000 gift card! Click <span class="red-flag">this link</span> to claim your prize.<br>
                  Hurry, offer ends soon!<br>
                  Best,<br>
                  <span class="red-flag">Prize Team</span>`,
        redFlags: ["this link", "Prize Team"]
    }
];

let currentEmailIndex = 0;

function loadEmail() {
    emailDisplay.innerHTML = emails[currentEmailIndex].content;
    detectiveFeedback.textContent = "";

    document.querySelectorAll(".red-flag").forEach(flag => {
        flag.addEventListener("click", () => {
            if (emails[currentEmailIndex].redFlags.includes(flag.textContent)) {
                detectiveScore++;
                detectiveFeedback.textContent = "Correct! 🎉";
                detectiveFeedback.style.color = "green";
                flag.style.color = "green";
            } else {
                detectiveScore--;
                detectiveFeedback.textContent = "Oops! Not a red flag. 😅";
                detectiveFeedback.style.color = "red";
            }
            detectiveScoreDisplay.textContent = `Score: ${detectiveScore}`;
        });
    });
}

loadEmail();

// Load next email after a delay
setInterval(() => {
    currentEmailIndex = (currentEmailIndex + 1) % emails.length;
    loadEmail();
}, 10000); // Change email every 10 seconds


// Phish Fall Game Logic
const fallArea = document.getElementById("fall-area");
const fallScoreDisplay = document.getElementById("fall-score");
const fallFeedback = document.getElementById("fall-feedback");
let fallScore = 0;
let emailSpeed = 2; // Initial speed of emails
let emailInterval = 2000; // Initial interval between emails
let lastEmailTime = 0; // Track the time of the last email creation
const minEmailSpacing = 300; // Minimum spacing between emails (in pixels)

function createEmail(isPhish) {
    const email = document.createElement("div");
    email.classList.add("email");
    email.textContent = isPhish ? "Phish" : "Legit";
    email.style.left = `${Math.random() * (fallArea.offsetWidth - 100)}px`; // Random horizontal position
    email.style.top = "0";
    fallArea.appendChild(email);

    const fall = setInterval(() => {
        const top = parseInt(email.style.top) || 0;
        if (top >= fallArea.offsetHeight - 50) {
            clearInterval(fall);
            fallArea.removeChild(email);
            if (!isPhish) {
                fallFeedback.textContent = "Missed a legit email! 😅";
                fallFeedback.style.color = "red";
            }
        } else {
            email.style.top = `${top + emailSpeed}px`;
        }
    }, 50);

    email.addEventListener("click", () => {
        if (!isPhish) {
            fallScore++;
            fallFeedback.textContent = "Caught a legit email! 🎉";
            fallFeedback.style.color = "green";
        } else {
            fallScore--;
            fallFeedback.textContent = "Oops! That was a phish. 😅";
            fallFeedback.style.color = "red";
        }
        fallScoreDisplay.textContent = `Score: ${fallScore}`;
        fallArea.removeChild(email);
        clearInterval(fall);

        // Increase difficulty every 5 points
        if (fallScore % 5 === 0) {
            emailSpeed += 1; // Increase speed
            emailInterval = Math.max(1000, emailInterval - 200); // Decrease interval
            clearInterval(emailCreationInterval);
            emailCreationInterval = setInterval(() => {
                createEmail(Math.random() > 0.5); // 50% chance of phishing
            }, emailInterval);
        }
    });
}

function spawnEmail() {
    const currentTime = Date.now();
    if (currentTime - lastEmailTime >= emailInterval) {
        createEmail(Math.random() > 0.5); // 50% chance of phishing
        lastEmailTime = currentTime;
    }
}

let emailCreationInterval = setInterval(spawnEmail, emailInterval);


// Phish Recovery Game Logic
const recoveryStatus = document.getElementById("recovery-status");
const recoveryTasks = document.getElementById("recovery-tasks");
const recoveryScoreDisplay = document.getElementById("recovery-score");
const recoveryFeedback = document.getElementById("recovery-feedback");
let recoveryScore = 0;

const tasks = [
    { name: "Reset Passwords", completed: false },
    { name: "Enable MFA", completed: false },
    { name: "Scan for Malware", completed: false },
    { name: "Contact Support", completed: false }
];

function loadRecoveryGame() {
    recoveryStatus.textContent = "System Compromised! Complete the tasks to recover.";
    recoveryTasks.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskButton = document.createElement("button");
        taskButton.classList.add("task");
        taskButton.textContent = task.name;
        taskButton.addEventListener("click", () => {
            if (!task.completed) {
                task.completed = true;
                recoveryScore++;
                recoveryFeedback.textContent = `Task completed: ${task.name} 🎉`;
                recoveryFeedback.style.color = "green";
                taskButton.style.backgroundColor = "#004d40";
                taskButton.style.cursor = "not-allowed";
            } else {
                recoveryFeedback.textContent = "Task already completed!";
                recoveryFeedback.style.color = "red";
            }
            recoveryScoreDisplay.textContent = `Score: ${recoveryScore}`;

            if (tasks.every(t => t.completed)) {
                recoveryStatus.textContent = "System Restored! 🎉";
                recoveryFeedback.textContent = "Congratulations! You've recovered the system.";
                recoveryFeedback.style.color = "green";
            }
        });
        recoveryTasks.appendChild(taskButton);
    });
}

loadRecoveryGame();
