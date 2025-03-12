// -------------------------------
// RULE DATA
// -------------------------------
// Two sets of rules: GAME rules and INDIVIDUAL challenges.
// You can add more rules with the appropriate labels.
const gameRules = [
  { label: ["cookoff", "recipe", "team"], rule: "Game Rule 1: Everyone must use only local ingredients." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Game Rule 2: Only pre-measured ingredients allowed." },
  { label: ["cookoff", "norecipe", "team"], rule: "Game Rule 3: 90-second shopping spree!" },
  { label: ["bakeoff", "recipe", "team"], rule: "Game Rule 4: Bake with a secret family recipe twist." }
];

const individualRules = [
  { label: ["cookoff", "recipe", "individual"], rule: "Individual Challenge 1: Use only one pan for the entire dish." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Individual Challenge 2: Your dessert must have a hidden ingredient." },
  { label: ["cookoff", "norecipe", "individual"], rule: "Individual Challenge 3: Prepare your dish blindfolded for 1 minute." },
  { label: ["bakeoff", "recipe", "team"], rule: "Individual Challenge 4: Decorate your plate as a mini work of art." }
];

// Global variables for current rule selection
let currentGameRule = null;
let currentIndividualRule = null;

// Session storage: array of game sessions. Each session is an array of game objects.
const sessionGames = [];

// -------------------------------
// FUNCTION: generateRules
// Filters rules based on selected options (game type, recipe option, mode) 
// and randomly selects one GAME rule and one INDIVIDUAL challenge.
function generateRules() {
  const gameType = document.getElementById("gameType").value;
  const recipeType = document.getElementById("recipeType").value;
  const teamType = document.getElementById("teamType").value;
  
  // Filter game rules
  const filteredGameRules = gameRules.filter(rule => 
    (gameType === "both" ? (rule.label.includes("cookoff") || rule.label.includes("bakeoff")) : rule.label.includes(gameType)) &&
    rule.label.includes(recipeType) &&
    rule.label.includes(teamType)
  );
  
  // Filter individual rules
  const filteredIndividualRules = individualRules.filter(rule =>
    (gameType === "both" ? (rule.label.includes("cookoff") || rule.label.includes("bakeoff")) : rule.label.includes(gameType)) &&
    rule.label.includes(recipeType) &&
    rule.label.includes(teamType)
  );
  
  // Randomly pick one from each category if available
  currentGameRule = filteredGameRules.length > 0 ? filteredGameRules[Math.floor(Math.random() * filteredGameRules.length)] : null;
  currentIndividualRule = filteredIndividualRules.length > 0 ? filteredIndividualRules[Math.floor(Math.random() * filteredIndividualRules.length)] : null;
  
  let outputText = "";
  if (currentGameRule) {
    outputText += `Game Rule: ${currentGameRule.rule}\n`;
  } else {
    outputText += "No matching Game Rule found.\n";
  }
  
  if (currentIndividualRule) {
    outputText += `Individual Challenge: ${currentIndividualRule.rule}`;
  } else {
    outputText += "No matching Individual Challenge found.";
  }
  
  document.getElementById("game-output").innerText = outputText;
}

// -------------------------------
// TIME RANDOMIZATION FUNCTIONALITY
// Randomizes the allotted time (in minutes) from a given range.
document.getElementById("randomizeTime").addEventListener("click", function() {
  const minTime = parseInt(document.getElementById("minTime").value);
  const maxTime = parseInt(document.getElementById("maxTime").value);
  if (isNaN(minTime) || isNaN(maxTime) || minTime > maxTime) {
    alert("Please enter a valid time range.");
    return;
  }
  const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  document.getElementById("timeInput").value = randomTime;
});

// -------------------------------
// SESSION MANAGEMENT
// Adds the current game settings and rules to the session.
document.getElementById("addGame").addEventListener("click", function() {
  const gameType = document.getElementById("gameType").value;
  const recipeType = document.getElementById("recipeType").value;
  const teamType = document.getElementById("teamType").value;
  const timeAllotted = document.getElementById("timeInput").value;
  const players = document.getElementById("players").value; // comma-separated list
  
  if (!currentGameRule || !currentIndividualRule) {
    alert("Please generate the rules first.");
    return;
  }
  
  // Create a game object
  const game = {
    gameType,
    recipeType,
    teamType,
    timeAllotted,
    players: players.split(",").map(p => p.trim()).filter(p => p.length > 0),
    gameRule: currentGameRule.rule,
    individualRule: currentIndividualRule.rule
  };
  
  sessionGames.push(game);
  displaySession();
  
  // Clear current rule display
  currentGameRule = null;
  currentIndividualRule = null;
  document.getElementById("game-output").innerText = "";
});

// -------------------------------
// FUNCTION: displaySession
// Displays all games added to the current session.
function displaySession() {
  const sessionDiv = document.getElementById("sessionDisplay");
  if (sessionGames.length === 0) {
    sessionDiv.innerHTML = "<em>No games in session yet.</em>";
    return;
  }
  let html = `<h3>Session Games:</h3>`;
  sessionGames.forEach((game, index) => {
    html += `<div class="session-game">
               <strong>Game ${index + 1}:</strong> ${game.gameType.toUpperCase()}, ${game.recipeType.toUpperCase()}, ${game.teamType.toUpperCase()}<br>
               Time: ${game.timeAllotted} minutes<br>
               Players: ${game.players.join(", ")}<br>
               Game Rule: ${game.gameRule}<br>
               Individual Challenge: ${game.individualRule}
             </div>`;
  });
  sessionDiv.innerHTML = html;
}

// -------------------------------
// Placeholder for Secret Functionality
// (You can later add logic to reveal secret challenges at fractions of the allotted time)
