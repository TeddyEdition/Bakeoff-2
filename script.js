// -------------------------------
// RULE DATA
// -------------------------------
// GAME rules: these affect the entire game
const gameRules = [
  { label: ["cookoff", "recipe", "team"], rule: "Game Rule 1: All dishes must include a locally sourced ingredient." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Game Rule 2: Only pre-measured ingredients allowed for consistency." },
  { label: ["cookoff", "norecipe", "team"], rule: "Game Rule 3: 90-second shopping spree for a surprise ingredient!" },
  { label: ["bakeoff", "recipe", "team"], rule: "Game Rule 4: Incorporate a secret family recipe twist." }
];
// INDIVIDUAL challenges: these affect only a single player's task
const individualRules = [
  { label: ["cookoff", "recipe", "individual"], rule: "Individual Challenge 1: Use only one pan for the entire dish." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Individual Challenge 2: Your dessert must hide an unexpected ingredient." },
  { label: ["cookoff", "norecipe", "individual"], rule: "Individual Challenge 3: Cook blindfolded for 1 minute during prep." },
  { label: ["bakeoff", "recipe", "individual"], rule: "Individual Challenge 4: Decorate your plate as a miniature work of art." }
];
// TEAM game rules: these are applied to games in team mode (for both teams)
const teamGameRules = [
  { label: ["cookoff", "team"], rule: "Team Game Rule A: Both teams must swap one key ingredient mid-game." },
  { label: ["bakeoff", "team"], rule: "Team Game Rule B: Each team must create two complementary components." }
];

// -------------------------------
// GLOBAL VARIABLES
// Array to store added games
const games = [];

// -------------------------------
// PRESET GAME TYPE DESCRIPTION UPDATE
document.getElementById("presetGameType").addEventListener("change", function() {
  const value = this.value;
  let description = "";
  if (value === "standard") {
    description = "Standard Game: Random rule generation for teams and individuals.";
  } else if (value === "custom") {
    description = "Custom Game: Choose your preset game type with additional explanation (preset rules available).";
  }
  document.getElementById("presetDescription").innerHTML = `<em>${description}</em>`;
});

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
  document.getElementById("globalTime").value = randomTime;
});

// -------------------------------
// FUNCTIONS TO GENERATE CHALLENGES FOR A GAME
function generateIndividualChallengeForGame(game) {
  const filtered = individualRules.filter(rule =>
    rule.label.includes(game.type) &&
    rule.label.includes(game.recipe) &&
    rule.label.includes(game.mode)
  );
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)].rule;
  }
  return "No matching Individual Challenge found.";
}

function generateTeamGameRuleForGame(game) {
  const filtered = teamGameRules.filter(rule =>
    rule.label.includes(game.type) && rule.label.includes("team")
  );
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)].rule;
  }
  return "No matching Team Game Rule found.";
}

// -------------------------------
// FUNCTION TO ADD A GAME
// typeParam: "cookoff" or "bakeoff"
function addGame(typeParam) {
  const presetGameType = document.getElementById("presetGameType").value;
  const recipe = document.getElementById("globalRecipeType").value;
  const mode = document.getElementById("globalTeamType").value;
  const timeAllotted = document.getElementById("globalTime").value;
  
  // Create game object with its own settings and generated challenges.
  const game = {
    type: typeParam,
    preset: presetGameType,
    recipe: recipe,
    mode: mode,
    time: timeAllotted,
    individualChallenge: generateIndividualChallengeForGame({ type: typeParam, recipe: recipe, mode: mode }),
    teamGameRule: (mode === "team" ? generateTeamGameRuleForGame({ type: typeParam, recipe: recipe, mode: mode }) : ""),
    players: [] // Array to store player names (for both team and individual games)
  };
  
  games.push(game);
  displayGames();
}

// Event listeners for adding games:
document.getElementById("addCookOff").addEventListener("click", function() {
  addGame("cookoff");
});
document.getElementById("addBakeOff").addEventListener("click", function() {
  addGame("bakeoff");
});

// -------------------------------
// DISPLAY GAMES
function displayGames() {
  const container = document.getElementById("gamesContainer");
  if (games.length === 0) {
    container.innerHTML = "<em>No games added yet.</em>";
    return;
  }
  let html = "";
  games.forEach((game, index) => {
    html += `<div class="game" id="game-${index}">
               <h3>Game ${index + 1}: ${game.type.toUpperCase()} (${game.preset})</h3>
               <p>Recipe Option: ${game.recipe}</p>
               <p>Mode: ${game.mode}</p>
               <p>Allotted Time: ${game.time} minutes</p>
               <p>Individual Challenge: ${game.individualChallenge}</p>`;
    if (game.mode === "team") {
      html += `<p>Team Game Rule: ${game.teamGameRule}</p>`;
    }
    // Player management section for this game (works for both team and individual)
    html += `<div>
               <label for="game-${index}-playerInput">Add Player:</label>
               <input type="text" id="game-${index}-playerInput" placeholder="Enter player name">
               <button class="btn-gray" onclick="addPlayer(${index})">Add Player</button>
               <div id="game-${index}-players"><em>No players yet.</em></div>
             </div>
             <hr>
             <button class="btn-blue" onclick="generateIndividualChallenge(${index})">Regenerate Individual Challenge</button>`;
    if (game.mode === "team") {
      html += `<button class="btn-blue" onclick="generateTeamGameRule(${index})">Regenerate Team Game Rule</button>`;
    }
    html += `</div>`;
  });
  container.innerHTML = html;
}

// -------------------------------
// ADD PLAYER TO A GAME
function addPlayer(gameIndex) {
  const inputId = `game-${gameIndex}-playerInput`;
  const playerName = document.getElementById(inputId).value.trim();
  if (!playerName) {
    alert("Please enter a player name.");
    return;
  }
  games[gameIndex].players.push(playerName);
  displayGames();
}

// -------------------------------
// REGENERATE INDIVIDUAL CHALLENGE FOR A GAME
function generateIndividualChallenge(gameIndex) {
  const game = games[gameIndex];
  game.individualChallenge = generateIndividualChallengeForGame(game);
  displayGames();
}

// -------------------------------
// REGENERATE TEAM GAME RULE FOR A GAME (if applicable)
function generateTeamGameRule(gameIndex) {
  const game = games[gameIndex];
  if (game.mode === "team") {
    game.teamGameRule = generateTeamGameRuleForGame(game);
  }
  displayGames();
}

// -------------------------------
// GAME Container: Create an area to display all games
document.addEventListener("DOMContentLoaded", function() {
  // Create a container for games if it doesn't exist
  if (!document.getElementById("gamesContainer")) {
    const div = document.createElement("div");
    div.id = "gamesContainer";
    document.querySelector(".container").appendChild(div);
  }
});
