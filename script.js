// --------------------------------------------------
// RULE DATA ARRAYS
// --------------------------------------------------

// Preset Gamemodes – these are fixed and selected via the dropdown.
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
  // (Add more preset gamemodes as needed)
];

// Game Twists – these affect the entire game (all players/teams)
// (Labels use: C = Cook-off, B = Bake-off, R = Recipe, N = No Recipe, I = Individual, T = Team, S for secret)
const gameTwists = [
  { rule: "Make it dessert - Has to be a sweet version of a savory item.", labels: "CNIT" },
  { rule: "Make it savory - Has to be a savory version of a sweet item.", labels: "BNIT" },
  { rule: "Make it cheap - Total cost between $13-$20 (randomized).", labels: "CBNRIT" },
  { rule: "CHOPT: INITIAL - Incorporate an ingredient chosen by the other players.", labels: "CBNRIT" },
  { rule: "CHOPT: MIX IT IN - Incorporate an ingredient chosen by the other players.", labels: "CBNRIT S1/3" },
  { rule: "Make it gourmet - Create an upper-class Michelin-style dish.", labels: "CNRI" },
  { rule: "Make it a gym snack - High protein, low calorie dish.", labels: "CBNRIT" },
  { rule: "Make it blindfolded - Prepare your dish blindfolded.", labels: "BNRI" },
  { rule: "NO TASTING - No tasting until the dish is finished.", labels: "CNRI" },
  { rule: "Make it in one pot/pan - Entire dish from one pot.", labels: "CNIT" },
  { rule: "CHOPT: RANDOM - Get given 3 random ingredients.", labels: "CNIT" },
  { rule: "Fruitful Labour - Incorporate a fruit as a main focus.", labels: "CBNIT" },
  { rule: "Seasoning Sabotage - Must include a seasoning chosen by competitors.", labels: "CNIT" },
  { rule: "YOU CAN'T USE THAT! - Opponents can remove up to 2 planned ingredients.", labels: "CBNRIT S1/4" },
  { rule: "Ingredient Swap - At a random moment, swap one key ingredient with a competitor.", labels: "CBNIT" },
  { rule: "Mystery Protein - Draw a protein at random to incorporate.", labels: "CNIT" },
  { rule: "Vegan Twist - Transform a meaty dish into a vegan masterpiece.", labels: "CNIT" },
  { rule: "Spice It Up - Add an ultra-spicy ingredient and balance the heat.", labels: "CBNIT" },
  { rule: "Decoy Dish - Begin cooking one dish then switch mid-round, using previous work as a base.", labels: "CBNIT S1/4" },
  { rule: "HIDDEN: Swap dishes with another player.", labels: "CBNRIT" },
  { rule: "Ingredient Conundrum - Combine two ingredients that typically clash and make it work.", labels: "CBNIT" },
  { rule: "No Cutting - You can’t use knives; find alternative ways to chop.", labels: "CNRIT" },
  { rule: "Veggie it up - Must add at least one vegetable.", labels: "BNRIT" },
  { rule: "Swap Ingredients - Randomly swap one ingredient from your basket with another competitor.", labels: "CBNRIT" },
  { rule: "Sauce it up! - HIDDEN: Must put a special sauce on the dish when done.", labels: "CNIT S2/3" },
  { rule: "Fusion Finale - Make a fusion between two dishes.", labels: "CBNIT" },
  { rule: "Double Swap - HIDDEN: Two contestants swap one ingredient with each other.", labels: "S" },
  { rule: "Rotate Counterclockwise - Gift an ingredient counterclockwise.", labels: "CNT" },
  { rule: "Plating Precision - Plate your dish as if for fine dining.", labels: "CBNIT" },
  { rule: "Unexpected Technique - Use a nontraditional cooking method (e.g., smoking, sous-vide).", labels: "preset" },
  { rule: "Cultural Heritage - Recreate a dish from a specific culture.", labels: "preset" },
  { rule: "Bite-Sized Creation - Develop a dish served as bite-sized appetizers.", labels: "preset" },
  { rule: "Ingredient Spotlight - Choose one star ingredient to feature in every component.", labels: "preset" },
  { rule: "Time Warp - Time limits change unpredictably during the round.", labels: "preset" },
  { rule: "Round Robin Collaboration - Contribute one course to a multi-course meal.", labels: "preset" },
  { rule: "Recipe Remix - Modify a standard recipe with your personal twist.", labels: "preset" },
  { rule: "Seasonal Sensation - Use only seasonal ingredients.", labels: "preset" },
  { rule: "Holiday Bash - Center the dish around a holiday theme.", labels: "preset" },
  { rule: "Anti-Presentation - The dish must look terrible but taste great.", labels: "CNRT" }
  // (Add additional game twists as needed)
];

// Individual Twists – these affect a single competitor (rolled via a button next to their name)
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

// --------------------------------------------------
// HELPER FUNCTION: ruleMatches
// Checks if a rule’s labels (a string) include all required letters from game settings.
// gameSettings: { type: "C" or "B", recipe: "R" or "N", mode: "I" or "T" }
function ruleMatches(ruleLabels, gameSettings) {
  // Skip if ruleLabels contains "preset"
  if (ruleLabels.includes("preset")) return false;
  if (gameSettings.type === "C" && !ruleLabels.includes("C")) return false;
  if (gameSettings.type === "B" && !ruleLabels.includes("B")) return false;
  if (gameSettings.recipe === "R" && !ruleLabels.includes("R")) return false;
  if (gameSettings.recipe === "N" && !ruleLabels.includes("N")) return false;
  if (gameSettings.mode === "I" && !ruleLabels.includes("I")) return false;
  if (gameSettings.mode === "T" && !ruleLabels.includes("T")) return false;
  return true;
}

// --------------------------------------------------
// GLOBAL VARIABLES FOR GAMES
const games = []; // Array to store game objects

// --------------------------------------------------
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

// --------------------------------------------------
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

// --------------------------------------------------
// FUNCTION TO ADD A GAME
// typeParam: "cookoff" or "bakeoff"
function addGame(typeParam) {
  // Convert game type to letter: "C" for cookoff, "B" for bakeoff.
  const gameTypeLetter = (typeParam === "cookoff") ? "C" : "B";
  const recipe = document.getElementById("globalRecipeType").value; // "R" or "N"
  const mode = document.getElementById("globalTeamType").value; // "T" or "I"
  const timeAllotted = document.getElementById("globalTime").value;
  const preset = document.getElementById("presetGameType").value; // e.g., "TOOGOODTOGO", etc.
  
  // If a preset is chosen (not "None"), look it up
  let presetRule = "";
  if (preset !== "None") {
    const found = presetGamemodes.find(item => item.key === preset);
    if (found) presetRule = found.rule;
  }
  
  // Create game object; we do NOT auto-generate individual twists here.
  const game = {
    type: gameTypeLetter,
    recipe: recipe,
    mode: mode,
    time: timeAllotted,
    preset: preset,
    presetRule: presetRule,
    gameTwist: "", // to be generated via button
    // Players array for individual twist rolling
    players: [] // Each player: { name: string, individualTwist: "" }
  };
  
  games.push(game);
  displayGames();
}

document.getElementById("addCookOff").addEventListener("click", function() {
  addGame("cookoff");
});
document.getElementById("addBakeOff").addEventListener("click", function() {
  addGame("bakeoff");
});

// --------------------------------------------------
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
               <h3>Game ${index + 1}: ${game.type === "C" ? "COOK-OFF" : "BAKE-OFF"} ${game.preset !== "None" ? "(" + game.presetRule + ")" : "(Custom Game)"} </h3>
               <p>Recipe Option: ${game.recipe === "R" ? "Recipe" : "No Recipe"}</p>
               <p>Mode: ${game.mode === "T" ? "Team" : "Individual"}</p>
               <p>Allotted Time: ${game.time} minutes</p>
               <p><strong>Game Twist:</strong> ${game.gameTwist ? game.gameTwist : "Not generated yet"}</p>
               <button class="btn-blue" onclick="regenerateGameTwist(${index})">Generate Game Twist</button>
               <div>
                 <h4>Players</h4>
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
    // If game mode is team, add team management section
    if (game.mode === "T") {
      html += `<div class="team-section">
                 <h4>Team Management</h4>
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

// --------------------------------------------------
// ADD PLAYER (for individual games)
function addPlayer(gameIndex) {
  const inputId = `game-${gameIndex}-playerInput`;
  const playerName = document.getElementById(inputId).value.trim();
  if (!playerName) {
    alert("Please enter a player name.");
    return;
  }
  games[gameIndex].players.push({ name: playerName, individualTwist: "" });
  displayGames();
}

// --------------------------------------------------
// Regenerate Game Twist for a Game (affects entire game)
function regenerateGameTwist(gameIndex) {
  const game = games[gameIndex];
  const gameSettings = { type: game.type, recipe: game.recipe, mode: game.mode };
  const filtered = gameTwists.filter(item => ruleMatches(item.labels, gameSettings));
  if (filtered.length > 0) {
    game.gameTwist = filtered[Math.floor(Math.random() * filtered.length)].rule;
  } else {
    game.gameTwist = "No matching Game Twist found.";
  }
  displayGames();
}

// --------------------------------------------------
// Roll Individual Twist for a Player
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
  game.players[playerIndex].individualTwist = newTwist;
  displayGames();
}

// --------------------------------------------------
// TEAM MANAGEMENT FUNCTIONS (for team mode games)
function addTeam(gameIndex) {
  const teamInputId = `game-${gameIndex}-teamNameInput`;
  const teamName = document.getElementById(teamInputId).value.trim();
  if (!teamName) {
    alert("Please enter a team name.");
    return;
  }
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

// --------------------------------------------------
// Ensure Games Container Exists
document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("gamesContainer")) {
    const div = document.createElement("div");
    div.id = "gamesContainer";
    document.querySelector(".container").appendChild(div);
  }
});
