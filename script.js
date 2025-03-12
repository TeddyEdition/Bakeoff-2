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

// Global variables for current rule selections
let currentGameRule = null;
let currentIndividualRule = null;

// -------------------------------
// SESSION MANAGEMENT DATA
// Array to store session games.
const sessionGames = [];

// -------------------------------
// TEAM MANAGEMENT DATA
// Array to store teams. Each team is an object: { name: string, players: array }
const teams = [];

// -------------------------------
// FUNCTION: generateGameRule
function generateGameRule() {
  const gameType = document.getElementById("gameType").value;
  const recipeType = document.getElementById("recipeType").value;
  const teamType = document.getElementById("teamType").value;
  
  const filteredGameRules = gameRules.filter(rule =>
    (gameType === "both" ? (rule.label.includes("cookoff") || rule.label.includes("bakeoff")) : rule.label.includes(gameType)) &&
    rule.label.includes(recipeType) &&
    rule.label.includes(teamType)
  );
  
  if (filteredGameRules.length > 0) {
    currentGameRule = filteredGameRules[Math.floor(Math.random() * filteredGameRules.length)];
    document.getElementById("game-output").innerText = `Game Rule: ${currentGameRule.rule}`;
  } else {
    document.getElementById("game-output").innerText = "No matching Game Rule found.";
    currentGameRule = null;
  }
}

// -------------------------------
// FUNCTION: generateIndividualChallenge
function generateIndividualChallenge() {
  const gameType = document.getElementById("gameType").value;
  const recipeType = document.getElementById("recipeType").value;
  const teamType = document.getElementById("teamType").value;
  
  const filteredIndividualRules = individualRules.filter(rule =>
    (gameType === "both" ? (rule.label.includes("cookoff") || rule.label.includes("bakeoff")) : rule.label.includes(gameType)) &&
    rule.label.includes(recipeType) &&
    rule.label.includes(teamType)
  );
  
  if (filteredIndividualRules.length > 0) {
    currentIndividualRule = filteredIndividualRules[Math.floor(Math.random() * filteredIndividualRules.length)];
    document.getElementById("game-output2").innerText = `Individual Challenge: ${currentIndividualRule.rule}`;
  } else {
    document.getElementById("game-output2").innerText = "No matching Individual Challenge found.";
    currentIndividualRule = null;
  }
}

// -------------------------------
// TIME RANDOMIZATION FUNCTIONALITY
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
document.getElementById("addGame").addEventListener("click", function() {
  const gameType = document.getElementById("gameType").value;
  const recipeType = document.getElementById("recipeType").value;
  const teamType = document.getElementById("teamType").value;
  const timeAllotted = document.getElementById("timeInput").value;
  
  if (!currentGameRule || !currentIndividualRule) {
    alert("Please generate both Game Rule and Individual Challenge first.");
    return;
  }
  
  const game = {
    gameType,
    recipeType,
    teamType,
    timeAllotted,
    gameRule: currentGameRule.rule,
    individualRule: currentIndividualRule.rule
  };
  
  sessionGames.push(game);
  displaySession();
  
  currentGameRule = null;
  currentIndividualRule = null;
  document.getElementById("game-output").innerText = "";
  document.getElementById("game-output2").innerText = "";
});

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
               Game Rule: ${game.gameRule}<br>
               Individual Challenge: ${game.individualRule}
             </div>`;
  });
  sessionDiv.innerHTML = html;
}

// -------------------------------
// TEAM MANAGEMENT FUNCTIONS
// Add a new team
document.getElementById("addTeam").addEventListener("click", function() {
  const teamName = document.getElementById("teamNameInput").value.trim();
  if (!teamName) {
    alert("Please enter a team name.");
    return;
  }
  const team = { name: teamName, players: [] };
  teams.push(team);
  displayTeams();
  document.getElementById("teamNameInput").value = "";
});

// Display teams and their players
function displayTeams() {
  const teamsDiv = document.getElementById("teamsDisplay");
  if (teams.length === 0) {
    teamsDiv.innerHTML = "<em>No teams created yet.</em>";
    return;
  }
  let html = "";
  teams.forEach((team, teamIndex) => {
    html += `<div class="team">
               <h3>${team.name}</h3>
               <div id="team-${teamIndex}-players">`;
    if (team.players.length === 0) {
      html += "<em>No players yet.</em>";
    } else {
      team.players.forEach((player, playerIndex) => {
        html += `<div class="player">
                   <span>${player}</span>
                   <button onclick="rollPlayer(${teamIndex}, ${playerIndex})">Roll Challenge</button>
                   <span id="player-${teamIndex}-${playerIndex}-result"></span>
                 </div>`;
      });
    }
    html += `</div>
             <div>
               <input type="text" id="team-${teamIndex}-playerInput" placeholder="Enter player name">
               <button onclick="addPlayer(${teamIndex})">Add Player</button>
             </div>
             <div>
               <button onclick="removeTeam(${teamIndex})">Remove Team</button>
             </div>
             </div>`;
  });
  teamsDiv.innerHTML = html;
}

// Add a player to a team
function addPlayer(teamIndex) {
  const inputId = `team-${teamIndex}-playerInput`;
  const playerName = document.getElementById(inputId).value.trim();
  if (!playerName) {
    alert("Please enter a player name.");
    return;
  }
  teams[teamIndex].players.push(playerName);
  displayTeams();
}

// Remove a team
function removeTeam(teamIndex) {
  teams.splice(teamIndex, 1);
  displayTeams();
}

// Roll challenge for an individual player (example: generate a random number)
function rollPlayer(teamIndex, playerIndex) {
  const result = Math.floor(Math.random() * 100) + 1;
  document.getElementById(`player-${teamIndex}-${playerIndex}-result`).innerText = ` Challenge: ${result}`;
}

// -------------------------------
// Placeholder for Secret Functionality
// Future code can reveal secrets based on fractions of the allotted time
