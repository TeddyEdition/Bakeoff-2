// -------------------------------
// RULE DATA
// -------------------------------
// GAME rules: affect the entire game
const gameRules = [
  { label: ["cookoff", "recipe", "team"], rule: "Game Rule 1: Everyone must use only local ingredients." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Game Rule 2: Only pre-measured ingredients allowed." },
  { label: ["cookoff", "norecipe", "team"], rule: "Game Rule 3: 90-second shopping spree!" },
  { label: ["bakeoff", "recipe", "team"], rule: "Game Rule 4: Bake with a secret family recipe twist." }
];
// INDIVIDUAL challenges: affect only one player's challenge
const individualRules = [
  { label: ["cookoff", "recipe", "individual"], rule: "Individual Challenge 1: Use only one pan for the entire dish." },
  { label: ["bakeoff", "norecipe", "individual"], rule: "Individual Challenge 2: Your dessert must have a hidden ingredient." },
  { label: ["cookoff", "norecipe", "individual"], rule: "Individual Challenge 3: Prepare your dish blindfolded for 1 minute." },
  { label: ["bakeoff", "recipe", "individual"], rule: "Individual Challenge 4: Decorate your plate as a mini work of art." }
];
// TEAM game rules: for games in team mode (applied to both teams)
const teamGameRules = [
  { label: ["cookoff", "team"], rule: "Team Game Rule A: Both teams must swap an ingredient." },
  { label: ["bakeoff", "team"], rule: "Team Game Rule B: Each team must create two complementary dishes." }
];

// -------------------------------
// GLOBAL VARIABLES
const games = [];  // Array to store added games

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
// PRESET GAME TYPE DESCRIPTION UPDATE
document.getElementById("presetGameType").addEventListener("change", function() {
  const value = this.value;
  let description = "";
  if (value === "standard") {
    description = "Standard Game: A preset game with random team and individual rule generation.";
  } else if (value === "custom") {
    description = "Custom Game: Preset game type where you can set your own explanation, but random rule generation is available.";
  }
  document.getElementById("presetDescription").innerHTML = `<em>${description}</em>`;
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
    rule.label.includes(game.type) &&
    rule.label.includes("team")
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
  
  const game = {
    type: typeParam,
    preset: presetGameType,
    recipe: recipe,
    mode: mode,
    time: timeAllotted,
    individualChallenge: generateIndividualChallengeForGame({ type: typeParam, recipe: recipe, mode: mode }),
    teamGameRule: (mode === "team" ? generateTeamGameRuleForGame({ type: typeParam, recipe: recipe, mode: mode }) : ""),
    players: []  // Array to store player names
  };
  
  games.push(game);
  displayGames();
}

// Event listeners for adding games
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
    // Player management section for this game
    html += `<div>
               <label for="game-${index}-playerInput">Add Player:</label>
               <input type="text" id="game-${index}-playerInput" placeholder="Enter player name">
               <button onclick="addPlayer(${index})">Add Player</button>
               <div id="game-${index}-players"><em>No players yet.</em></div>
             </div>`;
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
