// -------------------------------
// RULE DATA ARRAYS
// -------------------------------

// Preset Gamemodes: These are selectable from the global dropdown.
const presetGamemodes = [
  { key: "TOOGOODTOGO", rule: "TOOGOODTOGO GROCERY - Only use items from a ToGoodToGo grocery bag.", labels: "CBNRIT" },
  { key: "90Seconds", rule: "90 Seconds - You only have 90 seconds to grab your ingredients.", labels: "preset" },
  { key: "AUCTION", rule: "AUCTION GAME - Bid for ingredients; winners keep them exclusively.", labels: "preset" },
  { key: "Backward", rule: "Backward Recipe - Start with the finished dish and reverse-engineer it.", labels: "preset" },
  { key: "Speed", rule: "Speed Round - Extremely short time limit (e.g., 15 minutes).", labels: "preset" },
  { key: "Complicate", rule: "Complicate It - Make an incredibly complex dish.", labels: "preset" },
  { key: "Alphabet", rule: "Ingredient Alphabet - Use only ingredients starting with a specific letter.", labels: "preset" },
  { key: "Alternative", rule: "Alternative Auction - Draw a mystery ingredient from a box.", labels: "preset" },
  { key: "CulturalCritique", rule: "Cultural Critique - Create a dish inspired by a random country.", labels: "preset" }
];

// Game Twists: Affect the entire game (all players/teams)
const gameTwists = [
  { rule: "Make it dessert - A sweet version of a savory item.", labels: "CNIT" },
  { rule: "Make it savory - A savory version of a sweet item.", labels: "BNIT" },
  { rule: "Make it cheap - Total cost between $13-$20.", labels: "CBNRIT" },
  { rule: "CHOPT: INITIAL - Incorporate an ingredient chosen by the other players.", labels: "CBNRIT" },
  { rule: "CHOPT: MIX IT IN - Incorporate an ingredient chosen by others.", labels: "CBNRIT S1/3" },
  { rule: "Make it gourmet - Create an upper-class Michelin-style dish.", labels: "CNRI" },
  { rule: "Make it a gym snack - High protein, low calorie dish.", labels: "CBNRIT" },
  { rule: "Make it blindfolded - Prepare your dish blindfolded.", labels: "BNRI" },
  { rule: "NO TASTING - No tasting until the dish is finished.", labels: "CNRI" },
  { rule: "Make it in one pot/pan - Entire dish from one pot.", labels: "CNIT" },
  { rule: "CHOPT: RANDOM - Get 3 random ingredients.", labels: "CNIT" },
  { rule: "Fruitful Labour - Incorporate a fruit as a main focus.", labels: "CBNIT" },
  { rule: "Seasoning Sabotage - Must include a seasoning chosen by competitors.", labels: "CNIT" },
  { rule: "YOU CAN'T USE THAT! - Opponents remove up to 2 planned ingredients.", labels: "CBNRIT S1/4" },
  { rule: "Ingredient Swap - At a random moment, swap one key ingredient with a competitor.", labels: "CBNIT" },
  { rule: "Mystery Protein - Draw a protein at random to incorporate.", labels: "CNIT" },
  { rule: "Vegan Twist - Transform a meaty dish into a vegan masterpiece.", labels: "CNIT" },
  { rule: "Merge Teams - Randomly mix ingredient baskets with another team.", labels: "S" },
  { rule: "Recreate a Dish - Recreate a dish from a recipe; closest wins.", labels: "S" },
  { rule: "Double Swap - Two contestants swap one ingredient with each other.", labels: "S" },
  { rule: "Rotate Counterclockwise - Gift an ingredient counterclockwise.", labels: "CNT" },
  { rule: "Ingredient Swap: At a random moment, swap one key ingredient with a competitor’s.", labels: "CBNIT" },
  { rule: "Mystery Protein: Draw a protein at random that must be incorporated.", labels: "CNIT" }
  // (Add additional game twists as needed)
];

// Individual Twists: Affect one competitor only (generated via button next to player)
const individualTwists = [
  { rule: "Single Hand - Cook using only your non-dominant hand.", labels: "CNRI" },
  { rule: "Blindfolded Builder - One person cooks blindfolded while others guide verbally.", labels: "CNRT" },
  { rule: "Mystery Basket Pass - Each member adds an ingredient from a mystery basket.", labels: "CBRT" },
  { rule: "Timed Relay - Each member has a set time to complete their station.", labels: "CBNRT" },
  { rule: "Role Rotation - Swap roles midway (prep, cook, decorator).", labels: "CNRT" },
  { rule: "Ingredient Draft - Each member silently selects one ingredient.", labels: "CNT" },
  { rule: "No-Talk Round - Communicate only through gestures during selection.", labels: "CNT" },
  { rule: "Relay Assembly - Tag in a teammate to continue the dish.", labels: "CNT" }
  // (Add additional individual twists as needed)
];

// -------------------------------
// HELPER FUNCTION: ruleMatches
// Checks if a rule’s labels include required letters from game settings.
// gameSettings: { type: "C" or "B", recipe: "R" or "N", mode: "I" or "T" }
function ruleMatches(ruleLabels, gameSettings) {
  // If the rule is a preset gamemode rule (contains "preset"), it should NOT be rolled here.
  if (ruleLabels.indexOf("preset") !== -1) return false;
  if (gameSettings.type === "C" && ruleLabels.indexOf("C") === -1) return false;
  if (gameSettings.type === "B" && ruleLabels.indexOf("B") === -1) return false;
  if (gameSettings.recipe === "R" && ruleLabels.indexOf("R") === -1) return false;
  if (gameSettings.recipe === "N" && ruleLabels.indexOf("N") === -1) return false;
  if (gameSettings.mode === "I" && ruleLabels.indexOf("I") === -1) return false;
  if (gameSettings.mode === "T" && ruleLabels.indexOf("T") === -1) return false;
  return true;
}

// -------------------------------
// GLOBAL VARIABLES FOR GAMES
const games = []; // Array to store game objects

// -------------------------------
// PRESET GAME TYPE DESCRIPTION UPDATE
document.getElementById("presetGameType").addEventListener("change", function() {
  const value = this.value;
  let description = "";
  switch(value) {
    case "TOOGOODTOGO":
      description = "TOOGOODTOGO GROCERY - Only use items from a ToGoodToGo grocery bag.";
      break;
    case "90Seconds":
      description = "90 Seconds - You only have 90 seconds to grab your ingredients.";
      break;
    case "AUCTION":
      description = "AUCTION GAME - Bid for ingredients; winners keep them exclusively.";
      break;
    case "Backward":
      description = "Backward Recipe - Start with the finished dish and reverse-engineer it.";
      break;
    case "Speed":
      description = "Speed Round - Extremely short time limit (e.g., 15 minutes).";
      break;
    case "Complicate":
      description = "Complicate It - Make an incredibly complex dish.";
      break;
    case "Alphabet":
      description = "Ingredient Alphabet - Use only ingredients starting with a specific letter.";
      break;
    case "Alternative":
      description = "Alternative Auction - Draw a mystery ingredient from a box.";
      break;
    case "CulturalCritique":
      description = "Cultural Critique - Create a dish inspired by a random country.";
      break;
    default:
      description = "None selected (Custom Game).";
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
// FUNCTION TO GENERATE A GAME Twist (for entire game)
// Does not auto-generate individual twists.
function generateGameTwist(gameSettings) {
  const filtered = gameTwists.filter(item => ruleMatches(item.labels, gameSettings));
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)].rule;
  }
  return "No matching Game Twist found.";
}

// -------------------------------
// FUNCTION TO GENERATE AN INDIVIDUAL TWIST
// This is triggered for individual players.
function generateIndividualTwist(gameSettings) {
  const filtered = individualTwists.filter(item => ruleMatches(item.labels, gameSettings));
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)].rule;
  }
  return "No matching Individual Twist found.";
}

// -------------------------------
// FUNCTION TO ADD A GAME
// typeParam: "cookoff" or "bakeoff"
function addGame(typeParam) {
  // Convert game type to letter: "C" for cookoff, "B" for bakeoff.
  const gameTypeLetter = (typeParam === "cookoff") ? "C" : "B";
  const recipe = document.getElementById("globalRecipeType").value; // "R" or "N"
  const mode = document.getElementById("globalTeamType").value; // "T" or "I"
  const timeAllotted = document.getElementById("globalTime").value;
  const preset = document.getElementById("presetGameType").value; // e.g., "TOOGOODTOGO", etc.
  
  // If a preset is chosen (not "None"), get the preset rule.
  let presetRule = "";
  if (preset !== "None") {
    // Look up preset rule from our presetGamemodes array.
    const presetObj = presetGamemodes.find(item => item.key === preset);
    if (presetObj) presetRule = presetObj.rule;
  }
  
  // Create game object; note: we do NOT generate an individual twist here.
  const game = {
    type: gameTypeLetter,
    recipe: recipe,
    mode: mode,
    time: timeAllotted,
    preset: preset,
    presetRule: presetRule,
    gameTwist: "", // To be generated via button
    // individualTwists will be generated per player later.
    players: []  // Array to store player names and their individual twist (if rolled)
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
               <h3>Game ${index + 1}: ${game.type === "C" ? "COOK-OFF" : "BAKE-OFF"} (${game.preset !== "None" ? game.presetRule : "Custom Game"})</h3>
               <p>Recipe Option: ${game.recipe === "R" ? "Recipe" : "No Recipe"}</p>
               <p>Mode: ${game.mode === "T" ? "Team" : "Individual"}</p>
               <p>Allotted Time: ${game.time} minutes</p>
               <p><strong>Game Twist:</strong> ${game.gameTwist ? game.gameTwist : "Not generated yet"}</p>`;
    // Add button to generate game twist.
    html += `<button class="btn-blue" onclick="regenerateGameTwist(${index})">Generate Game Twist</button>`;
    
    // Player management section
    html += `<div>
               <label for="game-${index}-playerInput">Add Player:</label>
               <input type="text" id="game-${index}-playerInput" placeholder="Enter player name">
               <button class="btn-gray" onclick="addPlayer(${index})">Add Player</button>
               <div id="game-${index}-players">`;
    if (game.players.length === 0) {
      html += "<em>No players added yet.</em>";
    } else {
      game.players.forEach((player, pIndex) => {
        html += `<div class="player">
                   <span>${player.name}</span>
                   <button class="btn-blue" onclick="rollIndividual(${index}, ${pIndex})">Roll Individual Twist</button>
                   <span id="game-${index}-player-${pIndex}-result">${player.individualTwist ? player.individualTwist : ""}</span>
                 </div>`;
      });
    }
    html += `</div>
             </div>`;
    
    // If game mode is team, show team management for that game.
    if (game.mode === "T") {
      html += `<div class="team-section">
                 <h4>Team Management for Game ${index + 1}</h4>
                 <div>
                   <label for="game-${index}-teamNameInput">Team Name:</label>
                   <input type="text" id="game-${index}-teamNameInput" placeholder="Enter team name">
                   <button class="btn-gray" onclick="addTeam(${index})">Add Team</button>
                 </div>
                 <div id="game-${index}-teams"><em>No teams added yet.</em></div>
               </div>`;
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
  // Each player is an object with name and individualTwist (empty initially)
  games[gameIndex].players.push({ name: playerName, individualTwist: "" });
  displayGames();
}

// -------------------------------
// REROLL FUNCTIONS
function regenerateGameTwist(gameIndex) {
  const game = games[gameIndex];
  // Generate a game twist based on the game settings.
  const gameSettings = { type: game.type, recipe: game.recipe, mode: game.mode };
  const filtered = gameTwists.filter(item => ruleMatches(item.labels, gameSettings));
  if (filtered.length > 0) {
    game.gameTwist = filtered[Math.floor(Math.random() * filtered.length)].rule;
  } else {
    game.gameTwist = "No matching Game Twist found.";
  }
  displayGames();
}

function rollIndividual(gameIndex, playerIndex) {
  const game = games[gameIndex];
  const gameSettings = { type: game.type, recipe: game.recipe, mode: game.mode };
  const filtered = individualTwists.filter(item => ruleMatches(item.labels, gameSettings));
  let newTwist = "";
  if (filtered.length > 0) {
    newTwist = filtered[Math.floor(Math.random() * filtered.length)].rule;
  } else {
    newTwist = "No matching Individual Twist found.";
  }
  // Update the player's individualTwist property.
  game.players[playerIndex].individualTwist = newTwist;
  displayGames();
}

// -------------------------------
// TEAM MANAGEMENT FUNCTIONS (for games in team mode)
function addTeam(gameIndex) {
  const teamInputId = `game-${gameIndex}-teamNameInput`;
  const teamName = document.getElementById(teamInputId).value.trim();
  if (!teamName) {
    alert("Please enter a team name.");
    return;
  }
  // If the game doesn't have a teams array, initialize it.
  if (!games[gameIndex].teams) {
    games[gameIndex].teams = [];
  }
  games[gameIndex].teams.push({ name: teamName, players: [] });
  displayTeams(gameIndex);
  document.getElementById(teamInputId).value = "";
}

function displayTeams(gameIndex) {
  const teamsDivId = `game-${gameIndex}-teams`;
  const teamsDiv = document.getElementById(teamsDivId);
  const game = games[gameIndex];
  if (!game.teams || game.teams.length === 0) {
    teamsDiv.innerHTML = "<em>No teams added yet.</em>";
    return;
  }
  let html = "";
  game.teams.forEach((team, tIndex) => {
    html += `<div class="team" id="game-${gameIndex}-team-${tIndex}">
               <h4>${team.name}</h4>
               <label for="game-${gameIndex}-team-${tIndex}-playerInput">Add Player:</label>
               <input type="text" id="game-${gameIndex}-team-${tIndex}-playerInput" placeholder="Enter player name">
               <button class="btn-gray" onclick="addTeamPlayer(${gameIndex}, ${tIndex})">Add Player</button>
               <div id="game-${gameIndex}-team-${tIndex}-players">`;
    if (team.players.length === 0) {
      html += "<em>No players yet.</em>";
    } else {
      team.players.forEach((player, pIndex) => {
        html += `<div class="player">
                   <span>${player.name}</span>
                   <button class="btn-blue" onclick="rollTeamIndividual(${gameIndex}, ${tIndex}, ${pIndex})">Roll Individual Twist</button>
                   <span id="game-${gameIndex}-team-${tIndex}-player-${pIndex}-result">${player.individualTwist ? player.individualTwist : ""}</span>
                 </div>`;
      });
    }
    html += `</div>
             </div>`;
  });
  teamsDiv.innerHTML = html;
}

function addTeamPlayer(gameIndex, teamIndex) {
  const inputId = `game-${gameIndex}-team-${teamIndex}-playerInput`;
  const playerName = document.getElementById(inputId).value.trim();
  if (!playerName) {
    alert("Please enter a player name.");
    return;
  }
  const game = games[gameIndex];
  game.teams[teamIndex].players.push({ name: playerName, individualTwist: "" });
  displayTeams(gameIndex);
}

function rollTeamIndividual(gameIndex, teamIndex, playerIndex) {
  const game = games[gameIndex];
  const gameSettings = { type: game.type, recipe: game.recipe, mode: game.mode };
  const filtered = individualTwists.filter(item => ruleMatches(item.labels, gameSettings));
  let newTwist = "";
  if (filtered.length > 0) {
    newTwist = filtered[Math.floor(Math.random() * filtered.length)].rule;
  } else {
    newTwist = "No matching Individual Twist found.";
  }
  game.teams[teamIndex].players[playerIndex].individualTwist = newTwist;
  displayTeams(gameIndex);
}

// -------------------------------
// Create Games Container if Not Present
document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("gamesContainer")) {
    const div = document.createElement("div");
    div.id = "gamesContainer";
    document.querySelector(".container").appendChild(div);
  }
});
