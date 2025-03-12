// -------------------------------
// RULE ARRAYS
// -------------------------------

// Preset Gamemodes (these are preset and not randomly rolled)
const presetGamemodes = [
  { rule: "TOOGOODTOGO GROCERY - Only use items from a ToGoodToGo grocery bag.", labels: "CBNRIT" },
  { rule: "90 Seconds - You only have 90 seconds to grab your ingredients.", labels: "preset" },
  { rule: "AUCTION GAME - Bid for ingredients; winners keep them exclusively.", labels: "preset" },
  { rule: "Backward Recipe - Start with the finished dish and reverse-engineer it.", labels: "preset" },
  { rule: "Speed Round - Extremely short time limit (e.g., 15 minutes).", labels: "preset" },
  { rule: "Complicate It - Make an incredibly complex dish.", labels: "preset" },
  { rule: "Ingredient Alphabet - Use only ingredients starting with a specific letter.", labels: "preset" },
  { rule: "Alternative Auction - Draw a mystery ingredient from a box.", labels: "preset" },
  { rule: "Cultural Critique - Create a dish inspired by a random country.", labels: "preset" }
];

// Game Twists: affect the entire game (both teams or all competitors)
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
  { rule: "Rotate Counterclockwise - Gift an ingredient counterclockwise.", labels: "CNT" }
];

// Individual Twists: affect one competitor
const individualTwists = [
  { rule: "Single Hand - Cook using only your non-dominant hand.", labels: "CNRI" },
  { rule: "Blindfolded Builder - One person cooks blindfolded while others guide verbally.", labels: "CNRT" },
  { rule: "Mystery Basket Pass - Each member adds an ingredient from a mystery basket.", labels: "CBRT" },
  { rule: "Timed Relay - Each member has a set time to complete their station.", labels: "CBNRT" },
  { rule: "Role Rotation - Swap roles (prep, cook, decorator) midway.", labels: "CNRT" },
  { rule: "Ingredient Draft - Each member selects one ingredient silently.", labels: "CNT" },
  { rule: "No-Talk Round - Communicate only through gestures during ingredient selection.", labels: "CNT" },
  { rule: "Relay Assembly - Tag in a teammate to continue the dish.", labels: "CNT" }
];

// -------------------------------
// HELPER FUNCTION: Check if rule matches current settings
// current settings: gameType ("C" for cookoff, "B" for bakeoff), recipeOption ("R" or "N"), mode ("I" or "T")
function ruleMatches(ruleLabels, gameType, recipeOption, mode) {
  // If it's a preset gamemode rule (labels "preset"), skip random roll here.
  if (ruleLabels.includes("preset")) return false;
  
  if (gameType === "C" && !ruleLabels.includes("C")) return false;
  if (gameType === "B" && !ruleLabels.includes("B")) return false;
  if (recipeOption === "R" && !ruleLabels.includes("R")) return false;
  if (recipeOption === "N" && !ruleLabels.includes("N")) return false;
  if (mode === "I" && !ruleLabels.includes("I")) return false;
  if (mode === "T" && !ruleLabels.includes("T")) return false;
  return true;
}

// -------------------------------
// GLOBAL VARIABLES FOR GAMES
const games = [];  // Each game will store its settings, generated twists, players, etc.

// -------------------------------
// PRESET GAME TYPE DESCRIPTION UPDATE
document.getElementById("presetGameType").addEventListener("change", function() {
  const value = this.value;
  let description = "";
  if (value === "standard") {
    description = "Standard Game: Random rule generation for teams and individuals.";
  } else if (value === "custom") {
    description = "Custom Game: Preset game type with additional explanation available.";
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
// FUNCTIONS TO GENERATE TWISTS BASED ON GAME SETTINGS
// Game Twist (affects entire game)
function generateGameTwist(game) {
  // game has: type ("C" for cookoff or "B" for bakeoff), recipe (R or N), mode (I or T)
  const filtered = gameTwists.filter(item =>
    ruleMatches(item.labels, game.type, game.recipe, game.mode)
  );
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)].rule;
  }
  return "No matching Game Twist found.";
}

// Individual Twist (affects one competitor)
function generateIndividualTwist(game) {
  const filtered = individualTwists.filter(item =>
    ruleMatches(item.labels, game.type, game.recipe, game.mode)
  );
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
  const recipe = document.getElementById("globalRecipeType").value; // already "R" or "N"
  const mode = document.getElementById("globalTeamType").value; // already "T" or "I"
  const timeAllotted = document.getElementById("globalTime").value;
  const presetGameType = document.getElementById("presetGameType").value;
  
  // Create game object
  const game = {
    type: gameTypeLetter,
    recipe: recipe,
    mode: mode,
    time: timeAllotted,
    preset: presetGameType,
    gameTwist: generateGameTwist({ type: gameTypeLetter, recipe: recipe, mode: mode }),
    individualTwist: generateIndividualTwist({ type: gameTypeLetter, recipe: recipe, mode: mode }),
    players: []  // For player names
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
               <h3>Game ${index + 1}: ${game.type === "C" ? "COOK-OFF" : "BAKE-OFF"} (${game.preset})</h3>
               <p>Recipe Option: ${game.recipe === "R" ? "Recipe" : "No Recipe"}</p>
               <p>Mode: ${game.mode === "T" ? "Team" : "Individual"}</p>
               <p>Allotted Time: ${game.time} minutes</p>
               <p><strong>Game Twist:</strong> ${game.gameTwist}</p>
               <p><strong>Individual Twist:</strong> ${game.individualTwist}</p>`;
    // Player management section for this game
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
                   <span>${player}</span>
                   <button class="btn-blue" onclick="rollIndividual(${index}, ${pIndex})">Roll Individual Twist</button>
                   <span id="game-${index}-player-${pIndex}-result"></span>
                 </div>`;
      });
    }
    html += `</div>
             </div>
             <hr>
             <button class="btn-blue" onclick="regenerateGameTwist(${index})">Regenerate Game Twist</button>`;
    if (game.mode === "T") {
      html += `<button class="btn-blue" onclick="regenerateTeamTwist(${index})">Regenerate Team Twist</button>`;
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
// REROLL FUNCTIONS
function regenerateGameTwist(gameIndex) {
  const game = games[gameIndex];
  game.gameTwist = generateGameTwist(game);
  displayGames();
}

function regenerateTeamTwist(gameIndex) {
  // For team mode, we assume team twist is part of game twist; re-roll same as game twist.
  const game = games[gameIndex];
  game.gameTwist = generateGameTwist(game);
  displayGames();
}

function rollIndividual(gameIndex, playerIndex) {
  // For an individual twist re-roll, we simply generate a new individual twist
  const game = games[gameIndex];
  const newIndiv = generateIndividualTwist(game);
  // Update only for this player? (For now, we display it next to the player.)
  document.getElementById(`game-${gameIndex}-player-${playerIndex}-result`).innerText = " " + newIndiv;
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
