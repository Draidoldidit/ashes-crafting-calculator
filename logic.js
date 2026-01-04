// ==============================
// GLOBAL STATE
// ==============================
let CURRENT_MATERIALS = [];

// ==============================
// RARITY WEIGHTS (Exponential)
// ==============================
const RARITY_WEIGHTS = {
  Common: 1,
  Uncommon: 2,
  Rare: 4,
  Epic: 8,
  Legendary: 16
};

// ==============================
// DATA (embedded, no CSV fetch)
// ==============================
const ITEM_DATA = [
  { Profession: "Weaponsmithing", Item: "Iron Sword", Rarity: "Common", Material: "Iron Ore", Quantity: 3 },
  { Profession: "Weaponsmithing", Item: "Iron Sword", Rarity: "Common", Material: "Wood", Quantity: 1 },
  { Profession: "Weaponsmithing", Item: "Steel Warhammer", Rarity: "Rare", Material: "Steel Ingot", Quantity: 5 },
  { Profession: "Weaponsmithing", Item: "Steel Warhammer", Rarity: "Rare", Material: "Oak Wood", Quantity: 2 },
  { Profession: "Alchemy", Item: "Minor Health Potion", Rarity: "Common", Material: "Herb", Quantity: 2 },
  { Profession: "Alchemy", Item: "Minor Health Potion", Rarity: "Common", Material: "Water Flask", Quantity: 1 }
];

// ==============================
// POPULATE PROFESSION DROPDOWN
// ==============================
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

// ==============================
// SHOW ITEMS FOR PROFESSION
// ==============================
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

// ==============================
// SELECT RECIPE FOR CALCULATOR
// ==============================
function selectRecipe(itemName, profession) {
  CURRENT_MATERIALS = ITEM_DATA.filter(
    i => i.Profession === profession && i.Item === itemName
  );

  renderRarityInputs();
  document.getElementById("rarityResult").innerText = "";
}

// ==============================
// RENDER RARITY INPUTS
// ==============================
function renderRarityInputs() {
  const container = document.getElementById("rarityInputs");
  container.innerHTML = "";

  CURRENT_MATERIALS.forEach((mat, index) => {
    const row = document.createElement("div");
    row.className = "rarity-row";

    row.innerHTML = `
