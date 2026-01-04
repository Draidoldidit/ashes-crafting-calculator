// GLOBAL STATE
let ITEM_DATA = [];
let CURRENT_MATERIALS = [];

// RARITY WEIGHTS (Exponential)
const RARITY_WEIGHTS = {
  Common: 1,
  Uncommon: 2,
  Rare: 4,
  Epic: 8,
  Legendary: 16
};

// LOAD CSV DATA
fetch("data-template.csv")
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split("\n");
    const headers = lines.shift().split(",");

    ITEM_DATA = lines.map(row => {
      const values = row.split(",");
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i].trim();
      });
      obj.Quantity = Number(obj.Quantity);
      return obj;
    });

    populateProfessionDropdown();
  });

// POPULATE PROFESSION DROPDOWN
function populateProfessionDropdown() {
  const select = document.getElementById("professionSelect");
  const professions = [...new Set(ITEM_DATA.map(i => i.Profession))];

  professions.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

// SHOW ITEMS AND ATTACH CALCULATOR TRIGGERS
function showItemsForProfession() {
  const prof = document.getElementById("professionSelect").value;
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";

  if (!prof) return;

  const uniqueItems = [...new Set(
    ITEM_DATA.filter(i => i.Profession === prof).map(i => i.Item)
  )];

  uniqueItems.forEach(itemName => {
    const materials = ITEM_DATA.filter(
      i => i.Profession === prof && i.Item === itemName
    );

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <h3>${itemName}</h3>
      <p><strong>Materials Needed:</strong></p>
      <ul>
        ${materials.map(m => `<li>${m.Material} x${m.Quantity}</li>`).join("")}
      </ul>
      <button onclick="selectRecipe('${itemName}', '${prof}')">
        Choose for Rarity
      </button>
    `;

    container.appendChild(card);
  });
}

// SELECT RECIPE FOR CALCULATOR
function selectRecipe(itemName, profession) {
  CURRENT_MATERIALS = ITEM_DATA.filter(
    i => i.Profession === profession && i.Item === itemName
  );

  renderRarityInputs();
  document.getElementById("rarityResult").innerText = "";
}

// RENDER RARITY INPUTS FOR SELECTED MATERIALS
function renderRarityInputs() {
  const container = document.getElementById("rarityInputs");
  container.innerHTML = "";

  CURRENT_MATERIALS.forEach((mat, index) => {
    const row = document.createElement("div");
    row.className = "rarity-row";

    row.innerHTML = `
      <label>
        ${mat.Material} (x${mat.Quantity}):
        <select id="rarity-${index}">
          <option>Common</option>
          <option>Uncommon</option>
          <option>Rare</option>
          <option>Epic</option>
          <option>Legendary</option>
        </select>
      </label>
    `;

    container.appendChild(row);
  });
}

// CALCULATE THE RARITY OUTCOME
function calculateRarity() {
  if (CURRENT_MATERIALS.length === 0) {
    alert("Select a recipe first!");
    return;
  }

  let totalScore = 0;
  let maxScore = 0;

  CURRENT_MATERIALS.forEach((mat, index) => {
    const rarity = document.getElementById(`rarity-${index}`).value;
    totalScore += mat.Quantity * RARITY_WEIGHTS[rarity];
    maxScore += mat.Quantity * RARITY_WEIGHTS.Legendary;
  });

  const percent = (totalScore / maxScore) * 100;
  let outcome = "Common";

  if (percent >= 85) outcome = "Legendary";
  else if (percent >= 65) outcome = "Epic";
  else if (percent >= 45) outcome = "Rare";
  else if (percent >= 25) outcome = "Uncommon";

  document.getElementById("rarityResult").innerHTML =
    `Predicted Outcome: <strong>${outcome}</strong> (${percent.toFixed(1)}%)`;
}
