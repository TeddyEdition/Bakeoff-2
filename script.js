const rules = [
    { label: ["cookoff", "team", "norecipe"], rule: "90 seconds to grab ingredients!" },
    { label: ["bakeoff", "individual", "recipe"], rule: "Bake with only 3 ingredients." },
    { label: ["both", "team"], rule: "Each team swaps one ingredient with another!" },
    { label: ["cookoff", "recipe", "individual"], rule: "Make a dish using only 1 pan." },
    { label: ["bakeoff", "team", "norecipe"], rule: "No sugar allowed!" },
    { label: ["both", "individual", "norecipe"], rule: "Add a secret twist halfway through!" }
];

function generateRules() {
    const gameType = document.getElementById("gameType").value;
    const recipeType = document.getElementById("recipeType").value;
    const teamType = document.getElementById("teamType").value;

    const filteredRules = rules.filter(rule => 
        rule.label.includes(gameType) &&
        rule.label.includes(recipeType) &&
        rule.label.includes(teamType)
    );

    if (filteredRules.length > 0) {
        const selectedRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];
        document.getElementById("game-output").innerText = `Your rule: ${selectedRule.rule}`;
    } else {
        document.getElementById("game-output").innerText = "No matching rule found. Try different options!";
    }
}
